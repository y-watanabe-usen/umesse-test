'use strict';


/**
 * CM新規結合
 * CMを新規作成する
 *
 * body Object CMデータ作成リクエストBody (optional)
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CreateCmItem
 **/
exports.createUserCm = function(body,xUnisCustomerCd,xToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "seconds" : 540,
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
  "productionType" : "01: 音楽系, 02: 素ナレ",
  "progress" : 100,
  "id" : "123456789-c-12345678",
  "category" : "cm",
  "status" : "01: CM作成中",
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
 * CMを削除する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.deleteUserCm = function(id,xUnisCustomerCd,xToken) {
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
 * CM情報取得
 * CMの情報を取得する
 *
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.getUserCm = function(id,xUnisCustomerCd,xToken) {
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
 * CM一覧取得
 * CMの情報を一覧で取得する
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns CmListItem
 **/
exports.listUserCm = function(xUnisCustomerCd,xToken,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "sceneCd" : "01",
  "sceneName" : "シーン名",
  "details" : [ {
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
  } ]
}, {
  "sceneCd" : "01",
  "sceneName" : "シーン名",
  "details" : [ {
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
 * CM情報更新
 * CMの情報を更新する
 *
 * body Object CMデータ更新リクエストBody (optional)
 * id String CM ID
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * returns CmItem
 **/
exports.updateUserCm = function(body,id,xUnisCustomerCd,xToken) {
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

