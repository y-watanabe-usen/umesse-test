'use strict';


/**
 * TTSデータリスト取得
 *
 * returns inline_response_200_2
 **/
exports.userTtsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 1234,
    "detail" : "tts detail",
    "title" : "tts title"
  }, {
    "id" : 1234,
    "detail" : "tts detail",
    "title" : "tts title"
  } ],
  "value" : "???"
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
 * ttsId String ID of tts to return
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
 * ttsId String ID of tts to return
 * no response value expected for this operation
 **/
exports.userTtsTtsIdGET = function(ttsId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * TTSデータ更新（メタデータのみ）
 *
 * ttsId String ID of tts to return
 * no response value expected for this operation
 **/
exports.userTtsTtsIdPOST = function(ttsId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

