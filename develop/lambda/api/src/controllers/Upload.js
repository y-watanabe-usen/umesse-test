'use strict';

var utils = require('../utils/writer.js');
var Upload = require('../service/UploadService');

module.exports.createUploadCm = function createUploadCm (req, res, next, body, cmId, xUnisCustomerCd) {
  Upload.createUploadCm(body, cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUploadCm = function deleteUploadCm (req, res, next, cmId, xUnisCustomerCd) {
  Upload.deleteUploadCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUploadCm = function getUploadCm (req, res, next, cmId, xUnisCustomerCd) {
  Upload.getUploadCm(cmId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUploadCm = function listUploadCm (req, res, next, xUnisCustomerCd) {
  Upload.listUploadCm(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
