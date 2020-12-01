'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShare = function createShare (req, res, next, xToken, xUnisCustomerCd, cmId) {
  Share.createShare(xToken, xUnisCustomerCd, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShare = function deleteShare (req, res, next, xToken, xUnisCustomerCd, cmId) {
  Share.deleteShare(xToken, xUnisCustomerCd, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listShare = function listShare (req, res, next, xToken, xUnisCustomerCd) {
  Share.listShare(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
