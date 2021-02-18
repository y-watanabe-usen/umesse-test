'use strict';


/**
 * 新規録音データ
 * 録音音声素材を新規登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserRecording = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
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
 * 録音データ削除
 * 録音音声素材を削除する
 *
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.deleteUserRecording = function(recordingId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
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
 * 録音データ取得
 * 録音音声素材の情報を取得する
 *
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.getUserRecording = function(recordingId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
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
 * 録音データ一覧取得
 * 録音音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserRecording = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
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
 * 録音音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * recordingId String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns RecordingItem
 **/
exports.updateUserRecording = function(body,recordingId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "recordingId" : "123456789-r-12345678",
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

