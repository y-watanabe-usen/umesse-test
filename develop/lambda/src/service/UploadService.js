'use strict';


/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Body_3  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.createUploadCm = function(body,cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
 * body Body_4  (optional)
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.deleteUploadCm = function(body,cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns ExternalItem
 **/
exports.getUploadCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUploadCm = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

