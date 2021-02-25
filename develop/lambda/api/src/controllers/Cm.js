'use strict';

var utils = require('../utils/writer.js');
var Cm = require('../service/CmService');

module.exports.createUserCm = function createUserCm (req, res, next, body, xUnisCustomerCd) {
  Cm.createUserCm(body, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserCm = function deleteUserCm (req, res, next, cmId, xUnisCustomerCd) {
  Cm.deleteUserCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCm = function getUserCm (req, res, next, cmId, xUnisCustomerCd) {
  Cm.getUserCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserCm = function listUserCm (req, res, next, xUnisCustomerCd, sort) {
  Cm.listUserCm(xUnisCustomerCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserCm = function updateUserCm (req, res, next, body, cmId, xUnisCustomerCd) {
  Cm.updateUserCm(body, cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
