"use strict";

const { constants } = require("./constants");
const s3 = require("./utils/s3Controller").controller;

// 署名付きURL取得
exports.signedUrl = async (id) => {
  constants.debuglog(`s3 signedUrl id: ${id}`);

  try {
    const res = await s3.getSignedUrl(constants.contentsBucket, id);
    if (!res) throw "getSignedUrl failed";
    return { url: res };
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};