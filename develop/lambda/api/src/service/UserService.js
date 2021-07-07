"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { debuglog } = require("umesse-lib/constants");
const { agreeUser, getUser, authToken } = require("../../umesse/user");

/**
 * 約款同意
 * ユーザーの同意を登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns User
 **/
exports.agreeUser = function (xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await agreeUser(xUnisCustomerCd);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * ユーザー情報取得
 * ユーザーの情報を取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns User
 **/
exports.getUser = function (xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getUser(xUnisCustomerCd);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
