"use strict";

const { constants } = require("./constants");
const s3 = require("./utils/s3Controller").controller;

exports.signedUrl = async (id) => {
  constants.debuglog("id: " + id);
  try {
    let response = await s3.getSignedUrl(
      constants.contentsBucket,
      "bgm/サンプル02.mp3"
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
