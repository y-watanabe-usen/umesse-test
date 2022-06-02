"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { debuglog } = require("umesse-lib/constants");
const { getMetaCm } = require("../../umesse/meta");

/**
 * 更新CMID一覧取得（外部システム専用）
 * 更新CMID一覧取得
 *
 * targetDate String 取得日時(YYYYMMDD)
 * returns MetaExternalCm
 **/
exports.listMetaCm = function (targetDate) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getMetaCm(targetDate);
      debuglog(JSON.stringify(json));

      if (!json.metas.length) {
        resolve(
          respondWithCode(204, json)
        );
      } else {
        resolve(json);
      }
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
