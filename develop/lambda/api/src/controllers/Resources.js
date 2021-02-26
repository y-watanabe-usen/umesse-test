'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.getSignedUrl = function getSignedUrl (req, res, next, id, category) {
  Resources.getSignedUrl(id, category)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listBgm = function listBgm (req, res, next, industryCd, sort) {
  Resources.listBgm(industryCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listChime = function listChime (req, res, next, sort) {
  Resources.listChime(sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listFree = function listFree (req, res, next, industryCd, sceneCd, sort) {
  Resources.listFree(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listNarration = function listNarration (req, res, next, industryCd, sceneCd, sort) {
  Resources.listNarration(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listTemplate = function listTemplate (req, res, next, industryCd, sceneCd, sort) {
  Resources.listTemplate(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
