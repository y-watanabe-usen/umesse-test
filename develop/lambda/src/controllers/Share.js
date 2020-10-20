'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.shareCmIdDELETE = function shareCmIdDELETE (req, res, next, cmId) {
  Share.shareCmIdDELETE(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shareCmIdPOST = function shareCmIdPOST (req, res, next, cmId) {
  Share.shareCmIdPOST(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shareGET = function shareGET (req, res, next) {
  Share.shareGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
