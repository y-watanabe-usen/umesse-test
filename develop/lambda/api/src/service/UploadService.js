"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { debuglog } = require("umesse-lib/constants");
const {
  getUploadCm,
  createUploadCm,
  deleteUploadCm,
} = require("../../umesse/upload");

/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Object CM外部連携システムリクエストBody (optional)
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.createUploadCm = function (body, id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createUploadCm(xUnisCustomerCd, id, body);
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
 * CM外部連携解除
 * CMの外部連携を解除する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.deleteUploadCm = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteUploadCm(xUnisCustomerCd, id);
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
 * CM外部連携情報取得
 * CMの外部連携状態を取得する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.getUploadCm = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUploadCm(xUnisCustomerCd, id);
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
 * CM外部連携情報一覧取得
 * CMの外部連携状態を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItems
 **/
exports.listUploadCm = function (xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUploadCm(xUnisCustomerCd);
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
