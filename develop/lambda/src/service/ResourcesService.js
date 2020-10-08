'use strict';


/**
 * BGM
 *
 * returns inline_response_200_1
 **/
exports.bgmGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  }, {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  } ],
  "value" : "value"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Open/Endチャイム
 *
 * returns inline_response_200_3
 **/
exports.chimeGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  }, {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  } ],
  "value" : "value"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * ナレーション
 *
 * returns inline_response_200_2
 **/
exports.narrationGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  }, {
    "name" : "name",
    "id" : 0,
    "detail" : "detail"
  } ],
  "value" : "value"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

