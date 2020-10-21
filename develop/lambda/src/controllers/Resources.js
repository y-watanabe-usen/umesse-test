'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.bgmGET = function bgmGET (req, res, next) {
  Resources.bgmGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.chimeGET = function chimeGET (req, res, next) {
  Resources.chimeGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.narrationGET = function narrationGET (req, res, next) {
  Resources.narrationGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.narrationSceneIdGET = function narrationSceneIdGET (req, res, next, sceneId) {
  Resources.narrationSceneIdGET(sceneId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ttsGET = function ttsGET (req, res, next) {
  Resources.ttsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
