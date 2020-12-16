"use strict";

const { constants, debuglog, timestamp } = require("./constants");
const { validation } = require("./validation");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;
const { getCm } = require("./cm");
const { getUser } = require("./user");

// 共有CM取得（一覧・個別）
exports.getShearCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getShearCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodb.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
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
exports.createShearCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[createShearCm] ${JSON.stringify({
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
    let res = await s3.copy(
      constants.s3Bucket().users,
      `group/${user.customer_group_cd}/cm/${cmId}.mp3`,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
    if (!res) throw "copy failed";

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus("createShearCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

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
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodb.update(constants.dynamoDbTable().users, key, options);
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
exports.deleteShearCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteShearCm] ${JSON.stringify({
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
    const checkCmStatus = validation.checkCmStatus("deleteShearCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

    // ユーザー情報取得
    const user = await getUser(unisCustomerCd);
    if (!user) throw "not found";

    // S3上のCMを削除
    await s3.delete(
      constants.s3Bucket().users,
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
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodb.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
