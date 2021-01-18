"use strict";

const {
  getUserResource,
  createUserResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");
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
    var response = {};
    const json = await createUserResource(xUnisCustomerCd, category, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    var response = {};
    const json = await deleteUserResource(xUnisCustomerCd, category, ttsId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    var response = {};
    const json = await getUserResource(xUnisCustomerCd, category, ttsId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    var response = {};
    const json = await getUserResource(xUnisCustomerCd, category);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    var response = {};
    const json = await updateUserResource(
      xUnisCustomerCd,
      category,
      ttsId,
      body
    );
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
