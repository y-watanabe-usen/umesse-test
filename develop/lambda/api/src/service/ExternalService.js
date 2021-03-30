"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError, InternalServerError } = require("umesse-lib/error");
const { debuglog, errorlog } = require("umesse-lib/constants");
const { getExternalCm, completeExternalCm } = require("../../umesse/external");

/**
 * CM外部連携完了（外部システム専用）
 * 外部連携したCMの結果を登録する
 *
 * body Object 外部連携完了リクエストBody (optional)
 * external String 外部システム区分
 * unisCustomerCd String UNIS顧客CD
 * returns ExternalCompleteItem
 **/
exports.completeExternalCm = function (body, external, unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await completeExternalCm(unisCustomerCd, external, body);
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

/**
 * CM外部連携情報取得（外部システム専用）
 * 外部連携するCMの情報を取得する
 *
 * external String 外部システム区分
 * unisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.getExternalCm = function (external, unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getExternalCm(unisCustomerCd, external);
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

/**
 * CM外部連携情報一覧取得（外部システム専用）
 * 外部連携するCMの情報を一覧で取得する
 *
 * external String 外部システム区分
 * returns ExternalItems
 **/
exports.listExternalCm = function (external) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getExternalCm("", external);
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
