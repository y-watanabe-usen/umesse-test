'use strict';
const { getSignedUrl } = require("../../umesse/backup/handler");

const bucket = "umesse-contents";

/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、録音音声アップロード
 *
 * returns inline_response_200_5
 **/
exports.signedUrlGET = function () {
  return new Promise(async function (resolve, reject) {
    var examples = {};
    // examples['application/json'] = {
    //   "url": "https://filesamples.com/samples/audio/aac/sample1.aac"
    // };

    // とりあえず適当な音源のsignedUrlを取得
    const params = {
      "bucket": bucket,
      "key": "BGM/サンプル02.mp3",
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

