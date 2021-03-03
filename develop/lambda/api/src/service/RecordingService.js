"use strict";

const {
  getUserResource,
  createRecordingResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const category = "recording";

/**
 * 録音データ登録
 * 録音音声素材を新規登録する
 *
 * body List 録音音声登録リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserRecording = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createRecordingResource(xUnisCustomerCd, body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * 録音データ削除
 * 録音音声素材を削除する
 *
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.deleteUserRecording = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteUserResource(
        xUnisCustomerCd,
        category,
        id
      );
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * 録音データ取得
 * 録音音声素材の情報を取得する
 *
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.getUserRecording = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUserResource(xUnisCustomerCd, category, id);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * 録音データ一覧取得
 * 録音音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserRecording = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUserResource(xUnisCustomerCd, category);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * 録音データ更新（メタデータのみ）
 * 録音音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.updateUserRecording = function (body, id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await updateUserResource(
        xUnisCustomerCd,
        category,
        id,
        body
      );
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};
