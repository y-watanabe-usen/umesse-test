"use strict";

const { getSignedUrl } = require("../../umesse/resources");

/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、音声素材アップロードのURLを取得する
 *
 * id String ID of signed url to return
 * returns inline_response_200
 **/
exports.getSignedUrl = function (id) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getSignedUrl(id);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
