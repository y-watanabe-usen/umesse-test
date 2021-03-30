"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError, InternalServerError } = require("umesse-lib/error");
const { debuglog, errorlog } = require("umesse-lib/constants");
const { getUser } = require("../../umesse/user");

/**
 * ユーザー情報取得
 * ユーザーの情報を取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns User
 **/
exports.getUser = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUser(xUnisCustomerCd);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      if (e instanceof InternalServerError) errorlog(JSON.stringify(e));
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
