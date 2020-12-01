'use strict';


/**
 * CM新規結合
 *
 * body Body_1  (optional)
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.createUserCm = function(body,xToken,xUnisCustomerCd) {
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
 * CM情報削除
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * returns CmItem
 **/
exports.deleteUserCm = function(xToken,xUnisCustomerCd,cmId) {
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
 * CM情報取得
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * cmId String ID of cm to return
 * returns CmItem
 **/
exports.getUserCm = function(xToken,xUnisCustomerCd,cmId) {
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
 * CMリスト取得
 *
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns List
 **/
exports.listUserCm = function(xToken,xUnisCustomerCd) {
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


/**
 * CM情報更新
 *
 * body Body_2  (optional)
 * cmId String ID of cm to return
 * xToken String ID of token to return
 * xUnisCustomerCd String ID of unis customer cd to return
 * returns CmItem
 **/
exports.updateUserCm = function(body,cmId,xToken,xUnisCustomerCd) {
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

