'use strict';


/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、録音音声アップロード
 *
 * returns inline_response_200_5
 **/
exports.signedUrlGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "url" : "https://filesamples.com/samples/audio/aac/sample1.aac"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

