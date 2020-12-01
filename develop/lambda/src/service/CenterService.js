'use strict';


/**
 * CMセンター連携追加
 *
 * body Body_3  (optional)
 * cmId String ID of cm to return
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createCenterCm = function(body,cmId,xToken,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 6,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 0,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 0,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 1,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 5,
      "id" : "bgm/サンプル01"
    }
  },
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "サンプル",
  "industry" : "",
  "id" : "123456789-c-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : "",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー",
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
 * CMセンター連携削除
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.deleteCenterCm = function(xToken,xUnisCustomerCd,cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * センターCM連携取得（センター専用）
 *
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200
 **/
exports.getCenterUpload = function(unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
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
 * センターCM連携（センター専用）
 *
 * returns List
 **/
exports.listCenterUpload = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  } ],
  "unisCustomerCd" : "123456789"
}, {
  "cmMetas" : [ {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
    "endDatetime" : "9999-12-31T23:59:59+09:00"
  }, {
    "startDatetime" : "2020-01-01T12:34:56+09:00",
    "cmName" : "時報A",
    "fileName" : "0999999900-c-sfja8eo1.aac",
    "sceneCd" : "001",
    "uMesseCmCd" : "0999999900-c-sfja8eo1",
    "fileSize" : 1234567,
    "dataProcessType" : "01：追加、02：変更、03：削除",
    "cmCommentManuscript" : "テストCMです",
    "productionType" : "01：音楽系、02：素ナレ",
    "contentTime" : 30000,
    "url" : "https://xxxxx/0999999900-c-sfja8eo1.aac?AWSAccessKeyId=xxxxxxxx",
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


/**
 * センターCM連携完了（センター専用）
 *
 * body Body_4  (optional)
 * unisCustomerCd String ID of unis customer cd to return
 * returns inline_response_200_1
 **/
exports.updateCenterUpload = function(body,unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "errorMessege" : "CM名に規定外の文字が使用されています",
  "uMesseCmCd" : "0999999900-c-sfja8eo1",
  "dataProcessType" : "01：正常完了、09：取込失敗",
  "errorCode" : "E0001"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

