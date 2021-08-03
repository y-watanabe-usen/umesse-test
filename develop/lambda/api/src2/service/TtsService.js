'use strict';


/**
 * TTSデータ登録
 * 合成音声素材を新規登録する
 *
 * body Object TTS登録リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns List
 **/
exports.createUserTts = function(body,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
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
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.deleteUserTts = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
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
 * TTSデータ生成
 * 合成音声を生成する
 *
 * body Object TTS作成リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns GenerateTtsItem
 **/
exports.generateUserTts = function(body,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "details" : [ {
    "lang" : "ja | en | zh | ko",
    "url" : "https://xxxxx/tts-jp.mp3?AWSAccessKeyId=xxxxxxxx"
  }, {
    "lang" : "ja | en | zh | ko",
    "url" : "https://xxxxx/tts-jp.mp3?AWSAccessKeyId=xxxxxxxx"
  } ],
  "id" : "123456789",
  "category" : "template"
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
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.getUserTts = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
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
 * xToken String トークンID
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listUserTts = function(xUnisCustomerCd,xToken,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
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
 * id String 合成音声ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns TtsItem
 **/
exports.updateUserTts = function(body,id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "サンプル",
  "id" : "123456789-t-12345678",
  "category" : "tts",
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

