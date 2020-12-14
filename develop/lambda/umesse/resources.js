"use strict";

const { constants, debuglog, timestamp, generateId } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

exports.getResource = async (filter, industryId, sceneId) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      filter: filter,
      industryId: industryId,
      sceneId: sceneId,
    })}`
  );

  const options = {
    FilterExpression: "contains(id, :id)",
    ExpressionAttributeValues: {
      ":id": filter,
    },
  };
  try {
    const res = await dynamodb.scan(constants.contentsTable, options);
    if (!res || !res.Items) throw "not found";

    let json = res.Items;
    if (industryId) {
      json = json.filter((item) =>
        item.industry.some((el) => el.id === industryId)
      );
    }
    if (sceneId) {
      json = json.filter((item) => item.scenes.some((el) => el.id === sceneId));
    }
    return json;
  } catch (e) {
    console.log(e);
    return { message: e };
  }
};

// 署名付きURL取得
exports.getSignedUrl = async (id) => {
  debuglog(
    `[getSignedUrl] ${JSON.stringify({
      id: id,
    })}`
  );

  try {
    const res = await s3.getSignedUrl(constants.contentsBucket, id);
    if (!res) throw "getSignedUrl failed";
    return { url: res };
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声取得（一覧・個別）
exports.getUserResource = async (unisCustomerCd, filter, id) => {
  debuglog(
    `[getUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      filter: filter,
      id: id,
    })}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: filter,
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item[filter];
    if (id) {
      json = json.filter((item) => item.id === id);
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声新規作成
exports.createUserResource = async (unisCustomerCd, filter, resource) => {
  debuglog(
    `[createUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      filter: filter,
    })}`
  );

  try {
    // TODO: resources validation check
    if (!resource) throw "resources failed";

    // ID作成
    let div = "";
    if (filter == constants.userResource.RECORDING) div = "r";
    else if (filter == constants.userResource.TTS) div = "t";
    const id = generateId(unisCustomerCd, div);

    // S3へPUT
    await s3.put(
      constants.usersBucket,
      `users/${unisCustomerCd}/${filter}/${id}.mp3`,
      resource
    );

    const time = timestamp();
    // DynamoDBのデータ更新
    const data = {
      id: id,
      start_date: time,
      timestamp: time,
    };
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET #filter = list_append(#filter, :data)",
      ExpressionAttributeName: {
        "#filter": filter,
      },
      ExpressionAttributeValues: {
        ":data": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes[filter];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声更新
exports.updateUserResource = async (unisCustomerCd, filter, id, body) => {
  debuglog(
    `[updateUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      filter: filter,
      id: id,
      body: body,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // 音声一覧から該当音声を取得
    const list = await this.getUserResource(unisCustomerCd, filter);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) throw "not found";
    const resource = list[index];

    // DynamoDBのデータ更新
    Object.keys(body).map((key) => {
      resource[key] = body[key];
    });
    resource.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET #filter[${index}] = :resource`,
      ExpressionAttributeName: {
        "#filter": filter,
      },
      ExpressionAttributeValues: {
        ":resource": resource,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes[filter][index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声削除
exports.deleteUserResource = async (unisCustomerCd, filter, id) => {
  debuglog(
    `[deleteUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      filter: filter,
      id: id,
    })}`
  );

  try {
    // 音声一覧から該当音声を取得
    const list = await this.getUserResource(unisCustomerCd, filter);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) throw "not found";
    const resource = list[index];

    // S3上の録音音声を削除
    await s3.delete(
      constants.usersBucket,
      `users/${unisCustomerCd}/${filter}/${id}.mp3`
    );

    // DynamoDBのデータ更新
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `REMOVE #filter[${resource.index}]`,
      ExpressionAttributeName: {
        "#filter": filter,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes[filter][index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
