'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.createUserRecording = function createUserRecording (req, res, next, body, xUnisCustomerCd) {
  Recording.createUserRecording(body, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserRecording = function deleteUserRecording (req, res, next, id, xUnisCustomerCd) {
  Recording.deleteUserRecording(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserRecording = function getUserRecording (req, res, next, id, xUnisCustomerCd) {
  Recording.getUserRecording(id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserRecording = function listUserRecording (req, res, next, sort, xUnisCustomerCd) {
  Recording.listUserRecording(sort, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserRecording = function updateUserRecording (req, res, next, body, id, xUnisCustomerCd) {
  Recording.updateUserRecording(body, id, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
