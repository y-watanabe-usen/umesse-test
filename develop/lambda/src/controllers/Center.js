'use strict';

var utils = require('../utils/writer.js');
var Center = require('../service/CenterService');

module.exports.centerCmIdDELETE = function centerCmIdDELETE (req, res, next, cmId) {
  Center.centerCmIdDELETE(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.centerCmIdPOST = function centerCmIdPOST (req, res, next, body, cmId) {
  Center.centerCmIdPOST(body, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.centerDownloadCmIdPOST = function centerDownloadCmIdPOST (req, res, next, cmId) {
  Center.centerDownloadCmIdPOST(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.centerDownloadGET = function centerDownloadGET (req, res, next) {
  Center.centerDownloadGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
