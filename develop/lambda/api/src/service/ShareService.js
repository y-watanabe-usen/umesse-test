"use strict";

const {
  getShareCm,
  createShareCm,
  deleteShareCm,
} = require("../../umesse/share");

/**
 * CM共有追加
 * CMを共有する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.createShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await createShareCm(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * CM共有削除
 * CMの共有を解除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.deleteShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await deleteShareCm(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * 共有CM取得
 * 共有CMの情報を取得
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.getShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getShareCm(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * 共有CM一覧取得
 * 共有CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listShareCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getShareCm(xUnisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
