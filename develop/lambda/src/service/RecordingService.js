'use strict';

const { bgm, narration, userRecording } = require("../../umesse/resources");


/**
 * 新規録音データ
 *
 * no response value expected for this operation
 **/
exports.createUserRecording = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ削除
 *
 * recordingId String ID of recording to return
 * no response value expected for this operation
 **/
exports.deleteUserRecording = function(filename, recordedFile) {
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
 * 録音データ取得
 *
 * recordingId String ID of recording to return
 * returns RecordingItem
 **/
exports.getUserRecording = function(recordingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 録音データリスト取得
 *
 * returns List
 **/
exports.listUserRecording = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 録音データ更新（メタデータのみ）
 *
 * recordingId String ID of recording to return
 * returns RecordingItem
 **/
exports.updateUserRecording = function(recordingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

