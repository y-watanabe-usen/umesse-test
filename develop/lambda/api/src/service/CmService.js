"use strict";
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");

const { getCm, createCm, updateCm, deleteCm } = require("../../umesse/cm");

/**
 * CM新規結合
 * CMを新規作成する
 *
 * body Object CMデータ作成リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.createUserCm = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createCm(xUnisCustomerCd, body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * CM情報削除
 * CMを削除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.deleteUserCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * CM情報取得
 * CMの情報を取得する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.getUserCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getCm(xUnisCustomerCd, cmId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * CM一覧取得
 * CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserCm = function (sort, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getCm(xUnisCustomerCd, "", sort);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * CM情報更新
 * CMの情報を更新する
 *
 * body Object CMデータ更新リクエストBody (optional)
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.updateUserCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await updateCm(xUnisCustomerCd, cmId, body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};
