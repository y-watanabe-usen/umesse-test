"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

// TTS音声取得（一覧・個別）
exports.fetch = async (unisCustomerCd, ttsId) => {
  constants.debuglog(
    `tts fetch unis_customer_cd: ${unisCustomerCd}, tts_id: ${ttsId}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "tts",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.tts;
    if (ttsId) {
      json = json.filter((item) => item.id === ttsId).pop();
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// TTS音声新規作成
exports.create = async (unisCustomerCd, fileName, resources) => {
  constants.debuglog(
    `tts create unis_customer_cd: ${unisCustomerCd}, fileName: ${fileName}`
  );

  try {
    // TODO: resources validation check
    if (!resources) throw "resources failed";

    // ID作成
    const id = constants.generateId(unisCustomerCd, "t");

    // S3へPUT
    await s3.put(
      constants.usersBucket,
      `users/${unisCustomerCd}/tts/${id}.mp3`,
      resources
    );

    const time = new Date().toISOString();
    // DynamoDBのデータ更新
    const data = {
      id: id,
      start_date: time,
      timestamp: time,
    };
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET tts = list_append(tts, :tts)",
      ExpressionAttributeValues: {
        ":tts": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.tts.pop();
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// TTS音声更新
exports.update = async (unisCustomerCd, ttsId, body) => {
  constants.debuglog(
    `tts update unis_customer_cd: ${unisCustomerCd}, ttsId: ${ttsId}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // TTS音声一覧から該当TTS音声を取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const tts = list
      .map((data, index) => {
        if (data.id === ttsId) return { data, index };
      })
      .pop();

    // DynamoDBのデータ更新
    if (body.title) tts.data.title = body.title;
    if (body.description) tts.data.description = body.description;
    tts.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET tts[${tts.index}] = :tts`,
      ExpressionAttributeValues: {
        ":tts": tts.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.tts;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// TTS音声削除
exports.remove = async (unisCustomerCd, ttsId) => {
  constants.debuglog(
    `tts remove unis_customer_cd: ${unisCustomerCd}, tts_id: ${ttsId}`
  );

  try {
    // TTS音声一覧から該当TTS音声を取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const tts = list
      .map((data, index) => {
        if (data.id === ttsId) return { data, index };
      })
      .pop();
    if (!tts) throw "not found";

    // S3上のTTS音声を削除（エラーは検知しなくてよいかも）
    await s3.delete(
      constants.usersBucket,
      `users/${unisCustomerCd}/tts/${ttsId}.mp3`
    );

    // DynamoDBのデータ更新
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `REMOVE tts[${tts.index}]`,
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.tts;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};
