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
 * returns CreateCmItem
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
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.deleteUserCm = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteCm(xUnisCustomerCd, id);
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
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.getUserCm = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getCm(xUnisCustomerCd, id);
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
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
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
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.updateUserCm = function (body, id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await updateCm(xUnisCustomerCd, id, body);
      resolve(json);
    } catch (e) {
      console.log(e);
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};
