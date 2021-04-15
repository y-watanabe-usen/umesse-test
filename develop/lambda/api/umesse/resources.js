"use strict";

const https = require("https");
const querystring = require("querystring");
const {
  constants,
  debuglog,
  errorlog,
  timestamp,
  generateId,
  responseData,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const db = require("./db");

exports.getResource = async (category, industryCd, sceneCd, sort) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      category: category,
      industryCd: industryCd,
      sceneCd: sceneCd,
      sort: sort,
    })}`
  );

  // パラメーターチェック
  let params = {
    category: category,
  };
  if (industryCd) params.industryCd = industryCd;
  if (sceneCd) params.sceneCd = sceneCd;
  if (sort) params.sort = sort;
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    if (category === constants.resourceCategory.FREE) {
      ret = await db.Contents.findByCategoryLang(
        constants.resourceCategory.NARRATION,
        "JP"
      );
    } else {
      ret = await db.Contents.findByCategory(category);
    }
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  if (industryCd) {
    ret = ret.filter((item) =>
      item.industry.some((el) => el.industryCd === industryCd)
    );
    if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);
  }
  if (sceneCd) {
    ret = ret.filter((item) => item.scene.some((el) => el.sceneCd === sceneCd));
    if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);
  }

  return responseData(ret, category, sort);
};

// 署名付きURL取得
exports.getSignedUrl = async (id, category) => {
  debuglog(
    `[getSignedUrl] ${JSON.stringify({
      id: id,
      category: category,
    })}`
  );

  // パラメーターチェック
  let params = {
    category: category,
  };
  switch (category) {
    case constants.resourceCategory.CM:
    case constants.resourceCategory.RECORDING:
    case constants.resourceCategory.TTS:
      params[`${category}Id`] = id;
      break;
    default:
      params.id = id;
      break;
  }
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let bucket = "";
  let path = "";
  switch (category) {
    case constants.resourceCategory.CM:
      bucket = constants.s3Bucket().users;
      path = `users/${id.split("-")[0]}/${category}/${id}.aac`;
      break;

    case constants.resourceCategory.RECORDING:
    case constants.resourceCategory.TTS:
      bucket = constants.s3Bucket().users;
      path = `users/${id.split("-")[0]}/${category}/${id}.mp3`;
      break;

    case constants.resourceCategory.LANG:
      bucket = constants.s3Bucket().users;
      path = `users/${id.split("-")[0]}/${constants.resourceCategory.TTS}/${
        id.split("-")[1]
      }.mp3`;
      break;

    case constants.resourceCategory.BGM:
    case constants.resourceCategory.CHIME:
    case constants.resourceCategory.NARRATION:
      bucket = constants.s3Bucket().contents;
      path = `${category}/${id}.mp3`;
      break;
  }

  let ret;
  try {
    ret = await s3Manager.getSignedUrl(bucket, path);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return { url: ret };
};

// ユーザー作成の音声取得（一覧・個別）
exports.getUserResource = async (unisCustomerCd, category, id) => {
  debuglog(
    `[getUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      category: category,
      id: id,
    })}`
  );

  // パラメーターチェック
  let params = {
    unisCustomerCd: unisCustomerCd,
    category: category,
  };
  if (id) {
    switch (category) {
      case constants.resourceCategory.RECORDING:
      case constants.resourceCategory.TTS:
        params[`${category}Id`] = id;
    }
  }
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.findResource(unisCustomerCd, category);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  if (id) {
    ret = ret.filter((item) => item[`${category}Id`] === id).shift();
    if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);
  }

  return responseData(ret, category);
};

// ユーザー作成の録音音声新規作成
exports.createRecordingResource = async (unisCustomerCd, body) => {
  debuglog(
    `[createRecordingResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      ...body,
    },
    ["recordedFile", "title"]
  );
  if (checkError) throw new BadRequestError(checkError);

  // ID作成
  const id = generateId(unisCustomerCd, constants.resourceCategory.RECORDING);

  const binaryData = Buffer.from(body.recordedFile, "binary");
  // S3へPUT
  let ret;
  try {
    let path = `users/${unisCustomerCd}/${constants.resourceCategory.RECORDING}/${id}.mp3`;
    ret = await s3Manager.put(constants.s3Bucket().users, path, binaryData);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  const data = {
    recordingId: id,
    title: body.title,
    description: body.description,
    startDate: timestamp(),
    timestamp: timestamp(),
  };

  try {
    ret = await db.User.addResource(
      unisCustomerCd,
      constants.resourceCategory.RECORDING,
      data
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, constants.resourceCategory.RECORDING);
};

// ユーザー作成の合成音声新規作成
exports.createTtsResource = async (unisCustomerCd, body) => {
  debuglog(
    `[createTtsResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      ...body,
    },
    ["id", "category", "details"]
  );
  if (checkError) throw new BadRequestError(checkError);

  let json = [];
  for (const data of body.details) {
    if (data.id && data.category) {
      json.push({ id: data.id, category: data.category });
    } else {
      const id = generateId(unisCustomerCd, constants.resourceCategory.TTS);

      // S3のオブジェクトリネーム
      let ret;
      try {
        let path = `users/${unisCustomerCd}/${constants.resourceCategory.TTS}`;
        ret = await s3Manager.copy(
          constants.s3Bucket().users,
          `${path}/${id}.mp3`,
          `${constants.s3Bucket().users}/${path}/${data.lang}.mp3`
        );
      } catch (e) {
        errorlog(JSON.stringify(e));
        throw new InternalServerError(ERROR_CODE.E0000500);
      }

      // DynamoDBのデータ更新
      let title = data.title;
      switch (data.lang) {
        case "en":
          title = `${title} (英語)`;
          break;
        case "zh":
          title = `${title} (中国語)`;
          break;
        case "ko":
          title = `${title} (韓国語)`;
          break;
      }

      const item = {
        ttsId: id,
        title: title,
        description: data.description,
        manuscript: data.manuscript,
        startDate: timestamp(),
        timestamp: timestamp(),
      };

      try {
        ret = await db.User.addResource(
          unisCustomerCd,
          constants.resourceCategory.TTS,
          item
        );
      } catch (e) {
        errorlog(JSON.stringify(e));
        throw new InternalServerError(ERROR_CODE.E0000500);
      }
      json.push(responseData(ret, constants.resourceCategory.TTS));
    }
  }

  return json;
};

// TTS生成
exports.generateTtsResource = async (unisCustomerCd, body) => {
  debuglog(
    `[generateUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      ...body,
    },
    ["id", "category", "details"]
  );
  if (checkError) throw new BadRequestError(checkError);

  const options = {
    host: constants.ttsApiConfig().host,
    path: constants.ttsApiConfig().path,
    port: 443,
    auth: `${constants.ttsApiConfig().key}:`,
    method: "POST",
  };

  let json = {
    id: body.id,
    category: body.category,
    details: [],
  };
  for (const data of body.details) {
    let id = "";

    if (data.id && data.category) {
      id = `${data.category}/${data.id}.mp3`;
    } else {
      const postData = querystring.stringify({
        text: data.text,
        speaker: constants.ttsSpeakers[data.lang][parseInt(data.speaker)],
        pitch: "105",
        speed: "95",
        format: "mp3",
      });
      options.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postData.length,
      };
      debuglog(JSON.stringify({ options: options, postData: postData }));

      // TTS API リクエスト
      let binaryData;
      try {
        binaryData = await requestTtsApi(options, postData);
      } catch (e) {
        errorlog(JSON.stringify(e));
        throw new InternalServerError(ERROR_CODE.E0000500);
      }

      // S3へPUT
      id = `users/${unisCustomerCd}/${constants.resourceCategory.TTS}/${data.lang}.mp3`;
      let ret;
      try {
        ret = await s3Manager.put(constants.s3Bucket().users, id, binaryData);
      } catch (e) {
        errorlog(JSON.stringify(e));
        throw new InternalServerError(ERROR_CODE.E0000500);
      }
      id = `${unisCustomerCd}-${data.lang}`;
    }

    const url = await this.getSignedUrl(id, constants.resourceCategory.LANG);
    json.details.push({ url: url.url, lang: data.lang });
  }

  return json;
};

