"use strict";

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
      KeyConditionExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
    };

    const res = await dynamodbManager.query(
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
      category: category,
    });
    if (checkParams) throw checkParams;

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
