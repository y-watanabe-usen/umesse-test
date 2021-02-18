"use strict";

const { constants, debuglog, errorlog, timestamp } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { getCm } = require("./cm");
const { getUser } = require("./user");
const { BadRequestError, InternalServerError } = require("./error");
const db = require("./db");

// 共有CM取得（一覧・個別）
exports.getShareCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);


  let json;
  try {
    json = await db.User.findCm(unisCustomerCd);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  json = json.filter((item) => item.status === constants.cmStatus.SHARING);
  if (cmId) {
    json = json.filter((item) => item.cmId === cmId)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
};

// 共有CM追加
exports.createShareCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[createShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // ユーザー情報取得
  const user = await getUser(unisCustomerCd);
  if (!user) throw new InternalServerError("not found");

  // S3上のCMをコピー
  let res;
  try {
    res = await s3Manager.copy(
      constants.s3Bucket().users,
      `group/${user.customerGroupCd}/cm/${cmId}.mp3`,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
  } catch (e) {
    erorrolg(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("copy failed");

  // TODO: CMステータス状態によるチェック

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.SHARING;
  cm.timestamp = timestamp();


  try {
    return await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
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

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await this.getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // ユーザー情報取得
  const user = await getUser(unisCustomerCd);
  if (!user) throw new InternalServerError("not found");

  // S3上のCMを削除
  try {
    await s3Manager.delete(
      constants.s3Bucket().users,
      `group/${user.customerGroupCd}/cm/${cmId}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.COMPLETE;
  cm.timestamp = timestamp();

  try {
    return await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    erorrolg(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};
