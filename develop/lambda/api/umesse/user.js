"use strict";

const { debuglog } = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
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
  const errorCodes = checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (errorCodes) throw new BadRequestError(ERROR_CODE[errorCodes.pop()]);

  try {
    return await db.User.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    else throw new InternalServerError(e.message);
  }
};
