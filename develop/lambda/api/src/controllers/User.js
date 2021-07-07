'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.agreeUser = function agreeUser (req, res, next, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  User.agreeUser(xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUser = function getUser (req, res, next, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  User.getUser(xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
