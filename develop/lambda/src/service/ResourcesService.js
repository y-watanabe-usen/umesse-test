"use strict";

const { fetch } = require("../../umesse/resources");

/**
 * BGM
 *
 * industryId String ID of bgm to return (optional)
 * returns List
 **/
exports.listBgm = function (industryId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch("bgm", industryId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Open/Endチャイム
 *
 * returns List
 **/
exports.listChime = function () {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch("chime");
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * ナレーション
 *
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listNarration = function (industryId, sceneId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch("narration", industryId, sceneId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * TTSテンプレート一覧
 *
 * industryId String ID of bgm to return (optional)
 * sceneId String ID of bgm to return (optional)
 * returns List
 **/
exports.listTts = function (industryId, sceneId) {
  return new Promise(async function (resolve, reject) {
    var response = {};
    const json = await fetch("tts", industryId, sceneId);
    response["application/json"] = json;
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
};
