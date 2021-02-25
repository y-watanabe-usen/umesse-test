'use strict';


/**
 * CM外部連携追加
 * CMを外部連携する
 *
 * body Object CM外部連携システムリクエストBody (optional)
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.createUploadCm = function(body,cmId,xUnisCustomerCd) {
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
 * CM外部連携解除
 * CMの外部連携を解除する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.deleteUploadCm = function(cmId,xUnisCustomerCd) {
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
 * CM外部連携情報取得
 * CMの外部連携状態を取得する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns ExternalItem
 **/
exports.getUploadCm = function(cmId,xUnisCustomerCd) {
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
 * CM外部連携情報一覧取得
 * CMの外部連携状態を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listUploadCm = function(xUnisCustomerCd) {
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

