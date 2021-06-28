"use strict";

const {
  debuglog,
  errorlog,
  timestamp,
  generateToken,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
  BadRequestError,
  ForbiddenError,
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

  // token発行
  const token = generateToken();
  const expiration = timestamp(9 + 24); // 24h

  try {
    ret = await db.User.updateAuth(body.unisCustomerCd, token, expiration);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return { token: token };
};

// token認証
exports.authToken = async (unisCustomerCd, token) => {
  debuglog(
    `[authToken] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      token: token,
    })}`
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // token check
  if (token != ret.authToken) throw new ForbiddenError(ERROR_CODE.E0000403);
  if (timestamp() > ret.authExpiration)
    throw new ForbiddenError(ERROR_CODE.E0000403);

  // token更新
  const expiration = timestamp(9 + 24); // 24h

  try {
    ret = await db.User.updateAuth(unisCustomerCd, token, expiration);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return { token: token };
};
