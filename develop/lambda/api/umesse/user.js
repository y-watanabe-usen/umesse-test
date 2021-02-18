"use strict";

const { debuglog, errorlog } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { BadRequestError, InternalServerError } = require("./error");

const db = require("./db");

// ユーザーデータ取得
exports.getUser = async (unisCustomerCd) => {
  debuglog(
    `[getUser] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  try {
    debuglog(`db.Uesr.find(${unisCustomerCd})`);
    return await db.User.find(unisCustomerCd);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};