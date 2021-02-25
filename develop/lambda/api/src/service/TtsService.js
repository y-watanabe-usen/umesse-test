'use strict';


/**
 * 新規録音データ
 * 合成音声素材を新規登録する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.createUserTts = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
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
 * TTSデータ削除
 * 合成音声素材を削除する
 *
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.deleteUserTts = function(ttsId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
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
 * TTSデータ取得
 * 合成音声素材の情報を取得する
 *
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.getUserTts = function(ttsId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
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
 * TTSデータ一覧取得
 * 合成音声素材の情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUserTts = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
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
 * TTSデータ更新（メタデータのみ）
 * 合成音声素材の情報を更新する
 *
 * body Object ユーザー素材データ更新リクエストBody (optional)
 * ttsId String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns TtsItem
 **/
exports.updateUserTts = function(body,ttsId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ttsId" : "123456789-t-12345678",
  "description" : "サンプル",
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

