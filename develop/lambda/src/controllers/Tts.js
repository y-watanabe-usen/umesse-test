'use strict';

var utils = require('../utils/writer.js');
var Tts = require('../service/TtsService');

module.exports.userTtsGET = function userTtsGET (req, res, next) {
  Tts.userTtsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTtsPOST = function userTtsPOST (req, res, next) {
  Tts.userTtsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTtsTtsIdDELETE = function userTtsTtsIdDELETE (req, res, next, ttsId) {
  Tts.userTtsTtsIdDELETE(ttsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTtsTtsIdGET = function userTtsTtsIdGET (req, res, next, ttsId) {
  Tts.userTtsTtsIdGET(ttsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTtsTtsIdPOST = function userTtsTtsIdPOST (req, res, next, ttsId) {
  Tts.userTtsTtsIdPOST(ttsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
