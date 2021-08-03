'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShareCm = function createShareCm (req, res, next, id, xUnisCustomerCd, xToken) {
  Share.createShareCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShareCm = function deleteShareCm (req, res, next, id, xUnisCustomerCd, xToken) {
  Share.deleteShareCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShareCm = function getShareCm (req, res, next, id, xUnisCustomerCd, xToken) {
  Share.getShareCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listShareCm = function listShareCm (req, res, next, xUnisCustomerCd, xToken) {
  Share.listShareCm(xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
