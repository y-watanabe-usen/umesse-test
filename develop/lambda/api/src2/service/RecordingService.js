'use strict';


/**
 * 録音データ登録
 * 録音音声素材を新規登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.createUserRecording = function(xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
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
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.deleteUserRecording = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
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
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.getUserRecording = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
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
 * xToken String トークンID
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listUserRecording = function(xUnisCustomerCd,xToken,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
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
 * id String 録音音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns RecordingItem
 **/
exports.updateUserRecording = function(body,id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-r-12345678",
  "category" : "recording",
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

