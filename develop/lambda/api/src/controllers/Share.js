'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShareCm = function createShareCm (req, res, next, cmId, xUnisCustomerCd) {
  Share.createShareCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShareCm = function deleteShareCm (req, res, next, cmId, xUnisCustomerCd) {
  Share.deleteShareCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShareCm = function getShareCm (req, res, next, cmId, xUnisCustomerCd) {
  Share.getShareCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listShareCm = function listShareCm (req, res, next, xUnisCustomerCd) {
  Share.listShareCm(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
