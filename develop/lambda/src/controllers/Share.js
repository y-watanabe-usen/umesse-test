'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShare = function createShare (req, res, next, cmId) {
  Share.createShare(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShare = function deleteShare (req, res, next, cmId) {
  Share.deleteShare(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listShare = function listShare (req, res, next) {
  Share.listShare()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
