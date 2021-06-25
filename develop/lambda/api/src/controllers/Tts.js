'use strict';

var utils = require('../utils/writer.js');
var Tts = require('../service/TtsService');

module.exports.createUserTts = function createUserTts (req, res, next, body, xUnisCustomerCd, xToken) {
  Tts.createUserTts(body, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserTts = function deleteUserTts (req, res, next, id, xUnisCustomerCd, xToken) {
  Tts.deleteUserTts(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateUserTts = function generateUserTts (req, res, next, body, xUnisCustomerCd, xToken) {
  Tts.generateUserTts(body, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserTts = function getUserTts (req, res, next, id, xUnisCustomerCd, xToken) {
  Tts.getUserTts(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserTts = function listUserTts (req, res, next, sort, xUnisCustomerCd, xToken) {
  Tts.listUserTts(sort, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserTts = function updateUserTts (req, res, next, body, id, xUnisCustomerCd, xToken) {
  Tts.updateUserTts(body, id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
