'use strict';


/**
 * 新規録音データ
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.createUserTts = function(xToken,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
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
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * ttsId String ID of tts to return
 * no response value expected for this operation
 **/
exports.deleteUserTts = function(xToken,xUnisCustomerCd,ttsId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * TTSデータ取得
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * ttsId String ID of tts to return
 * returns TtsItem
 **/
exports.getUserTts = function(xToken,xUnisCustomerCd,ttsId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
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
 * TTSデータリスト取得
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserTts = function(xToken,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
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
 *
 * ttsId String ID of tts to return
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns TtsItem
 **/
exports.updateUserTts = function(ttsId,xToken,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
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

