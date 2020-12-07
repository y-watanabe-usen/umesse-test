"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

// 録音音声取得（一覧・個別）
exports.fetch = async (unisCustomerCd, recordingId) => {
  constants.debuglog(
    `recording fetch unis_customer_cd: ${unisCustomerCd}, recording_id: ${recordingId}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "recording",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.recording;
    if (recordingId) {
      json = json.filter((item) => item.id === recordingId).pop();
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// 録音音声新規作成
exports.create = async (unisCustomerCd, params) => {
  constants.debuglog(
    `recording create unis_customer_cd: ${unisCustomerCd}, params: ${JSON.stringify(
      params
    )}`
  );

  try {
    // TODO: params validation check
    if (!params) throw "params failed";

    // ID作成
    const id = constants.generateId(unisCustomerCd, "r");

    // S3へPUT
    await s3.put(
      constants.usersBucket,
      `users/${unisCustomerCd}/recording/${id}.mp3`,
      params["resources"]
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
      UpdateExpression: "SET recording = list_append(recording, :recording)",
      ExpressionAttributeValues: {
        ":recording": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.recording.pop();
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// 録音音声更新
exports.update = async (unisCustomerCd, recordingId, body) => {
  constants.debuglog(
    `recording update unis_customer_cd: ${unisCustomerCd}, recordingId: ${recordingId}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // 録音音声一覧から該当録音音声を取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const recording = list
      .map((data, index) => {
        if (data.id === recordingId) return { data, index };
      })
      .pop();

    // DynamoDBのデータ更新
    recording.data.title = body.title;
    recording.data.description = body.description;
    recording.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET recording[${recording.index}] = :recording`,
      ExpressionAttributeValues: {
        ":recording": recording.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.recording;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// 録音音声削除
exports.remove = async (unisCustomerCd, recordingId) => {
  constants.debuglog(
    `recording remove unis_customer_cd: ${unisCustomerCd}, recording_id: ${recordingId}`
  );

  try {
    // 録音音声一覧から該当録音音声を取得
    const list = await this.fetch(unisCustomerCd);
    if (!list) throw "not found";
    const recording = list
      .map((data, index) => {
        if (data.id === recordingId) return { data, index };
      })
      .pop();

    // S3上の録音音声を削除（エラーは検知しなくてよいかも）
    await s3.delete(
      constants.usersBucket,
      `users/${unisCustomerCd}/recording/${recordingId}.mp3`
    );

    // DynamoDBのデータ更新
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `REMOVE recording[${recording.index}]`,
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.recording;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};
