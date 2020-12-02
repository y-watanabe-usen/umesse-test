'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.listBgm = function listBgm (req, res, next, industryId) {
  Resources.listBgm(industryId)
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

module.exports.listNarration = function listNarration (req, res, next, industryId, sceneId) {
  Resources.listNarration(industryId, sceneId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listTts = function listTts (req, res, next, industryId, sceneId) {
  Resources.listTts(industryId, sceneId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
