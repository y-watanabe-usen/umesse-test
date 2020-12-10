'use strict';


/**
 * CM共有追加
 * CMを共有する
 *
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createShareCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 50,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 150,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 50,
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
 * CM共有削除
 * CMの共有を解除する
 *
 * cmId String ID of cm to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.deleteShareCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 50,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 150,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 50,
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
 * 共有CM取得
 * 共有CMの情報を取得
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.getShareCm = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 50,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 150,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 50,
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
 * 共有CM一覧取得
 * 共有CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listShareCm = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : {
    "startChime" : {
      "volume" : 50,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 150,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 50,
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
      "volume" : 50,
      "id" : "chime/サンプル01"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "narration/サンプル01"
    }, {
      "volume" : 150,
      "id" : "narration/サンプル01"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "chime/サンプル02"
    },
    "bgm" : {
      "volume" : 50,
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

