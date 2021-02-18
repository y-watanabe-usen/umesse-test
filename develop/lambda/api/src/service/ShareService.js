"use strict";

const {
  getShareCm,
  createShareCm,
  deleteShareCm,
} = require("../../umesse/share");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("../../umesse/error");

/**
 * CM共有追加
 * CMを共有する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.createShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createShareCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * CM共有削除
 * CMの共有を解除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.deleteShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteShareCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * 共有CM取得
 * 共有CMの情報を取得
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.getShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getShareCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};

/**
 * 共有CM一覧取得
 * 共有CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listShareCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getShareCm(xUnisCustomerCd);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};
