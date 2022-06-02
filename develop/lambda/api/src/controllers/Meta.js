'use strict';

var utils = require('../utils/writer.js');
var Meta = require('../service/MetaService');

module.exports.listMetaCm = function listMetaCm (req, res, next, targetDate) {
  console.debug(req.headers);
  Meta.listMetaCm(targetDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
