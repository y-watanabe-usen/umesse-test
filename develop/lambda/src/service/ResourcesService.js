'use strict';


/**
 * BGM
 *
 * returns inline_response_200_3
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
 * returns inline_response_200_5
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
 * returns inline_response_200_4
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


/**
 * TTSテンプレート一覧
 *
 * returns inline_response_200_2
 **/
exports.ttsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 0,
    "detail" : "detail",
    "title" : "title"
  }, {
    "id" : 0,
    "detail" : "detail",
    "title" : "title"
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

