'use strict';


/**
 * BGM
 *
 * returns inline_response_200_2
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
 * ナレーションリスト取得
 *
 * returns NarrationListItem
 **/
exports.narrationGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 1,
  "name" : "業種名1",
  "scenes" : [ {
    "id" : 11,
    "name" : "シーン名11"
  }, {
    "id" : 12,
    "name" : "シーン名12"
  }, {
    "id" : 13,
    "name" : "シーン名13"
  } ]
}, {
  "id" : 2,
  "name" : "業種名2",
  "scenes" : [ {
    "id" : 21,
    "name" : "シーン名21"
  }, {
    "id" : 22,
    "name" : "シーン名22"
  }, {
    "id" : 23,
    "name" : "シーン名23"
  } ]
}, {
  "id" : 3,
  "name" : "業種名3",
  "scenes" : [ {
    "id" : 31,
    "name" : "シーン名31"
  }, {
    "id" : 32,
    "name" : "シーン名32"
  }, {
    "id" : 33,
    "name" : "シーン名33"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * ナレーション取得
 *
 * sceneId Long ID of narration to return
 * returns NarrationSceneListItem
 **/
exports.narrationSceneIdGET = function(sceneId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 1,
  "name" : "18時30分閉店",
  "detail" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "second" : 10,
  "url" : "https://example.com"
}, {
  "id" : 2,
  "name" : "アルバイト募集",
  "detail" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "manuscript" : "当店ではアルバイトを募集しております。なんたらかんたら",
  "second" : 20,
  "url" : "https://example.com"
}, {
  "id" : 3,
  "name" : "チャイルドチェア",
  "detail" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "manuscript" : "本日はご来店いただきましてありがとうございます。なんたらかんたら",
  "second" : 30,
  "url" : "https://example.com"
}, {
  "id" : 4,
  "name" : "デリバリー",
  "detail" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "manuscript" : "本日はご来店いただきましてありがとうございます。なんたらかんたら",
  "second" : 40,
  "url" : "https://example.com"
} ];
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
 * returns inline_response_200_1
 **/
exports.ttsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ "{}", "{}" ],
  "value" : "value"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

