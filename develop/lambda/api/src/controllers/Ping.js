'use strict';

var utils = require('../utils/writer.js');
var Ping = require('../service/PingService');

module.exports.ping = function ping (req, res, next) {
  console.debug(req.headers);
  Ping.ping()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
