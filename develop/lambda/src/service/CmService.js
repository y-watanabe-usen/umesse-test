'use strict';


/**
 * CM情報削除
 *
 * cmId Long ID of cm to return
 * no response value expected for this operation
 **/
exports.userCmCmIdDELETE = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CM情報取得
 *
 * cmId String ID of cm to return
 * returns List
 **/
exports.userCmCmIdGET = function(cmId) {
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
 * CM情報更新
 *
 * body Body_2  (optional)
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.userCmCmIdPOST = function(body,cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CMリスト取得
 *
 * returns List
 **/
exports.userCmGET = function() {
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
 * CM新規結合
 *
 * body Body_1  (optional)
 * returns CmItem
 **/
exports.userCmPOST = function(body) {
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

