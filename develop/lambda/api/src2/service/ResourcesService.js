'use strict';


/**
 * S3オブジェクトの署名付きURLの取得(m3u8用)
 * 試聴再生のURLを取得する。bgmのみm3u8形式で取得するためapiを分ける
 *
 * xUnisCustomerCd String UNIS顧客CD
 * xToken String トークンID
 * id String 音源ID
 * category String カテゴリー
 * returns inline_response_200_1
 **/
exports.getM3U8SignedUrl = function(xUnisCustomerCd,xToken,id,category) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "url" : "https://xxxxx/123456789-c-12345678.m3u8?AWSAccessKeyId=xxxxxxxx"
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
 * protocol String プロトコル (optional)
 * returns inline_response_200
 **/
exports.getSignedUrl = function(id,category,protocol) {
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
  "seconds" : 300,
  "description" : "説明文",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "サンプル01",
  "category" : "bgm",
  "title" : "タイトル",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 300,
  "description" : "説明文",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "サンプル01",
  "category" : "bgm",
  "title" : "タイトル",
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
  "seconds" : 30,
  "description" : "開始チャイム",
  "id" : "サンプル01",
  "category" : "chime",
  "title" : "開始チャイム",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 30,
  "description" : "開始チャイム",
  "id" : "サンプル01",
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
  "ttsFree" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "123456789",
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
  "ttsFree" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "123456789",
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
  "id" : "サンプル01",
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
  "id" : "サンプル01",
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
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "details" : [ {
    "speaker" : "0: 男性, 1: 女性",
    "text" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
    "id" : "サンプル01",
    "category" : "narration",
    "lang" : "ja | en | zh | ko"
  }, {
    "speaker" : "0: 男性, 1: 女性",
    "text" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
    "id" : "サンプル01",
    "category" : "narration",
    "lang" : "ja | en | zh | ko"
  } ],
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "123456789",
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
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "details" : [ {
    "speaker" : "0: 男性, 1: 女性",
    "text" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
    "id" : "サンプル01",
    "category" : "narration",
    "lang" : "ja | en | zh | ko"
  }, {
    "speaker" : "0: 男性, 1: 女性",
    "text" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
    "id" : "サンプル01",
    "category" : "narration",
    "lang" : "ja | en | zh | ko"
  } ],
  "industry" : [ {
    "industryName" : "業種名",
    "industryCd" : "01"
  }, {
    "industryName" : "業種名",
    "industryCd" : "01"
  } ],
  "id" : "123456789",
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

