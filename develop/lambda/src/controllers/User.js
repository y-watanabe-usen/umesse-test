'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.getUser = function getUser (req, res, next, xToken, xUnisCustomerCd) {
  User.getUser(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
