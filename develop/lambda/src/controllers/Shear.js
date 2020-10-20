'use strict';

var utils = require('../utils/writer.js');
var Shear = require('../service/ShearService');

module.exports.shearCmIdDELETE = function shearCmIdDELETE (req, res, next, cmId) {
  Shear.shearCmIdDELETE(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shearCmIdPOST = function shearCmIdPOST (req, res, next, cmId) {
  Shear.shearCmIdPOST(cmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shearGET = function shearGET (req, res, next) {
  Shear.shearGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
