"use strict";

const {
  constants,
  debuglog,
  timestamp,
  checkCmStatus,
} = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;
const { getCm } = require("./cm");
const { getUser } = require("./user");

// 共有CM取得（一覧・個別）
exports.getShear = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getShear] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    json = json.filter((item) => item.status === constants.cmStatus.SHARING);
    if (cmId) {
      json = json.filter((item) => item.id === cmId)[0];
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 共有CM追加
exports.createShear = async (unisCustomerCd, cmId) => {
  debuglog(
    `[createShear] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // ユーザー情報取得
    const user = await getUser(unisCustomerCd);
    if (!user) throw "not found";

    // S3上のCMをコピー
    await s3.copy(
      constants.usersBucket,
      `group/${user.customer_group_cd}/cm/${cmId}.mp3`,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );

    // CMステータス状態によるチェック
    const check = checkCmStatus("createShear", cm.status);
    if (check) throw check;

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.SHARING;
    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 共有CM解除
exports.deleteShear = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteShear] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("deleteShear", cm.status);
    if (check) throw check;

    // ユーザー情報取得
    const user = await getUser(unisCustomerCd);
    if (!user) throw "not found";

    // S3上のCMを削除
    await s3.delete(
      constants.usersBucket,
      `group/${user.customer_group_cd}/cm/${cmId}.mp3`
    );

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.COMPLETE;
    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
