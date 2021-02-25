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
  "errorMessege" : "CM名に規定外の文字が使用されています",
  "dataProcessType" : "01：正常完了、09：取込失敗",
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
 * returns ExternalItem
 **/
exports.getExternalCm = function(external,unisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cmMetas" : [ null, null ],
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
 * returns List
 **/
exports.listExternalCm = function(external) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cmMetas" : [ null, null ],
  "unisCustomerCd" : "123456789"
}, {
  "cmMetas" : [ null, null ],
  "unisCustomerCd" : "123456789"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

