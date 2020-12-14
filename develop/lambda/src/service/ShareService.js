"use strict";

const { getShear, createShare, deleteShare } = require("../../umesse/share");

/**
 * CM共有追加
 * CMを共有する
 *
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await createShare(xUnisCustomerCd, cmId);
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
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.deleteShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await deleteShare(xUnisCustomerCd, cmId);
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.getShareCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getShear(xUnisCustomerCd, cmId);
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listShareCm = function (xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getShear(xUnisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
