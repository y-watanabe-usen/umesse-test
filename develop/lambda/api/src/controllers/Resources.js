'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.getSignedUrl = function getSignedUrl (req, res, next, id) {
  Resources.getSignedUrl(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listBgm = function listBgm (req, res, next, industryCd) {
  Resources.listBgm(industryCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listChime = function listChime (req, res, next) {
  Resources.listChime()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listNarration = function listNarration (req, res, next, industryCd, sceneCd) {
  Resources.listNarration(industryCd, sceneCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listTts = function listTts (req, res, next, industryCd, sceneCd) {
  Resources.listTts(industryCd, sceneCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
