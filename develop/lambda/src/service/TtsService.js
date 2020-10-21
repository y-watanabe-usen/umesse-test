'use strict';


/**
 * TTSデータリスト取得
 *
 * returns inline_response_200_1
 **/
exports.userTtsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ "{}", "{}" ],
  "value" : "value"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 新規録音データ
 *
 * no response value expected for this operation
 **/
exports.userTtsPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * TTSデータ削除
 *
 * ttsId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.userTtsTtsIdDELETE = function(ttsId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * TTSデータ取得
 *
 * ttsId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.userTtsTtsIdGET = function(ttsId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

