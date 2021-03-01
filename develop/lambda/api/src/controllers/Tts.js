'use strict';

var utils = require('../utils/writer.js');
var Tts = require('../service/TtsService');

module.exports.createUserTts = function createUserTts (req, res, next, body, xUnisCustomerCd) {
  Tts.createUserTts(body, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserTts = function deleteUserTts (req, res, next, ttsId, xUnisCustomerCd) {
  Tts.deleteUserTts(ttsId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateUserTts = function generateUserTts (req, res, next, body, xUnisCustomerCd) {
  Tts.generateUserTts(body, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserTts = function getUserTts (req, res, next, ttsId, xUnisCustomerCd) {
  Tts.getUserTts(ttsId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserTts = function listUserTts (req, res, next, xUnisCustomerCd) {
  Tts.listUserTts(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserTts = function updateUserTts (req, res, next, body, ttsId, xUnisCustomerCd) {
  Tts.updateUserTts(body, ttsId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
