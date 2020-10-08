'use strict';

var utils = require('../utils/writer.js');
var Mix = require('../service/MixService');

module.exports.mixPOST = function mixPOST (req, res, next, params) {
  Mix.mixPOST(params)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
