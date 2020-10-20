'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.userRecordingGET = function userRecordingGET (req, res, next) {
  Recording.userRecordingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRecordingPOST = function userRecordingPOST (req, res, next) {
  Recording.userRecordingPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRecordingRecordingIdDELETE = function userRecordingRecordingIdDELETE (req, res, next, recordingId) {
  Recording.userRecordingRecordingIdDELETE(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRecordingRecordingIdGET = function userRecordingRecordingIdGET (req, res, next, recordingId) {
  Recording.userRecordingRecordingIdGET(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRecordingRecordingIdPOST = function userRecordingRecordingIdPOST (req, res, next, recordingId) {
  Recording.userRecordingRecordingIdPOST(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
