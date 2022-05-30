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

  // パラメーターチェック
  let params = {
    targetDate: targetDate,
  };
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  // YYYYMMDDのチェック
  let pattern = "/^[1-9]{1}[0-9]{3}(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])$/";
  let pramCheck = targetDate.match(pattern)
  if (pramCheck != null) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.Meta.findAll(targetDate);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }
 
  let meta = [];
  if (!ret) {
    ret.forEach(async (item) => {
      delete item.id;
      delete item.targetDate;
  
      meta.push(item);
    });
  }
  let json = {
    targetDate: targetDate,
    metas: meta,
  };

  return json;
};
