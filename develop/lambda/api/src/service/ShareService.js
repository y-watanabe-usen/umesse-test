'use strict';


/**
 * CM共有追加
 * CMを共有する
 *
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.createShareCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : [ {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  }, {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  } ],
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "cmId" : "123456789-c-12345678",
  "title" : "タイムセール",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー, 21: S'senceアップロード中, 22: S'senceアップロード完了, 29: S'senceアップロードエラー",
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
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.deleteShareCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : [ {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  }, {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  } ],
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "cmId" : "123456789-c-12345678",
  "title" : "タイムセール",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー, 21: S'senceアップロード中, 22: S'senceアップロード完了, 29: S'senceアップロードエラー",
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
 * cmId String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * returns CmItem
 **/
exports.getShareCm = function(cmId,xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : [ {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  }, {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  } ],
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "cmId" : "123456789-c-12345678",
  "title" : "タイムセール",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー, 21: S'senceアップロード中, 22: S'senceアップロード完了, 29: S'senceアップロードエラー",
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
 * xUnisCustomerCd String UNIS顧客CD
 * returns List
 **/
exports.listShareCm = function(xUnisCustomerCd) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : [ {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  }, {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  } ],
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "cmId" : "123456789-c-12345678",
  "title" : "タイムセール",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー, 21: S'senceアップロード中, 22: S'senceアップロード完了, 29: S'senceアップロードエラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 540,
  "endDate" : "9999-12-31T23:59:59+09:00",
  "materials" : [ {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  }, {
    "startChime" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    },
    "narrations" : [ {
      "contentsId" : "サンプル01",
      "volume" : 150
    }, {
      "contentsId" : "サンプル01",
      "volume" : 150
    } ],
    "endChime" : {
      "contentsId" : "サンプル02",
      "volume" : 50
    },
    "bgm" : {
      "contentsId" : "サンプル01",
      "volume" : 50
    }
  } ],
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "cmId" : "123456789-c-12345678",
  "title" : "タイムセール",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 09: CM作成エラー, 11: センターアップロード中, 12: センターアップロード完了, 19: センターアップロードエラー, 21: S'senceアップロード中, 22: S'senceアップロード完了, 29: S'senceアップロードエラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

