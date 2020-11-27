'use strict';

const { bgm, narration, userRecording } = require("../../umesse/resources");


/**
 * 録音データリスト取得
 *
 * returns inline_response_200_1
 **/
exports.userRecordingGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 1234,
    "detail" : "recording detail",
    "title" : "recording title"
  }, {
    "id" : 1234,
    "detail" : "recording detail",
    "title" : "recording title"
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
exports.userRecordingPOST = function(filename, recordedFile) {

  return new Promise(function(resolve, reject) {
    try {
      var data = {
        'filename': filename,
        'resouces': recordedFile
      };
      console.log(data);
      userRecording.put(data);

      resolve();
    } catch(e) {
      console.log(e);
      reject()
    }

  });
}


/**
 * 録音データ削除
 *
 * recordingId String ID of recording to return
 * no response value expected for this operation
 **/
exports.userRecordingRecordingIdDELETE = function(recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ取得
 *
 * recordingId String ID of recording to return
 * no response value expected for this operation
 **/
exports.userRecordingRecordingIdGET = function(recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ更新（メタデータのみ）
 *
 * recordingId String ID of recording to return
 * no response value expected for this operation
 **/
exports.userRecordingRecordingIdPOST = function(recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

