"use strict";

const { linkCm, unlinkCm } = require("../../umesse/cm");
const { getUserExternalCm } = require("../../umesse/external");

/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Body_3  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.createUploadCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await linkCm(xUnisCustomerCd, cmId, body);
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
 * body Body_4  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.deleteUploadCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await unlinkCm(xUnisCustomerCd, cmId, body);
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
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.getUploadCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getUserExternalCm(xUnisCustomerCd, cmId);
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUploadCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getUserExternalCm(xUnisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
