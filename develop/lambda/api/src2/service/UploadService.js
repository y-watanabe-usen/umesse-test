'use strict';


/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Object CM外部連携システムリクエストBody (optional)
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.createUploadCm = function(body,id,xUnisCustomerCd,xToken) {
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
 * CM外部連携解除
 * CMの外部連携を解除する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.deleteUploadCm = function(id,xUnisCustomerCd,xToken) {
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
 * CM外部連携情報取得
 * CMの外部連携状態を取得する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItem
 **/
exports.getUploadCm = function(id,xUnisCustomerCd,xToken) {
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
 * CM外部連携情報一覧取得
 * CMの外部連携状態を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns ExternalItems
 **/
exports.listUploadCm = function(xUnisCustomerCd,xToken) {
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

