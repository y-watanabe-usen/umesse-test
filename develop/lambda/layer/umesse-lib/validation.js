"use strict";

const { constants } = require("./constants");

exports.validation = {
  checkParams: (params) => {
    // TODO:
    if (!params) return "params failed";
  },

  checkCmStatus: (beforeStatus, afterStatus) => {
    if (!beforeStatus in cmStatusMessage) return "unknown process";
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
