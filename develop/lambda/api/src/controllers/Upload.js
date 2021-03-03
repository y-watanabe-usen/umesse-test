'use strict';

var utils = require('../utils/writer.js');
var Upload = require('../service/UploadService');

module.exports.createUploadCm = function createUploadCm (req, res, next, body, id, xUnisCustomerCd) {
  Upload.createUploadCm(body, id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUploadCm = function deleteUploadCm (req, res, next, id, xUnisCustomerCd) {
  Upload.deleteUploadCm(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUploadCm = function getUploadCm (req, res, next, id, xUnisCustomerCd) {
  Upload.getUploadCm(id, xUnisCustomerCd)
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
