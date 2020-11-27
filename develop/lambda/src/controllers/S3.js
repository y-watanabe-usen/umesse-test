'use strict';

var utils = require('../utils/writer.js');
var S3 = require('../service/S3Service');

module.exports.getSignedUrl = function getSignedUrl (req, res, next) {
  S3.getSignedUrl()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
