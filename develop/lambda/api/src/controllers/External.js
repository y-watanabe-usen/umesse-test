'use strict';

var utils = require('../utils/writer.js');
var External = require('../service/ExternalService');

module.exports.completeExternalCm = function completeExternalCm (req, res, next, body, external, unisCustomerCd) {
  console.debug(req.headers);
  External.completeExternalCm(body, external, unisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExternalCm = function getExternalCm (req, res, next, lastdate, external, unisCustomerCd) {
  console.debug(req.headers);
  External.getExternalCm(external, unisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listExternalCm = function listExternalCm (req, res, next, lastdate, external) {
  console.debug(req.headers);
  External.listExternalCm(external)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
