"use strict";

const { fetch, create, update, remove } = require("../../umesse/recording");

/**
 * 新規録音データ
 * 録音音声素材を新規登録する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserRecording = function (xUnisCustomerCd, filename, resources) {
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
 * 録音データ削除
 * 録音音声素材を削除する
 *
 * recordingId String ID of recording to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * no response value expected for this operation
 **/
exports.deleteUserRecording = function (recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await remove(xUnisCustomerCd, recordingId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * 録音データ取得
 * 録音音声素材の情報を取得する
 *
 * recordingId String ID of recording to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns RecordingItem
 **/
exports.getUserRecording = function (recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch(xUnisCustomerCd, recordingId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * 録音データ一覧取得
 * 録音音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserRecording = function (xUnisCustomerCd) {
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
 * 録音データ更新（メタデータのみ）
 * 録音音声素材の情報を更新する
 *
 * body Body_6  (optional)
 * recordingId String ID of recording to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns RecordingItem
 **/
exports.updateUserRecording = function (body, recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await update(xUnisCustomerCd, recordingId, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
