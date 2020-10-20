'use strict';


/**
 * CM共有削除
 *
 * cmId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.shareCmIdDELETE = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CM共有追加
 *
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.shareCmIdPOST = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CM共有リスト取得
 *
 * returns List
 **/
exports.shareGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "cm name",
  "id" : 1234,
  "detail" : "cm detail"
}, {
  "name" : "cm name",
  "id" : 1234,
  "detail" : "cm detail"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

