"use strict";

const { fetch, create, update, remove } = require("../../umesse/recording");

/**
 * 新規録音データ
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserRecording = function (xUnisCustomerCd, filename, resources) {
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
 * 録音データ削除
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * recordingId String ID of recording to return
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
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * recordingId String ID of recording to return
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
 * 録音データリスト取得
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
 *
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
