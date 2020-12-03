"use strict";

const { constants } = require("./constants");
const s3 = require("./utils/s3Controller").controller;

exports.signedUrl = async (id) => {
  constants.debuglog("id: " + id);
  try {
    let response = await s3.getSignedUrl(
      constants.contentsBucket,
      "bgm/サンプル02.mp3" // TODO: 一旦仮
    );
    if (!response) throw "getSignedUrl failed";
    return { url: response };
  } catch (e) {
    console.log(e);
  }
};
