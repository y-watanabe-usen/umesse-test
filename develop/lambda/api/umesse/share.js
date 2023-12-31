"use strict";

const {
  constants,
  debuglog,
  errorlog,
  timestamp,
  responseData,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const db = require("./db");

// 共有CM取得（一覧・個別）
exports.getShareCm = async (unisCustomerCd, id) => {
  debuglog(
    `[getShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
    })}`
  );

  // パラメーターチェック
  let params = {
    unisCustomerCd: unisCustomerCd,
  };
  if (id) params.cmId = id;
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.findCm(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  ret = ret.filter((item) => item.status === constants.cmStatus.SHARING);
  if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);

  if (id) ret = ret.filter((item) => item.cmId === id).shift();
  if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);

  return responseData(ret, constants.resourceCategory.CM);
};

// 共有CM追加
exports.createShareCm = async (unisCustomerCd, id) => {
  debuglog(
    `[createShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: id,
  });
  if (checkError) throw new BadRequestError(checkError);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  if (cm.status !== constants.cmStatus.COMPLETE)
    throw new BadRequestError(ERROR_CODE.E0002000);

  // ユーザー情報取得
  let user;
  try {
    user = await db.User.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // S3上のCMをコピー
  try {
    let path = `${constants.resourceCategory.CM}/${id}.aac`;
    const _ = await s3Manager.copy(
      constants.s3Bucket().users,
      `group/${user.customerGroupCd}/${path}`,
      `${constants.s3Bucket().users}/users/${unisCustomerCd}/${path}`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.SHARING;
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, constants.resourceCategory.CM);
};

// 共有CM解除
exports.deleteShareCm = async (unisCustomerCd, id) => {
  debuglog(
    `[deleteShareCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: id,
  });
  if (checkError) throw new BadRequestError(checkError);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  if (cm.status !== constants.cmStatus.SHARING)
    throw new BadRequestError(ERROR_CODE.E0002000);

  // ユーザー情報取得
  let user;
  try {
    user = await db.User.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.COMPLETE;
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // S3上のCMを削除
  try {
    let path = `group/${user.customerGroupCd}/${constants.resourceCategory.CM}/${id}.aac`;
    const _ = await s3Manager.delete(constants.s3Bucket().users, path);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, constants.resourceCategory.CM);
};
