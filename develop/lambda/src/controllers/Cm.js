'use strict';

var utils = require('../utils/writer.js');
var Cm = require('../service/CmService');

module.exports.userCmCmIdDELETE = function userCmCmIdDELETE (req, res, next, cmId) {
  Cm.userCmCmIdDELETE(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCmCmIdGET = function userCmCmIdGET (req, res, next, cmId) {
  Cm.userCmCmIdGET(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCmCmIdPOST = function userCmCmIdPOST (req, res, next, body, cmId) {
  Cm.userCmCmIdPOST(body, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCmGET = function userCmGET (req, res, next) {
  Cm.userCmGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCmPOST = function userCmPOST (req, res, next, body) {
  Cm.userCmPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
