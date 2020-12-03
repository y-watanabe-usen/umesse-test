'use strict';

var utils = require('../utils/writer.js');
var Center = require('../service/CenterService');

module.exports.createCenterCm = function createCenterCm (req, res, next, body, cmId, xUnisCustomerCd) {
  Center.createCenterCm(body, cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCenterCm = function deleteCenterCm (req, res, next, xUnisCustomerCd, cmId) {
  Center.deleteCenterCm(xUnisCustomerCd, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCenterUpload = function getCenterUpload (req, res, next, unisCustomerCd) {
  Center.getCenterUpload(unisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listCenterUpload = function listCenterUpload (req, res, next) {
  Center.listCenterUpload()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCenterUpload = function updateCenterUpload (req, res, next, body, unisCustomerCd) {
  Center.updateCenterUpload(body, unisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
