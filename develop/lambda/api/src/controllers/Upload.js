'use strict';

var utils = require('../utils/writer.js');
var Upload = require('../service/UploadService');

module.exports.createUploadCm = function createUploadCm (req, res, next, body, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Upload.createUploadCm(body, id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUploadCm = function deleteUploadCm (req, res, next, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Upload.deleteUploadCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUploadCm = function getUploadCm (req, res, next, id, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Upload.getUploadCm(id, xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUploadCm = function listUploadCm (req, res, next, xUnisCustomerCd, xToken) {
  console.debug(req.headers);
  Upload.listUploadCm(xUnisCustomerCd, xToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
