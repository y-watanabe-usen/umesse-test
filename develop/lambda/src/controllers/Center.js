'use strict';

var utils = require('../utils/writer.js');
var Center = require('../service/CenterService');

module.exports.createCenterCm = function createCenterCm (req, res, next, body, cmId) {
  Center.createCenterCm(body, cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCenterCm = function deleteCenterCm (req, res, next, cmId) {
  Center.deleteCenterCm(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCenterUpload = function getCenterUpload (req, res, next) {
  Center.getCenterUpload()
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
