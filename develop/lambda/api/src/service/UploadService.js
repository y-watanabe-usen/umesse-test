"use strict";

const {
  getUploadCm,
  createUploadCm,
  deleteUploadCm,
} = require("../../umesse/upload");

/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Object CM外部連携システムリクエストBody (optional)
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.createUploadCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await createUploadCm(xUnisCustomerCd, cmId, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM外部連携解除
 * CMの外部連携を解除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.deleteUploadCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await deleteUploadCm(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM外部連携情報取得
 * CMの外部連携状態を取得する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.getUploadCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getUploadCm(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM外部連携情報一覧取得
 * CMの外部連携状態を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUploadCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getUploadCm(xUnisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
