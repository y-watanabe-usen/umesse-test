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

module.exports.cmGET = function cmGET (req, res, next) {
  Cm.cmGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.cmPOST = function cmPOST (req, res, next) {
  Cm.cmPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
