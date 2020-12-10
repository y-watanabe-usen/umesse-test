"use strict";

const { fetch, create, update, remove } = require("../../umesse/tts");

/**
 * 新規録音データ
 * 合成音声素材を新規登録する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserTts = function (xUnisCustomerCd, filename, resources) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await create(xUnisCustomerCd, filename, resources);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * TTSデータ削除
 * 合成音声素材を削除する
 *
 * ttsId String ID of tts to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * no response value expected for this operation
 **/
exports.deleteUserTts = function (ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await remove(xUnisCustomerCd, ttsId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * TTSデータ取得
 * 合成音声素材の情報を取得する
 *
 * ttsId String ID of tts to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns TtsItem
 **/
exports.getUserTts = function (ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch(xUnisCustomerCd, ttsId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * TTSデータ一覧取得
 * 合成音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserTts = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch(xUnisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * TTSデータ更新（メタデータのみ）
 *
 * body Body_8  (optional)
 * ttsId String ID of tts to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns TtsItem
 **/
exports.updateUserTts = function (body, ttsId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await update(xUnisCustomerCd, ttsId, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
