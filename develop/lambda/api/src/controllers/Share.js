'use strict';

var utils = require('../utils/writer.js');
var Share = require('../service/ShareService');

module.exports.createShareCm = function createShareCm (req, res, next, id, xUnisCustomerCd) {
  Share.createShareCm(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteShareCm = function deleteShareCm (req, res, next, id, xUnisCustomerCd) {
  Share.deleteShareCm(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShareCm = function getShareCm (req, res, next, id, xUnisCustomerCd) {
  Share.getShareCm(id, xUnisCustomerCd)
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
