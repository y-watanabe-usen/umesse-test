"use strict";

const { fetch } = require("../../umesse/user");

/**
 * User情報取得
 *
 * returns User
 **/
exports.getUser = function () {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch("123456789");
    response['application/json'] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
