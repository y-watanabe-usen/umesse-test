"use strict";

const {
  constants,
  debuglog,
  warnlog,
  errorlog,
  timestamp,
} = require("umesse-lib/constants");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const db = require("./db");

// CMES連携データ取得（一覧）
exports.getMetaCm = async (targetDate) => {
  debuglog(
    `[getMetaCm] ${JSON.stringify({
      targetDate: targetDate,
    })}`
  );

  let json = {};

  return json;
};
