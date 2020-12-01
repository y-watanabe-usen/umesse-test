'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.listBgm = function listBgm (req, res, next, xToken, xUnisCustomerCd, industryId) {
  Resources.listBgm(xToken, xUnisCustomerCd, industryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listChime = function listChime (req, res, next, xToken, xUnisCustomerCd) {
  Resources.listChime(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listNarration = function listNarration (req, res, next, xToken, xUnisCustomerCd, industryId, sceneId) {
  Resources.listNarration(xToken, xUnisCustomerCd, industryId, sceneId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listTts = function listTts (req, res, next, xToken, xUnisCustomerCd, industryId, sceneId) {
  Resources.listTts(xToken, xUnisCustomerCd, industryId, sceneId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
