'use strict';


/**
 * UserのCM
 *
 * returns CMItem
 **/
exports.userCmGET = function() {
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


/**
 * User情報取得
 *
 * returns User
 **/
exports.userGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Meguro Cafe",
  "id" : 1234
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User情報更新
 *
 * no response value expected for this operation
 **/
exports.userPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

