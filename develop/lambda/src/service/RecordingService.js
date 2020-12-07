'use strict';
const { bgm, userRecording } = require("../../umesse/resources");

/**
 * 新規録音データ
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserRecording = function(xUnisCustomerCd, filename, recordedFile) {
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * recordingId String ID of recording to return
 * no response value expected for this operation
 **/
exports.deleteUserRecording = function(xUnisCustomerCd,recordingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * 録音データ取得
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * recordingId String ID of recording to return
 * returns RecordingItem
 **/
exports.getUserRecording = function(xUnisCustomerCd,recordingId) {
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserRecording = function(xUnisCustomerCd) {
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns RecordingItem
 **/
exports.updateUserRecording = function(recordingId,xUnisCustomerCd) {
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

