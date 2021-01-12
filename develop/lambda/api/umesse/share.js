"use strict";

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { validation } = require("./validation");
const { getCm } = require("./cm");
const { getUser } = require("./user");

// 共有CM取得（一覧・個別）
exports.getShareCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("getShareCm", unisCustomerCd);
    if (checkParams) throw checkParams;

    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      KeyConditionExpression: "status = :status",
      ExpressionAttributeValues: {
        ":status": constants.cmStatus.SHARING,
      },
      ProjectionExpression: "cm",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.get(
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
    if (!json) throw "not found";
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 共有CM追加
exports.createShareCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[createShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // ユーザー情報取得
    const user = await getUser(unisCustomerCd);
    if (!user) throw "not found";

    // S3上のCMをコピー
    let res = await s3Manager.copy(
      constants.s3Bucket().users,
      `group/${user.customerGroupCd}/cm/${cmId}.mp3`,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
    if (!res) throw "copy failed";

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus("createShareCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.SHARING;
    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
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

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 共有CM解除
exports.deleteShareCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus("deleteShareCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

    // ユーザー情報取得
    const user = await getUser(unisCustomerCd);
    if (!user) throw "not found";

    // S3上のCMを削除
    await s3Manager.delete(
      constants.s3Bucket().users,
      `group/${user.customerGroupCd}/cm/${cmId}.mp3`
    );

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.COMPLETE;
    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
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

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
