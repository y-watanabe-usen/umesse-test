'use strict';


/**
 * CM外部連携完了（外部システム専用）
 * 外部連携したCMの結果を登録する
 *
 * body Object 外部連携完了リクエストBody (optional)
 * external String 外部システム区分
 * unisCustomerCd String UNIS顧客CD
 * returns ExternalCompleteItem
 **/
exports.completeExternalCm = function(body,external,unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "dataProcessType" : "01：正常完了、09：取込失敗",
  "errorMessage" : "CM名に規定外の文字が使用されています",
  "errorCode" : "E0001",
  "cmId" : "123456789-c-12345678"
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
 * external String 外部システム区分
 * unisCustomerCd String UNIS顧客CD
 * lastdate String 最終取得日時 (optional)
 * returns ExternalItem
 **/
exports.getExternalCm = function(external,unisCustomerCd,lastdate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "description" : "テストCMです",
    "cmId" : "123456789-c-12345678",
    "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "123456789-c-12345678.aac",
    "sceneCd" : "001",
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "description" : "テストCMです",
    "cmId" : "123456789-c-12345678",
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
 * external String 外部システム区分
 * lastdate String 最終取得日時 (optional)
 * returns ExternalItems
 **/
exports.listExternalCm = function(external,lastdate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "unisCustomers" : [ {
    "cmMetas" : [ {
      "startDatetime" : "2020-01-01T12:34:56+09:00",
      "cmName" : "時報A",
      "fileName" : "123456789-c-12345678.aac",
      "sceneCd" : "001",
      "dataProcessType" : "01：追加、02：変更、03：削除",
      "cmCommentManuscript" : "テストCMです",
      "productionType" : "01：音楽系、02：素ナレ",
      "contentTime" : 30000,
      "description" : "テストCMです",
      "cmId" : "123456789-c-12345678",
      "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
      "endDatetime" : "9999-12-31T23:59:59+09:00"
    }, {
      "startDatetime" : "2020-01-01T12:34:56+09:00",
      "cmName" : "時報A",
      "fileName" : "123456789-c-12345678.aac",
      "sceneCd" : "001",
      "dataProcessType" : "01：追加、02：変更、03：削除",
      "cmCommentManuscript" : "テストCMです",
      "productionType" : "01：音楽系、02：素ナレ",
      "contentTime" : 30000,
      "description" : "テストCMです",
      "cmId" : "123456789-c-12345678",
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
      "dataProcessType" : "01：追加、02：変更、03：削除",
      "cmCommentManuscript" : "テストCMです",
      "productionType" : "01：音楽系、02：素ナレ",
      "contentTime" : 30000,
      "description" : "テストCMです",
      "cmId" : "123456789-c-12345678",
      "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
      "endDatetime" : "9999-12-31T23:59:59+09:00"
    }, {
      "startDatetime" : "2020-01-01T12:34:56+09:00",
      "cmName" : "時報A",
      "fileName" : "123456789-c-12345678.aac",
      "sceneCd" : "001",
      "dataProcessType" : "01：追加、02：変更、03：削除",
      "cmCommentManuscript" : "テストCMです",
      "productionType" : "01：音楽系、02：素ナレ",
      "contentTime" : 30000,
      "description" : "テストCMです",
      "cmId" : "123456789-c-12345678",
      "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
      "endDatetime" : "9999-12-31T23:59:59+09:00"
    } ],
    "unisCustomerCd" : "123456789"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

