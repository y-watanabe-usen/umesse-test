"use strict";

const { constants } = require("umesse-lib/constants");
const {
  createTts,
  getResource,
  getSignedUrl,
} = require("../../umesse/resources");

/**
 * TTS音声作成
 * TTS音声を作成する
 *
 * body Object TTS作成リクエストBody (optional)
 * returns CreateTtsItem
 **/
exports.createTts = function (body) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await createTts(body);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
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
    const json = await getResource(constants.resourceCategory.BGM, industryCd);
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
    const json = await getResource(constants.resourceCategory.CHIME);
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
    const json = await getResource(
      constants.resourceCategory.BGM,
      industryCd,
      sceneCd
    );
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
    const json = await getResource(
      constants.resourceCategory.NARRATION,
      industryCd,
      sceneCd
    );
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
    const json = await getResource(
      constants.resourceCategory.TEMPLATE,
      industryCd,
      sceneCd
    );
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
