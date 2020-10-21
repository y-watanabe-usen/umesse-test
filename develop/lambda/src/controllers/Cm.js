'use strict';

var utils = require('../utils/writer.js');
var Cm = require('../service/CmService');

module.exports.cmCmIdDELETE = function cmCmIdDELETE (req, res, next, cmId) {
  Cm.cmCmIdDELETE(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.cmCmIdPOST = function cmCmIdPOST (req, res, next, cmId) {
  Cm.cmCmIdPOST(cmId)
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

module.exports.userCmPOST = function userCmPOST (req, res, next) {
  Cm.userCmPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
