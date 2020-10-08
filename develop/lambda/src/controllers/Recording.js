'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.recordingGET = function recordingGET (req, res, next) {
  Recording.recordingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.recordingPOST = function recordingPOST (req, res, next) {
  Recording.recordingPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.recordingRecordingIdDELETE = function recordingRecordingIdDELETE (req, res, next, recordingId) {
  Recording.recordingRecordingIdDELETE(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.recordingRecordingIdGET = function recordingRecordingIdGET (req, res, next, recordingId) {
  Recording.recordingRecordingIdGET(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
