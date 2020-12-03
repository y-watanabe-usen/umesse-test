'use strict';


/**
 * CM共有追加
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * no response value expected for this operation
 **/
exports.createShare = function(xUnisCustomerCd,cmId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * CM共有削除
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * returns CmItem
 **/
exports.deleteShare = function(xUnisCustomerCd,cmId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 6,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 0,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 0,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 1,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 5,
      "id" : "bgm/サンプル01"
    }
  },
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "サンプル",
  "industry" : "",
  "id" : "123456789-c-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : "",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * CM共有リスト取得
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listShare = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 6,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 0,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 0,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 1,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 5,
      "id" : "bgm/サンプル01"
    }
  },
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "サンプル",
  "industry" : "",
  "id" : "123456789-c-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : "",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 6,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 0,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 0,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 1,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 5,
      "id" : "bgm/サンプル01"
    }
  },
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "サンプル",
  "industry" : "",
  "id" : "123456789-c-12345678",
  "title" : "サンプル",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : "",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

