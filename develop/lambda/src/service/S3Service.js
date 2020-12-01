'use strict';
const { getSignedUrl } = require("../../umesse/backup/handler");

const bucket = "umesse-contents";


/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、録音音声アップロード
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * id String ID of signed url to return
 * returns inline_response_200_2
 **/
exports.getSignedUrl = function(xToken,xUnisCustomerCd,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx"
};

  // とりあえず適当な音源のsignedUrlを取得
  const params = {
    "bucket": bucket,
    "key": "bgm/サンプル02.mp3",
  }
  const json = await getSignedUrl(params);
  examples['application/json'] = json;

  if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

