"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { debuglog } = require("umesse-lib/constants");
const { authUser } = require("../../umesse/user");

/**
 * 端末認証
 *
 * body Object 認証リクエストBody (optional)
 * returns Auth
 **/
exports.auth = function (body) {
  return new Promise(async function (resolve, reject) {
    try {
      // TODO: あとで消す
      if (!body || !body.unisCustomerCd) {
        resolve({ token: "123456789" });
        return;
      }
      const json = await authUser(body);
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
