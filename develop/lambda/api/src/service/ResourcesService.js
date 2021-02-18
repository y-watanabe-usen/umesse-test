'use strict';


/**
 * TTS音声作成
 * TTS音声を作成する
 *
 * body Object TTS作成リクエストBody (optional)
 * returns CreateTtsItem
 **/
exports.createTts = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "isBase64Encoded" : "true",
  "body" : "base64 string"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、音声素材アップロードのURLを取得する
 *
 * id String 音源ID
 * category String カテゴリー
 * returns inline_response_200
 **/
exports.getSignedUrl = function(id,category) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "url" : "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * BGM
 * BGM素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listBgm = function(industryCd,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "contentsId" : "サンプル01",
  "seconds" : 300,
  "description" : "説明文",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "bgm",
  "title" : "タイトル",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "contentsId" : "サンプル01",
  "seconds" : 300,
  "description" : "説明文",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "bgm",
  "title" : "タイトル",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
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
 * Open/Endチャイム
 * 開始/終了チャイムを一覧で取得する
 *
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listChime = function(sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "contentsId" : "サンプル01",
  "seconds" : 30,
  "description" : "開始チャイム",
  "category" : "chime",
  "title" : "開始チャイム",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "contentsId" : "サンプル01",
  "seconds" : 30,
  "description" : "開始チャイム",
  "category" : "chime",
  "title" : "開始チャイム",
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
 * TTSフリーワード一覧
 * TTSのフリーワード素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listFree = function(industryCd,sceneCd,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "contentsId" : "123456789",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "free",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "contentsId" : "123456789",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "free",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
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
 * ナレーション
 * ナレーション素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listNarration = function(industryCd,sceneCd,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "contentsId" : "サンプル01",
  "seconds" : 30,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "narration",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "contentsId" : "サンプル01",
  "seconds" : 30,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "narration",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
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
 * TTSテンプレート一覧
 * TTSのテンプレート素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listTemplate = function(industryCd,sceneCd,sort) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "contentsId" : "123456789",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "template",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "contentsId" : "123456789",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "category" : "template",
  "title" : "18時30分閉店",
  "scene" : [ {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  }, {
    "sceneCd" : "01",
    "sceneName" : "シーン名"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

