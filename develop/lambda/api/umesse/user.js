"use strict";

const { debuglog } = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");
const db = require("./db");

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  // パラメーターチェック
  const checkMessage = checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkMessage) throw new BadRequestError(checkMessage);

  try {
    return await db.User.find(unisCustomerCd);
  } catch (e) {
    throw new InternalServerError(e.message);
  }
};
