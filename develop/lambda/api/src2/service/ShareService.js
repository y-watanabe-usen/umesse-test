'use strict';


/**
 * CM共有追加
 * CMを共有する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.createShareCm = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "endDate" : "9999-12-31T23:59:59+09:00",
  "uploadErrorMessage" : "CM名に規定外の文字が使用されています",
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : {
    "industryName" : "業種名",
    "industryCd" : "01"
  },
  "title" : "タイムセール",
  "uploadError" : 1,
  "scene" : {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  },
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "materials" : [ {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  }, {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  } ],
  "uploadErrorCode" : "E0001",
  "uploadSystem" : "01: センター, 02: S'sence",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05: CM生成中, 09: CM作成エラー, 11: 外部システム連携中, 12: 外部システム連携完了, 19: 外部システム連携エラー",
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
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.deleteShareCm = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "endDate" : "9999-12-31T23:59:59+09:00",
  "uploadErrorMessage" : "CM名に規定外の文字が使用されています",
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : {
    "industryName" : "業種名",
    "industryCd" : "01"
  },
  "title" : "タイムセール",
  "uploadError" : 1,
  "scene" : {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  },
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "materials" : [ {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  }, {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  } ],
  "uploadErrorCode" : "E0001",
  "uploadSystem" : "01: センター, 02: S'sence",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05: CM生成中, 09: CM作成エラー, 11: 外部システム連携中, 12: 外部システム連携完了, 19: 外部システム連携エラー",
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
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.getShareCm = function(id,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "endDate" : "9999-12-31T23:59:59+09:00",
  "uploadErrorMessage" : "CM名に規定外の文字が使用されています",
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : {
    "industryName" : "業種名",
    "industryCd" : "01"
  },
  "title" : "タイムセール",
  "uploadError" : 1,
  "scene" : {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  },
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "materials" : [ {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  }, {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  } ],
  "uploadErrorCode" : "E0001",
  "uploadSystem" : "01: センター, 02: S'sence",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05: CM生成中, 09: CM作成エラー, 11: 外部システム連携中, 12: 外部システム連携完了, 19: 外部システム連携エラー",
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
 * xToken String トークンID
 * returns List
 **/
exports.listShareCm = function(xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "endDate" : "9999-12-31T23:59:59+09:00",
  "uploadErrorMessage" : "CM名に規定外の文字が使用されています",
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : {
    "industryName" : "業種名",
    "industryCd" : "01"
  },
  "title" : "タイムセール",
  "uploadError" : 1,
  "scene" : {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  },
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "materials" : [ {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  }, {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  } ],
  "uploadErrorCode" : "E0001",
  "uploadSystem" : "01: センター, 02: S'sence",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05: CM生成中, 09: CM作成エラー, 11: 外部システム連携中, 12: 外部システム連携完了, 19: 外部システム連携エラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "endDate" : "9999-12-31T23:59:59+09:00",
  "uploadErrorMessage" : "CM名に規定外の文字が使用されています",
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "description" : "タイムセールサンプル１",
  "industry" : {
    "industryName" : "業種名",
    "industryCd" : "01"
  },
  "title" : "タイムセール",
  "uploadError" : 1,
  "scene" : {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  },
  "seconds" : 540,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "materials" : [ {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  }, {
    "startChime" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "chime"
    },
    "narrations" : [ {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    }, {
      "volume" : 150,
      "id" : "サンプル01",
      "category" : "narration"
    } ],
    "endChime" : {
      "volume" : 50,
      "id" : "サンプル02",
      "category" : "chime"
    },
    "bgm" : {
      "volume" : 50,
      "id" : "サンプル01",
      "category" : "bgm"
    }
  } ],
  "uploadErrorCode" : "E0001",
  "uploadSystem" : "01: センター, 02: S'sence",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "startDate" : "2019-09-01T09:00:00+9:00",
  "status" : "00:CM削除, 01: CM作成中, 02: CM作成完了, 03: CMエンコード中, 04: CM共有中, 05: CM生成中, 09: CM作成エラー, 11: 外部システム連携中, 12: 外部システム連携完了, 19: 外部システム連携エラー",
  "timestamp" : "2019-09-01T09:00:00+9:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

