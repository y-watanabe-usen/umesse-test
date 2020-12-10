"use strict";

const { getResource } = require("../../umesse/resources");

/**
 * BGM
 * BGM素材を一覧で取得する
 *
 * industryId String ID of bgm to return (optional)
 * returns List
 **/
exports.listBgm = function (industryId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("bgm", industryId);
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
 * ナレーション
 * ナレーション素材を一覧で取得する
 *
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listNarration = function (industryId, sceneId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("narration", industryId, sceneId);
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
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listTts = function (industryId, sceneId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await getResource("tts", industryId, sceneId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0 && !json.message) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      reject(response[Object.keys(response)[0]]);
    }
  });
};
