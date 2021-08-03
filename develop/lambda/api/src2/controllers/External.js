'use strict';

var utils = require('../utils/writer.js');
var External = require('../service/ExternalService');

module.exports.completeExternalCm = function completeExternalCm (req, res, next, body, external, unisCustomerCd) {
  External.completeExternalCm(body, external, unisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExternalCm = function getExternalCm (req, res, next, external, unisCustomerCd, lastdate) {
  External.getExternalCm(external, unisCustomerCd, lastdate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listExternalCm = function listExternalCm (req, res, next, external, lastdate) {
  External.listExternalCm(external, lastdate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