// ユーザー作成の音声更新
exports.updateUserResource = async (unisCustomerCd, category, id, body) => {
  debuglog(
    `[updateUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      category: category,
      id: id,
      body: body,
    })}`
  );

  // パラメーターチェック
  let params = {
    unisCustomerCd: unisCustomerCd,
    category: category,
    ...body,
  };
  switch (category) {
    case constants.resourceCategory.RECORDING:
    case constants.resourceCategory.TTS:
      params[`${category}Id`] = id;
  }
  let checkError = checkParams(params, ["title"]);
  if (checkError) throw new BadRequestError(checkError);

  // 音声一覧から該当音声を取得
  let resource, index;
  try {
    [resource, index] = await db.User.findResourceIndex(
      unisCustomerCd,
      category,
      id
    );
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  Object.keys(body).map((key) => {
    resource[key] = body[key];
  });
  resource.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateResource(
      unisCustomerCd,
      category,
      index,
      resource
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, category);
};

// ユーザー作成の音声削除
exports.deleteUserResource = async (unisCustomerCd, category, id) => {
  debuglog(
    `[deleteUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      category: category,
      id: id,
    })}`
  );

  // パラメーターチェック
  let params = {
    unisCustomerCd: unisCustomerCd,
    category: category,
  };
  switch (category) {
    case constants.resourceCategory.RECORDING:
    case constants.resourceCategory.TTS:
      params[`${category}Id`] = id;
  }
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  // 音声一覧から該当音声を取得
  let resource, index;
  try {
    [resource, index] = await db.User.findResourceIndex(
      unisCustomerCd,
      category,
      id
    );
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMで利用されているかチェック
  let ret;
  try {
    ret = await db.User.findResourceCm(unisCustomerCd, category, id);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }
  if (ret && ret.length > 0) throw new BadRequestError(ERROR_CODE.E0300010);

  // DynamoDBのデータ更新
  try {
    ret = await db.User.deleteFromCategory(unisCustomerCd, category, index);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // S3上の録音音声を削除
  try {
    let path = `users/${unisCustomerCd}/${category}/${id}.mp3`;
    const _ = await s3Manager.delete(constants.s3Bucket().users, path);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, category);
};

// TTSリクエスト
function requestTtsApi(options, postData) {
  return new Promise(function (resolve, reject) {
    const request = https.request(options, (response) => {
      let data = [];
      response.on("data", (chunk) => {
        data.push(chunk);
      });
      response.on("end", () => {
        if (response.statusCode == 200) {
          resolve(Buffer.concat(data));
        } else {
          reject(`${response.statusMessage}: ${data}`);
        }
      });
      response.on("error", (error) => {
        reject(error);
      });
    });
    request.write(postData);
    request.end();
  });
}
