"use strict";

const { constants } = require("umesse-lib/constants");
const {
  getUserResource,
  createUserResource,
  updateUserResource,
  deleteUserResource,
} = require("../../umesse/resources");

/**
 * 新規録音データ
 * 録音音声素材を新規登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserRecording = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await createUserResource(
      xUnisCustomerCd,
      constants.userResource.RECORDING,
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

/**
 * 録音データ削除
 * 録音音声素材を削除する
 *
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.deleteUserRecording = function (recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await deleteUserResource(
      xUnisCustomerCd,
      constants.userResource.RECORDING,
      recordingId
    );
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * 録音データ取得
 * 録音音声素材の情報を取得する
 *
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.getUserRecording = function (recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getUserResource(
      xUnisCustomerCd,
      constants.userResource.RECORDING,
      recordingId
    );
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    var response = {};
    const json = await getUserResource(
      xUnisCustomerCd,
      constants.userResource.RECORDING
    );
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * 録音データ更新（メタデータのみ）
 * 録音音声素材の情報を更新する
 *
 * body Body_4  (optional)
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.updateUserRecording = function (body, recordingId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await updateUserResource(
      xUnisCustomerCd,
      constants.userResource.RECORDING,
      recordingId,
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
