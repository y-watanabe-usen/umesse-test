'use strict';

var utils = require('../utils/writer.js');
var Tts = require('../service/TtsService');

module.exports.createUserTts = function createUserTts (req, res, next, xToken, xUnisCustomerCd) {
  Tts.createUserTts(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserTts = function deleteUserTts (req, res, next, xToken, xUnisCustomerCd, ttsId) {
  Tts.deleteUserTts(xToken, xUnisCustomerCd, ttsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserTts = function getUserTts (req, res, next, xToken, xUnisCustomerCd, ttsId) {
  Tts.getUserTts(xToken, xUnisCustomerCd, ttsId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserTts = function listUserTts (req, res, next, xToken, xUnisCustomerCd) {
  Tts.listUserTts(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserTts = function updateUserTts (req, res, next, ttsId, xToken, xUnisCustomerCd) {
  Tts.updateUserTts(ttsId, xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
