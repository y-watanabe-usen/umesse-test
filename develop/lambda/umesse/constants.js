"use strict";

const { randomBytes } = require("crypto");

exports.constants = {
  region: "ap-northeast-1",
  debug: process.env.debug,

  // S3 bucket name
  // TODO: env local, dev, stg, prod
  s3Config: function () {
    return this.debug
      ? {
          region: this.region,
          endpoint: "localhost:4566",
          signatureVersion: "v4",
          s3ForcePathStyle: "true", // local only
        }
      : {
          region: this.region,
        };
  },
  usersBucket: this.debug ? "umesse-users" : "umesse-users",
  contentsBucket: this.debug ? "umesse-contents" : "umesse-contents",
  centerBucket: this.debug ? "umesse-center" : "umesse-center",

  // DynamoDb table name
  // TODO: env local, dev, stg, prod
  dynamoDbConfig: function () {
    return this.debug
      ? {
          region: this.region,
          endpoint: "localhost:4566",
        }
      : {
          region: this.region,
        };
  },
  usersTable: this.debug ? "umesse-users" : "umesse-users",
  contentsTable: this.debug ? "umesse-contents" : "umesse-contents",
  centerTable: this.debug ? "umesse-center" : "umesse-center",

  // debug log
  debuglog: function (message) {
    if (this.debug) console.log(`[debug] ${message}`);
  },

  // generate id cm (c), recording (r), tts (t)
  generateId: function (unisCustomerCd, div) {
    const id = randomBytes(8).reduce((p, i) => p + (i % 36).toString(36), "");
    return `${unisCustomerCd}-${div}-${id}`;
  },

  // cm status
  cmStatus: {
    DELETE: "00",
    CREATING: "01",
    COMPLETE: "02",
    SHARING: "03",
    ERROR: "09",
    CENTER_UPLOADING: "11",
    CENTER_COMPLETE: "12",
    CENTER_ERROR: "19",
  },

  // cm production type
  cmProductionType: {
    MUSIC: "01",
    NONE: "02",
  },

  // error code
  errorCode: {
    // system
    E000001: "E000001",
    // auth
    E010001: "E010001",
    // cm
    E020001: "E020001",
    // recording
    E030001: "E030001",
    // tts
    E040001: "E040001",
    // shear
    E050001: "E050001",
    // resource
    E060001: "E060001",
    // center
    E070001: "E070001",
  },
};
