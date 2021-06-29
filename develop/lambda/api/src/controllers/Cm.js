'use strict';

var utils = require('../utils/writer.js');
var Cm = require('../service/CmService');

module.exports.createUserCm = function createUserCm (req, res, next, body, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Cm.createUserCm(body, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserCm = function deleteUserCm (req, res, next, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Cm.deleteUserCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCm = function getUserCm (req, res, next, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Cm.getUserCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserCm = function listUserCm (req, res, next, sort, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Cm.listUserCm(sort, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserCm = function updateUserCm (req, res, next, body, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Cm.updateUserCm(body, id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
