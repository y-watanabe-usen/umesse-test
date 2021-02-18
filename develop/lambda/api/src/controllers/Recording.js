'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.createUserRecording = function createUserRecording (req, res, next, body, xUnisCustomerCd) {
  console.log("xUnisCustomerCd", xUnisCustomerCd)
  Recording.createUserRecording(body, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserRecording = function deleteUserRecording (req, res, next, recordingId, xUnisCustomerCd) {
  Recording.deleteUserRecording(recordingId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserRecording = function getUserRecording (req, res, next, recordingId, xUnisCustomerCd) {
  Recording.getUserRecording(recordingId, xUnisCustomerCd)
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

module.exports.updateUserRecording = function updateUserRecording (req, res, next, body, recordingId, xUnisCustomerCd) {
  Recording.updateUserRecording(body, recordingId, xUnisCustomerCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
