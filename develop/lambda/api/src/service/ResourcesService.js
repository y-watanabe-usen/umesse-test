"use strict";

const { constants } = require("umesse-lib/constants");
const {
  createTts,
  getResource,
  getSignedUrl,
} = require("../../umesse/resources");
const assert = require('assert');
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("../../umesse/error");

/**
 * TTS音声作成
 * TTS音声を作成する
 *
 * body Object TTS作成リクエストBody (optional)
 * returns CreateTtsItem
 **/
exports.createTts = function (body) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await createTts(body);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getSignedUrl(id, category);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getResource(constants.resourceCategory.BGM, industryCd);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getResource(constants.resourceCategory.CHIME);
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getResource(
        constants.resourceCategory.BGM,
        industryCd,
        sceneCd
      );
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getResource(
        constants.resourceCategory.NARRATION,
        industryCd,
        sceneCd
      );
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
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
    try {
      const json = await getResource(
        constants.resourceCategory.TEMPLATE,
        industryCd,
        sceneCd
      );
      resolve(json);
    } catch (e) {
      assert(e instanceof UMesseError);
      reject(respondWithCode(e.statusCode, { message: e.message }))
    }
  });
};
