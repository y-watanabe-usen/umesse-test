"use strict";

const { fetch, create, update, remove } = require("../../umesse/cm");

/**
 * CM新規結合
 *
 * body Body_1  (optional)
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createUserCm = function (body, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await create(xUnisCustomerCd, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * CM情報削除
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * returns CmItem
 **/
exports.deleteUserCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await remove(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * CM情報取得
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * returns CmItem
 **/
exports.getUserCm = function (cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch(xUnisCustomerCd, cmId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * CMリスト取得
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserCm = function (xUnisCustomerCd) {
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
 * CM情報更新
 *
 * body Body_2  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.updateUserCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await update(xUnisCustomerCd, cmId, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
