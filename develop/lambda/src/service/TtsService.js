"use strict";

const { fetch, create, update, remove } = require("../../umesse/tts");

/**
 * 新規録音データ
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserTts = function (xUnisCustomerCd, filename, resources) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await create(xUnisCustomerCd, {
      filename: filename,
      resources: resources,
    });
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
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * ttsId String ID of tts to return
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
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * ttsId String ID of tts to return
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
 * TTSデータリスト取得
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
