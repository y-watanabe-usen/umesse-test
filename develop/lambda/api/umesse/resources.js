"use strict";

const { constants, debuglog, timestamp, generateId } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { validation } = require("./validation");

exports.getResource = async (filter, industryCd, sceneCd) => {
  debuglog(
    `[getResource] ${JSON.stringify({
      filter: filter,
      industryCd: industryCd,
      sceneCd: sceneCd,
    })}`
  );

  const options = {
    FilterExpression: "contains(id, :id)",
    ExpressionAttributeValues: {
      ":id": filter,
    },
  };
  try {
    const res = await dynamodbManager.scan(
      constants.dynamoDbTable().contents,
      options
    );
    if (!res || !res.Items.length) throw "not found";

    let json = res.Items;
    if (industryCd) {
      json = json.filter((item) =>
        item.industry.some((el) => el.cd === industryCd)
      );
    }
    if (sceneCd) {
      json = json.filter((item) => item.scene.some((el) => el.cd === sceneCd));
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
    let bucket = "";
    let path = "";
    let match = id.match(`([0-9]{9})-([crt])-[0-9a-z]{8}`);
    if (match && match.length) {
      bucket = constants.s3Bucket().users;
      let div = "";
      if (match[2] == "c") div = "cm";
      else if (match[2] == "r") div = "recording";
      else if (match[2] == "t") div = "tts";
      path = `users/${match[1]}/${div}/${id}.wav`;
    } else {
      bucket = constants.s3Bucket().contents;
      path = id;
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
    // パラメーターチェック
    const checkParams = validation.checkParams(
      "getUserResource",
      unisCustomerCd
    );
    if (checkParams) throw checkParams;

    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression: filter,
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res || !res.Item) throw "not found";

    let json = res.Item[filter];
    if (id) {
      json = json.filter((item) => item.id === id)[0];
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// ユーザー作成の音声新規作成
exports.createUserResource = async (unisCustomerCd, filter, body) => {
  debuglog(
    `[createUserResource] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      filter: filter,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("createUserResource", body);
    if (checkParams) throw checkParams;

    // ID作成
    let div = "";
    if (filter == constants.userResource.RECORDING) div = "r";
    else if (filter == constants.userResource.TTS) div = "t";
    const id = generateId(unisCustomerCd, div);

    const binaryData = Buffer.from(body["recordedFile"], "binary");
    // S3へPUT
    let res = await s3Manager.put(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${filter}/${id}.wav`,
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
      UpdateExpression: "SET #filter = list_append(#filter, :data)",
      ExpressionAttributeNames: {
        "#filter": filter,
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

    let json = res.Attributes[filter].pop();
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
    // パラメーターチェック
    const checkParams = validation.checkParams("updateUserResource", body);
    if (checkParams) throw checkParams;

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
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET #filter[${index}] = :resource`,
      ExpressionAttributeNames: {
        "#filter": filter,
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
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${filter}/${id}.wav`
    );

    // DynamoDBのデータ更新
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `REMOVE #filter[${index}]`,
      ExpressionAttributeNames: {
        "#filter": filter,
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

    let json = res.Attributes[filter];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
