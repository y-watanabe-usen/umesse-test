'use strict';

var utils = require('../utils/writer.js');
var Ping = require('../service/PingService');

module.exports.pingGET = function pingGET (req, res, next) {
  Ping.pingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
