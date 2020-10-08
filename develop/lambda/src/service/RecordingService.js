'use strict';


/**
 * 録音データリスト取得
 *
 * returns inline_response_200
 **/
exports.recordingGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 0,
    "detail" : "detail",
    "title" : "title"
  }, {
    "id" : 0,
    "detail" : "detail",
    "title" : "title"
  } ],
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
exports.recordingPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ削除
 *
 * recordingId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.recordingRecordingIdDELETE = function(recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ取得
 *
 * recordingId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.recordingRecordingIdGET = function(recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

