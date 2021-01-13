"use strict";

const { getResource, getSignedUrl } = require("../../umesse/resources");

/**
 * TTS音声作成
 * TTS音声を作成する
 *
 * body Body_9  (optional)
 * returns byte[]
 **/
exports.createTts = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * S3オブジェクトの署名付きURLの取得
 * 試聴再生、音声素材アップロードのURLを取得する
 *
 * id String 音源ID
 * category String カテゴリー
 * returns inline_response_200
 **/
exports.getSignedUrl = function (id, category) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getSignedUrl(id, category);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * BGM
 * BGM素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * returns List
 **/
exports.listBgm = function (industryCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("bgm", industryCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * Open/Endチャイム
 * 開始/終了チャイムを一覧で取得する
 *
 * returns List
 **/
exports.listChime = function () {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("chime");
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * TTSフリーワード一覧
 * TTSのフリーワード素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * returns List
 **/
exports.listFree = function (industryCd, sceneCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("free", industryCd, sceneCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * ナレーション
 * ナレーション素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * returns List
 **/
exports.listNarration = function (industryCd, sceneCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("narration", industryCd, sceneCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};

/**
 * TTSテンプレート一覧
 * TTSのテンプレート素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * returns List
 **/
exports.listTemplate = function (industryCd, sceneCd) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("template", industryCd, sceneCd);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
