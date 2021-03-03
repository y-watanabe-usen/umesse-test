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

module.exports.deleteUserCm = function deleteUserCm (req, res, next, id, xUnisCustomerCd) {
  Cm.deleteUserCm(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCm = function getUserCm (req, res, next, id, xUnisCustomerCd) {
  Cm.getUserCm(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserCm = function listUserCm (req, res, next, sort, xUnisCustomerCd) {
  Cm.listUserCm(sort, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserCm = function updateUserCm (req, res, next, body, id, xUnisCustomerCd) {
  Cm.updateUserCm(body, id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
