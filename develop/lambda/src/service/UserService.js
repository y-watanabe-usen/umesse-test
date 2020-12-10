"use strict";

const { fetch } = require("../../umesse/user");

/**
 * ユーザー情報取得
 * ユーザーの情報を取得する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns User
 **/
exports.getUser = function (xUnisCustomerCd) {
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
