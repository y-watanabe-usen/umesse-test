"use strict";

const {
  getUploadCm,
  createUploadCm,
  deleteUploadCm,
} = require("../../umesse/upload");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("../../umesse/error");

/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Object CM外部連携システムリクエストBody (optional)
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.createUploadCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createUploadCm(xUnisCustomerCd, cmId, body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * CM外部連携解除
 * CMの外部連携を解除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.deleteUploadCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteUploadCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * CM外部連携情報取得
 * CMの外部連携状態を取得する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.getUploadCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUploadCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * CM外部連携情報一覧取得
 * CMの外部連携状態を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUploadCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUploadCm(xUnisCustomerCd);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};
