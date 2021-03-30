"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError, InternalServerError } = require("umesse-lib/error");
const { constants, debuglog, errorlog } = require("umesse-lib/constants");
const {
  getUserResource,
  createTtsResource,
  generateTtsResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");

/**
 * TTSデータ登録
 * 合成音声素材を新規登録する
 *
 * body Object TTS登録リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserTts = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createTtsResource(xUnisCustomerCd, body);
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
 * TTSデータ削除
 * 合成音声素材を削除する
 *
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.deleteUserTts = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await deleteUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.TTS,
        id
      );
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
 * TTSデータ生成
 * 合成音声を生成する
 *
 * body Object TTS作成リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * returns GenerateTtsItem
 **/
exports.generateUserTts = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await generateTtsResource(xUnisCustomerCd, body);
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
 * TTSデータ取得
 * 合成音声素材の情報を取得する
 *
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.getUserTts = function (id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.TTS,
        id
      );
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
 * TTSデータ一覧取得
 * 合成音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserTts = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.TTS
      );
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
 * TTSデータ更新（メタデータのみ）
 * 合成音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.updateUserTts = function (body, id, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await updateUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.TTS,
        id,
        body
      );
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
