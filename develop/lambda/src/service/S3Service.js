"use strict";

const { signedUrl } = require("../../umesse/s3");

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
    const json = await signedUrl(id);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
