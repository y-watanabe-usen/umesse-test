'use strict';


/**
 * cm 削除
 *
 * cmId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.cmCmIdDELETE = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CM情報更新
 *
 * cmId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.cmCmIdPOST = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CMリスト取得
 *
 * returns List
 **/
exports.cmGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 0,
  "detail" : "detail"
}, {
  "name" : "name",
  "id" : 0,
  "detail" : "detail"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * CM新規追加
 *
 * returns CMItem
 **/
exports.cmPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 0,
  "detail" : "detail"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

