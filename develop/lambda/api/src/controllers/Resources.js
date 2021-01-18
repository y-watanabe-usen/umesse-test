'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.createTts = function createTts (req, res, next, body) {
  Resources.createTts(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSignedUrl = function getSignedUrl (req, res, next, id, category) {
  Resources.getSignedUrl(id, category)
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

module.exports.listFree = function listFree (req, res, next, industryCd, sceneCd) {
  Resources.listFree(industryCd, sceneCd)
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

module.exports.listTemplate = function listTemplate (req, res, next, industryCd, sceneCd) {
  Resources.listTemplate(industryCd, sceneCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
