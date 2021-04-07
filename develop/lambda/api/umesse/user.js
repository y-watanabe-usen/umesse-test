"use strict";

const { debuglog, errorlog } = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const db = require("./db");

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkError) throw new BadRequestError(checkError);

  try {
    return await db.User.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }
};

// 認証
exports.authUser = async (body) => {
  debuglog(
    `[authUser] ${JSON.stringify({
      body: body,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams({
    ...body,
  });
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.find(body.unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return { token: ret.unisCustomerCd };
};
