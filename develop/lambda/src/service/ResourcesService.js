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
    "name" : "bgm name",
    "id" : 1234,
    "detail" : "bgm detail"
  }, {
    "name" : "bgm name",
    "id" : 1234,
    "detail" : "bgm detail"
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
 * Open/Endチャイム
 *
 * returns inline_response_200_5
 **/
exports.chimeGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "chime name",
    "id" : 1234,
    "detail" : "chime detail"
  }, {
    "name" : "chime name",
    "id" : 1234,
    "detail" : "chime detail"
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
 * ナレーション
 *
 * returns inline_response_200_4
 **/
exports.narrationGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "narration name",
    "id" : 1234,
    "detail" : "narration detail"
  }, {
    "name" : "narration name",
    "id" : 1234,
    "detail" : "narration detail"
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
 * TTSテンプレート一覧
 *
 * returns inline_response_200_2
 **/
exports.ttsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 1234,
    "detail" : "tts detail",
    "title" : "tts title"
  }, {
    "id" : 1234,
    "detail" : "tts detail",
    "title" : "tts title"
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

