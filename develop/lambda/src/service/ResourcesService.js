'use strict';


/**
 * BGM
 *
 * industryId String ID of bgm to return (optional)
 * returns List
 **/
exports.listBgm = function(industryId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 300,
  "scenes" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
  } ],
  "description" : "説明文",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "bgm/サンプル01",
  "title" : "タイトル",
  "url" : "https://example.com",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 300,
  "scenes" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
  } ],
  "description" : "説明文",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "bgm/サンプル01",
  "title" : "タイトル",
  "url" : "https://example.com",
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
 *
 * returns List
 **/
exports.listChime = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 30,
  "description" : "開始チャイム",
  "id" : "chime/サンプル01",
  "title" : "開始チャイム",
  "url" : "https://example.com",
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 30,
  "description" : "開始チャイム",
  "id" : "chime/サンプル01",
  "title" : "開始チャイム",
  "url" : "https://example.com",
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
 *
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listNarration = function(industryId,sceneId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "seconds" : 30,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "narration/サンプル01",
  "title" : "18時30分閉店",
  "url" : "https://example.com",
  "scene" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "seconds" : 30,
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "narration/サンプル01",
  "title" : "18時30分閉店",
  "url" : "https://example.com",
  "scene" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
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
 *
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listTts = function(industryId,sceneId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "123456789",
  "title" : "18時30分閉店",
  "scene" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
  } ],
  "timestamp" : "2019-09-01T09:00:00+9:00"
}, {
  "manuscript" : "本日はご来店いただきましてありがとうございます。当店は18時30分閉店です",
  "description" : "放送開始日2020年10月15日 有効期限2020年10月20日",
  "industry" : [ {
    "name" : "業種名",
    "id" : "01"
  }, {
    "name" : "業種名",
    "id" : "01"
  } ],
  "id" : "123456789",
  "title" : "18時30分閉店",
  "scene" : [ {
    "name" : "シーン名",
    "id" : "01"
  }, {
    "name" : "シーン名",
    "id" : "01"
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

