"use strict";

const {
  getUserResource,
  createUserResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const category = "tts";

/**
 * 新規録音データ
 * 合成音声素材を新規登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserTts = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createUserResource(xUnisCustomerCd, category, body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * TTSデータ削除
 * 合成音声素材を削除する
 *
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.deleteUserTts = function (ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteUserResource(xUnisCustomerCd, category, ttsId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * TTSデータ取得
 * 合成音声素材の情報を取得する
 *
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.getUserTts = function (ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUserResource(xUnisCustomerCd, category, ttsId);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};

/**
 * TTSデータ一覧取得
 * 合成音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserTts = function (xUnisCustomerCd) {
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
 * TTSデータ更新（メタデータのみ）
 * 合成音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.updateUserTts = function (body, ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await updateUserResource(
        xUnisCustomerCd,
        category,
        ttsId,
        body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { code: e.code, message: e.message }))
    }
  });
};
