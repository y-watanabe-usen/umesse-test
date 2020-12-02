'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.createUserRecording = function createUserRecording (req, res, next, xUnisCustomerCd) {
  Recording.createUserRecording(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserRecording = function deleteUserRecording (req, res, next, xUnisCustomerCd, recordingId) {
  Recording.deleteUserRecording(xUnisCustomerCd, recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserRecording = function getUserRecording (req, res, next, xUnisCustomerCd, recordingId) {
  Recording.getUserRecording(xUnisCustomerCd, recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserRecording = function listUserRecording (req, res, next, xUnisCustomerCd) {
  Recording.listUserRecording(xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserRecording = function updateUserRecording (req, res, next, recordingId, xUnisCustomerCd) {
  Recording.updateUserRecording(recordingId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
