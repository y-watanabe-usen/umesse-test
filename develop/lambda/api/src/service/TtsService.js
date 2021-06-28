"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { constants, debuglog } = require("umesse-lib/constants");
const {
  getUserResource,
  createTtsResource,
  generateTtsResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");
const { authToken } = require("../../umesse/user");

/**
 * TTSデータ登録
 * 合成音声素材を新規登録する
 *
 * body Object TTS登録リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.createUserTts = function (body, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await createTtsResource(xUnisCustomerCd, body);
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
 * TTSデータ削除
 * 合成音声素材を削除する
 *
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.deleteUserTts = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
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
 * xToken String トークンID
 * returns GenerateTtsItem
 **/
exports.generateUserTts = function (body, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await generateTtsResource(xUnisCustomerCd, body);
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
 * TTSデータ取得
 * 合成音声素材の情報を取得する
 *
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.getUserTts = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
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
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.listUserTts = function (sort, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.TTS,
        "",
        sort
      );
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
 * TTSデータ更新（メタデータのみ）
 * 合成音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.updateUserTts = function (body, id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
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
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
