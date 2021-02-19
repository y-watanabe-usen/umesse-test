"use strict";

const https = require("https");
const querystring = require("querystring");
const {
  constants,
  debuglog,
  errorlog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");
const db = require("./db");

// 仮
const SORT = {
  TITLE_ASC: 1,
  TITLE_DESC: 2,
  TIMESTAMP_ASC: 3,
  TIMESTAMP_DESC: 4,
}

exports.getResource = async (category, industryCd, sceneCd, sort) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      category: category,
      industryCd: industryCd,
      sceneCd: sceneCd,
      sceneCd: sort,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  let json;
  try {
    json = await db.Contents.findByCategory(category);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  if (industryCd) {
    json = json.filter((item) =>
      item.industry.some((el) => el.industryCd === industryCd)
    );
  }
  if (sceneCd) {
    json = json.filter((item) =>
      item.scene.some((el) => el.sceneCd === sceneCd)
    );
  }

  if (!sort) sort = 1;
  let sortFunc;
  switch (sort) {
    case SORT.TITLE_ASC:
      sortFunc = (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      break;
    case SORT.TITLE_DESC:
      // titleの降順でソート
      sortFunc = (a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      }
      break;
    case SORT.TIMESTAMP_ASC:
      sortFunc = (a, b) => {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
      }
      break;
    case SORT.TIMESTAMP_DESC:
      sortFunc = (a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      }
      break;
    default:
      // titleの昇順でソート
      sortFunc = (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
  }
  json.sort(sortFunc)

  if (!json) throw new InternalServerError("not found");
  return json;
};

// 署名付きURL取得
exports.getSignedUrl = async (id, category) => {
  debuglog(
    `[getSignedUrl] ${JSON.stringify({
      id: id,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    id: id,
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  let bucket = "";
  let path = "";
  switch (category) {
    case constants.resourceCategory.CM:
      bucket = constants.s3Bucket().users;
      path = `users/${id.split("-")[0]}/${category}/${id}.mp3`;
      break;
    case constants.resourceCategory.RECORDING:
    case constants.resourceCategory.TTS:
      bucket = constants.s3Bucket().users;
      path = `users/${id.split("-")[0]}/${category}/${id}.mp3`;
      break;
    case constants.resourceCategory.BGM:
    case constants.resourceCategory.CHIME:
    case constants.resourceCategory.NARRATION:
      bucket = constants.s3Bucket().contents;
      path = `${category}/${id}.mp3`;
      break;
    default:
      throw new InternalServerError("unknown category");
  }

  let res;
  try {
    res = await s3Manager.getSignedUrl(bucket, path);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw InternalServerError("getSignedUrl failed");
  return { url: res };
};

// TTS作成
exports.createTts = async (body) => {
  debuglog(
    `[createTts] ${JSON.stringify({
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  const postData = querystring.stringify({
    ...body,
    format: "mp3",
  });
  const options = {
    host: constants.ttsConfig().host,
    path: constants.ttsConfig().path,
    port: 443,
    auth: `${constants.ttsConfig().key}:`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };
  debuglog(JSON.stringify({ options: options, postData: postData }));

  let data;
  try {
    data = await requestTts(options, postData);
  } catch (e) {
    throw new InternalServerError(e.message);
  }
  return { body: data, isBase64Encoded: true };
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
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  let json;
  try {
    json = await db.User.findCategory(unisCustomerCd, category);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  if (id) {
    json = json.filter((item) => item[`${category}Id`] === id)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
};

// ユーザー作成の音声新規作成
exports.createUserResource = async (unisCustomerCd, category, body) => {
  debuglog(
    `[createUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      category: category,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // ID作成
  const id = generateId(unisCustomerCd, category.slice(0, 1));

  const binaryData = Buffer.from(body["recordedFile"], "binary");
  // S3へPUT
  let res;
  try {
    res = await s3Manager.put(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${category}/${id}.mp3`,
      binaryData);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("put failed");

  // DynamoDBのデータ更新
  const data = {
    id: id,
    title: body["title"],
    description: body["description"],
    startDate: timestamp(),
    timestamp: timestamp(),
  };

  try {
    return await db.User.updateData(unisCustomerCd, category, data);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
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
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    category: category,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // 音声一覧から該当音声を取得
  const list = await this.getUserResource(unisCustomerCd, category);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item[`${category}Id`] === id);
  if (index < 0) throw new InternalServerError("not found");
  const resource = list[index];

  // DynamoDBのデータ更新
  Object.keys(body).map((key) => {
    resource[key] = body[key];
  });
  resource.timestamp = timestamp();

  try {
    return await db.User.updateResource(unisCustomerCd, category, resource);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
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
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // 音声一覧から該当音声を取得
  const list = await this.getUserResource(unisCustomerCd, category);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item[`${category}Id`] === id);
  if (index < 0) throw new InternalServerError("not found");
  //const resource = list[index];

  // S3上の録音音声を削除
  try {
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${category}/${id}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  // DynamoDBのデータ更新
  try {
    return await db.User.deleteFromCategory(unisCustomerCd, index, category);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};

// TTS作成
function requestTts(options, postData) {
  return new Promise(function (resolve, reject) {
    const request = https.request(options, (response) => {
      let data = [];
      response.on("data", (chunk) => {
        data.push(chunk);
      });
      response.on("end", () => {
        if (response.statusCode == 200) {
          resolve(Buffer.concat(data).toString("base64"));
        } else {
          console.log(`${response.statusMessage}: ${data}`);
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
