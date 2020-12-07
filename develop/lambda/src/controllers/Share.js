'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShare = function createShare (req, res, next, cmId, xUnisCustomerCd) {
  Share.createShare(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShare = function deleteShare (req, res, next, cmId, xUnisCustomerCd) {
  Share.deleteShare(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listShare = function listShare (req, res, next, xUnisCustomerCd) {
  Share.listShare(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
