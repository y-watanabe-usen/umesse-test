"use strict";

const { getExternalCm, completeExternalCm } = require("../../umesse/external");

/**
 * CM外部連携完了（外部システム専用）
 * 外部連携したCMの結果を登録する
 *
 * body Body_9  (optional)
 * external String ID of external system to return
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_2
 **/
exports.completeExternalCm = function (body, external, unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await completeExternalCm(unisCustomerCd, external, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM外部連携情報取得（外部システム専用）
 * 外部連携するCMの情報を取得する
 *
 * external String ID of external system to return
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_1
 **/
exports.getExternalCm = function (external, unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getExternalCm(unisCustomerCd, external);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM外部連携情報一覧取得（外部システム専用）
 * 外部連携するCMの情報を一覧で取得する
 *
 * external String ID of external system to return
 * returns List
 **/
exports.listExternalCm = function (external) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getExternalCm("", external);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
