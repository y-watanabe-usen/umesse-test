'use strict';

var utils = require('../utils/writer.js');
var Cm = require('../service/CmService');

module.exports.createUserCm = function createUserCm (req, res, next, body, xToken, xUnisCustomerCd) {
  Cm.createUserCm(body, xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserCm = function deleteUserCm (req, res, next, xToken, xUnisCustomerCd, cmId) {
  Cm.deleteUserCm(xToken, xUnisCustomerCd, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCm = function getUserCm (req, res, next, xToken, xUnisCustomerCd, cmId) {
  Cm.getUserCm(xToken, xUnisCustomerCd, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserCm = function listUserCm (req, res, next, xToken, xUnisCustomerCd) {
  Cm.listUserCm(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserCm = function updateUserCm (req, res, next, body, cmId, xToken, xUnisCustomerCd) {
  Cm.updateUserCm(body, cmId, xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
