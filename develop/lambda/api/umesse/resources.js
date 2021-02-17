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
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { BadRequestError, InternalServerError } = require("./error");

exports.getResource = async (category, industryCd, sceneCd) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      category: category,
      industryCd: industryCd,
      sceneCd: sceneCd,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    category: category,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  const options = {
    FilterExpression: "category = :category",
    ExpressionAttributeValues: {
      ":category": category,
    },
  };

  let res;
  try {
    res = await dynamodbManager.scan(
      constants.dynamoDbTable().contents,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res || !res.Items.length) throw new InternalServerError("not found");

  let json = res.Items;
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

  // titleの昇順でソート
  json.sort((a, b) => {
    var r = 0;
    if (a.title < b.title) { r = -1; }
    else if (a.title > b.title) { r = 1; }
    return r;
  })

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
      path = `users/${id.split("-")[0]}/${category}/${id}.aac`;
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

  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
    ProjectionExpression: category,
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  let res;
  try {
    res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res || !res.Item) throw new InternalServerError("not found");

  let json = res.Item[category];
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
  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
    UpdateExpression: "SET #category = list_append(#category, :data)",
    ExpressionAttributeNames: {
      "#category": category,
    },
    ExpressionAttributeValues: {
      ":data": [data],
    },
    ReturnValues: "UPDATED_NEW",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes[category].pop();
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
  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
    UpdateExpression: `SET #category[${index}] = :resource`,
    ExpressionAttributeNames: {
      "#category": category,
    },
    ExpressionAttributeValues: {
      ":resource": resource,
    },
    ReturnValues: "UPDATED_NEW",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  let res;
  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes[category][index];
  return json;
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
  const resource = list[index];

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
  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
    UpdateExpression: `REMOVE #category[${index}]`,
    ExpressionAttributeNames: {
      "#category": category,
    },
    ReturnValues: "UPDATED_NEW",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  let res;
  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes[category];
  return json;
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
