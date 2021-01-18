"use strict";

const { constants } = require("./constants");

exports.validation = {
  checkParams: (params) => {
    // TODO:
    if (!params) return "params failed";
    for (let [key, value] of Object.entries(params)) {
      if (!value) return "params failed";
    }
  },

  checkCmStatus: (beforeStatus, afterStatus) => {
    if (!beforeStatus in cmStatusMessage) return "unknown status";
    if (!afterStatus in cmStatusMessage[beforeStatus]) return "unknown status";
    return cmStatusMessage[beforeStatus][afterStatus];
  },
};

const cmStatusMessage = Object.freeze({
  [constants.cmStatus.DELETE]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.CREATING]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.COMPLETE]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.CONVERT]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.SHARING]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.ERROR]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.EXTERNAL_UPLOADING]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.EXTERNAL_COMPLETE]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
  [constants.cmStatus.EXTERNAL_ERROR]: {
    [constants.cmStatus.DELETE]: "",
    [constants.cmStatus.CREATING]: "",
    [constants.cmStatus.COMPLETE]: "",
    [constants.cmStatus.CONVERT]: "",
    [constants.cmStatus.SHARING]: "",
    [constants.cmStatus.EXTERNAL_UPLOADING]: "",
    [constants.cmStatus.EXTERNAL_COMPLETE]: "",
  },
});
