"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError, InternalServerError } = require("umesse-lib/error");
const { debuglog, errorlog } = require("umesse-lib/constants");
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
      const json = await authUser(body);
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
