'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.getSignedUrl = function getSignedUrl (req, res, next, id, category, protocol) {
  console.debug(req.headers);
  Resources.getSignedUrl(id, category, protocol)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listBgm = function listBgm (req, res, next, industryCd, sort) {
  console.debug(req.headers);
  Resources.listBgm(industryCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listChime = function listChime (req, res, next, sort) {
  console.debug(req.headers);
  Resources.listChime(sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listFree = function listFree (req, res, next, industryCd, sceneCd, sort) {
  console.debug(req.headers);
  Resources.listFree(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listNarration = function listNarration (req, res, next, industryCd, sceneCd, sort) {
  console.debug(req.headers);
  Resources.listNarration(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listTemplate = function listTemplate (req, res, next, industryCd, sceneCd, sort) {
  console.debug(req.headers);
  Resources.listTemplate(industryCd, sceneCd, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
