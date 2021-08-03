'use strict';


const assert = require("assert");
const { respondWithCode } = require("../utils/writer");
const { UMesseError } = require("umesse-lib/error");
const { constants, debuglog } = require("umesse-lib/constants");
const { getResource, getSignedUrl, getM3U8SignedUrl } = require("../../umesse/resources");

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
exports.getM3U8SignedUrl = function (xUnisCustomerCd, xToken, id, category) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getM3U8SignedUrl(xUnisCustomerCd, id, category);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
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
exports.getSignedUrl = function (id, category, protocol) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getSignedUrl(id, category, protocol);
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * BGM
 * BGM素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listBgm = function (industryCd, sort) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getResource(
        constants.resourceCategory.BGM,
        industryCd,
        "",
        sort
      );
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * Open/Endチャイム
 * 開始/終了チャイムを一覧で取得する
 *
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listChime = function (sort) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getResource(
        constants.resourceCategory.CHIME,
        "",
        "",
        sort
      );
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * TTSフリーワード一覧
 * TTSのフリーワード素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listFree = function (industryCd, sceneCd, sort) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getResource(
        constants.resourceCategory.FREE,
        industryCd,
        sceneCd,
        sort
      );
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * ナレーション
 * ナレーション素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listNarration = function (industryCd, sceneCd, sort) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getResource(
        constants.resourceCategory.NARRATION,
        industryCd,
        sceneCd,
        sort
      );
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};

/**
 * TTSテンプレート一覧
 * TTSのテンプレート素材を一覧で取得する
 *
 * industryCd String 業種CD (optional)
 * sceneCd String シーンCD (optional)
 * sort Integer ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順) (optional)
 * returns List
 **/
exports.listTemplate = function (industryCd, sceneCd, sort) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await getResource(
        constants.resourceCategory.TEMPLATE,
        industryCd,
        sceneCd,
        sort
      );
      debuglog(JSON.stringify(json));
      resolve(json);
    } catch (e) {
      debuglog(JSON.stringify(e));
      assert(e instanceof UMesseError);
      reject(
        respondWithCode(e.statusCode, { code: e.code, message: e.message })
      );
    }
  });
};
