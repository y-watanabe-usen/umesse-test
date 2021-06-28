"use strict";

const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { constants, debuglog } = require("umesse-lib/constants");
const {
  getUserResource,
  createRecordingResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");
const { authToken } = require("../../umesse/user");

/**
 * 録音データ登録
 * 録音音声素材を新規登録する
 *
 * body List 録音音声登録リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.createUserRecording = function (body, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await createRecordingResource(xUnisCustomerCd, body);
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
 * 録音データ削除
 * 録音音声素材を削除する
 *
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.deleteUserRecording = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await deleteUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.RECORDING,
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
 * 録音データ取得
 * 録音音声素材の情報を取得する
 *
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.getUserRecording = function (id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.RECORDING,
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
 * 録音データ一覧取得
 * 録音音声素材の情報を一覧で取得する
 *
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.listUserRecording = function (sort, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await getUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.RECORDING,
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
 * 録音データ更新（メタデータのみ）
 * 録音音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.updateUserRecording = function (body, id, xUnisCustomerCd, xToken) {
  return new Promise(async function (resolve, reject) {
    try {
      await authToken(xUnisCustomerCd, xToken);
      const json = await updateUserResource(
        xUnisCustomerCd,
        constants.resourceCategory.RECORDING,
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
