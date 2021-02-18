"use strict";

const { getUser } = require("../../umesse/user");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("../../umesse/error");

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
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};
