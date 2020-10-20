'use strict';


/**
 * CMセンター連携削除
 *
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.centerCmIdDELETE = function(cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CMセンター連携追加
 *
 * body Body_3  (optional)
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.centerCmIdPOST = function(body,cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * センターCM連携完了（センター専用）
 *
 * cmId String ID of cm to return
 * returns inline_response_200
 **/
exports.centerDownloadCmIdPOST = function(cmId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 1234,
    "detail" : "center detail",
    "title" : "center title"
  }, {
    "id" : 1234,
    "detail" : "center detail",
    "title" : "center title"
  } ],
  "value" : "???"
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
 * returns inline_response_200
 **/
exports.centerDownloadGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 1234,
    "detail" : "center detail",
    "title" : "center title"
  }, {
    "id" : 1234,
    "detail" : "center detail",
    "title" : "center title"
  } ],
  "value" : "???"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

