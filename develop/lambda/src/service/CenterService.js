"use strict";

const { create, remove, fetch, complete } = require("../../umesse/center");

/**
 * CMセンター連携追加
 *
 * body Body_3  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createCenterCm = function (body, cmId, xUnisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await create(xUnisCustomerCd, cmId, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * CMセンター連携削除
 *
 * body Body_4  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * no response value expected for this operation
 **/
exports.deleteCenterCm = function (cmId, xUnisCustomerCd) {
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
 * センターCM連携取得（センター専用）
 *
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200
 **/
exports.getCenterUpload = function (unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch(unisCustomerCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * センターCM連携（センター専用）
 *
 * returns List
 **/
exports.listCenterUpload = function () {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch();
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * センターCM連携完了（センター専用）
 *
 * body Body_5  (optional)
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_1
 **/
exports.updateCenterUpload = function (body, unisCustomerCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await complete(unisCustomerCd, body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
