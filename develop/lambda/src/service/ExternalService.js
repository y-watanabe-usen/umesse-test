'use strict';


/**
 * CM外部連携完了（外部システム専用）
 * 外部連携したCMの結果を登録する
 *
 * body Body_9  (optional)
 * external String ID of external system to return
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_2
 **/
exports.completeExternalCm = function(body,external,unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "errorMessege" : "CM名に規定外の文字が使用されています",
  "dataProcessType" : "01：正常完了、09：取込失敗",
  "errorCode" : "E0001",
  "uMesseCmId" : "123456789-c-12345678"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * CM外部連携情報取得（外部システム専用）
 * 外部連携するCMの情報を取得する
 *
 * external String ID of external system to return
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_1
 **/
exports.getExternalCm = function(external,unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  } ],
  "unisCustomerCd" : "123456789"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * CM外部連携情報一覧取得（外部システム専用）
 * 外部連携するCMの情報を一覧で取得する
 *
 * external String ID of external system to return
 * returns List
 **/
exports.listExternalCm = function(external) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  } ],
  "unisCustomerCd" : "123456789"
}, {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "uMesseCmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  } ],
  "unisCustomerCd" : "123456789"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

