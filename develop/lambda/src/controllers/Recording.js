'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.createUserRecording = function createUserRecording (req, res, next, xToken, xUnisCustomerCd) {
  Recording.createUserRecording(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserRecording = function deleteUserRecording (req, res, next, xToken, xUnisCustomerCd, recordingId) {
  Recording.deleteUserRecording(xToken, xUnisCustomerCd, recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserRecording = function getUserRecording (req, res, next, xToken, xUnisCustomerCd, recordingId) {
  Recording.getUserRecording(xToken, xUnisCustomerCd, recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserRecording = function listUserRecording (req, res, next, xToken, xUnisCustomerCd) {
  Recording.listUserRecording(xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserRecording = function updateUserRecording (req, res, next, recordingId, xToken, xUnisCustomerCd) {
  Recording.updateUserRecording(recordingId, xToken, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
