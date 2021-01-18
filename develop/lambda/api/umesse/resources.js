"use strict";

const https = require("https");
const querystring = require("querystring");
const {
  constants,
  debuglog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");

exports.getResource = async (category, industryCd, sceneCd) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      category: category,
      industryCd: industryCd,
      sceneCd: sceneCd,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      category: category,
    });
    if (checkParams) throw checkParams;

    const options = {
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
    };

    const res = await dynamodbManager.scan(
      constants.dynamoDbTable().contents,
      options
    );
    if (!res || !res.Items.length) throw "not found";

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
    if (!json) throw "not found";
    return json;
  } catch (e) {
    console.log(e);
    return { message: e };
  }
};

// 署名付きURL取得
exports.getSignedUrl = async (id, category) => {
  debuglog(
    `[getSignedUrl] ${JSON.stringify({
      id: id,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      id: id,
      category: category,
    });
    if (checkParams) throw checkParams;

    let bucket = "";
    let path = "";
    let file = "";
    switch (category) {
      case constants.resourceCategory.CM:
        file = `${id}.aac`;
      case constants.resourceCategory.RECORDING:
        file = `${id}.wav`;
      case constants.resourceCategory.TTS:
        file = `${id}.mp3`;
        const str = id.split("-");
        bucket = constants.s3Bucket().users;
        path = `users/${str[0]}/${category}/${file}`;
        break;
      case constants.resourceCategory.BGM:
      case constants.resourceCategory.CHIME:
      case constants.resourceCategory.NARRATION:
        bucket = constants.s3Bucket().contents;
        path = `${category}/${id}.mp3`;
        break;
      default:
        throw "unknown category";
    }

    const res = await s3Manager.getSignedUrl(bucket, path);
    if (!res) throw "getSignedUrl failed";
    return { url: res };
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// TTS作成
exports.createTts = async (body) => {
  debuglog(
    `[createTts] ${JSON.stringify({
      body: body,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      body: body,
    });
    if (checkParams) throw checkParams;

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

    const data = await requestTts(options, postData);
    if (data instanceof Error) throw data;
    return { body: data, isBase64Encoded: true };
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
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

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      category: category,
    });
    if (checkParams) throw checkParams;

    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression: category,
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res || !res.Item) throw "not found";

    let json = res.Item[category];
    if (id) {
      json = json.filter((item) => item[`${category}Id`] === id)[0];
    }
    if (!json) throw "not found";
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声新規作成
exports.createUserResource = async (unisCustomerCd, category, body) => {
  debuglog(
    `[createUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      category: category,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      category: category,
      body: body,
    });
    if (checkParams) throw checkParams;

    // ID作成
    const id = generateId(unisCustomerCd, category.slice(0, 1));

    const binaryData = Buffer.from(body["recordedFile"], "binary");
    // S3へPUT
    let res = await s3Manager.put(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${category}/${id}.wav`,
      binaryData
    );
    if (!res) throw "put failed";

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

    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes[category].pop();
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
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

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      category: category,
      body: body,
    });
    if (checkParams) throw checkParams;

    // 音声一覧から該当音声を取得
    const list = await this.getUserResource(unisCustomerCd, category);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item[`${category}Id`] === id);
    if (index < 0) throw "not found";
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

    const res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes[category][index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
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

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      category: category,
    });
    if (checkParams) throw checkParams;

    // 音声一覧から該当音声を取得
    const list = await this.getUserResource(unisCustomerCd, category);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item[`${category}Id`] === id);
    if (index < 0) throw "not found";
    const resource = list[index];

    // S3上の録音音声を削除
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${category}/${id}.wav`
    );

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

    const res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes[category];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
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
