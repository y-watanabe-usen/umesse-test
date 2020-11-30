"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const s3 = new aws.S3(constants.s3Config());

exports.controller = {
  get: (bucket, key) =>
    s3
      .getObject({
        Bucket: bucket,
        Key: key,
      })
      .promise(),

  put: (bucket, key, body) =>
    s3
      .putObject({
        Bucket: bucket,
        Key: key,
        Body: body,
        ACL: "private",
      })
      .promise(),

  list: (bucket, key) =>
    s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: key,
      })
      .promise(),

  getSignedUrl: (bucket, key) =>
    s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: key,
      Expires: 600, // 10 minutes
    }),
};
