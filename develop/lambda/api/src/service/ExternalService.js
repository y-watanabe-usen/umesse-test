"use strict";

const { getExternalCm, completeExternalCm } = require("../../umesse/external");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");

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
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
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
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
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
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};
