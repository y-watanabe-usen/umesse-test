'use strict';

var utils = require('../utils/writer.js');
var Recording = require('../service/RecordingService');

module.exports.createUserRecording = function createUserRecording (req, res, next) {
  Recording.createUserRecording()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserRecording = function deleteUserRecording (req, res, next, recordingId) {
  Recording.deleteUserRecording(req.body['filename'], req.body['recordedFile'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserRecording = function getUserRecording (req, res, next, recordingId) {
  Recording.getUserRecording(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUserRecording = function listUserRecording (req, res, next) {
  Recording.listUserRecording()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserRecording = function updateUserRecording (req, res, next, recordingId) {
  Recording.updateUserRecording(recordingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
