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

  // generate id
  generateId: function (unisCustomerCd, div) {
    const id = randomBytes(8).reduce((p, i) => p + (i % 36).toString(36), "");
    return `${unisCustomerCd}-${div}-${id}`;
  },
};
