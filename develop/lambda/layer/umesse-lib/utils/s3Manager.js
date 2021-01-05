"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const S3 = new aws.S3(constants.s3Config());

exports.s3Manager = {
  get: (bucket, key) =>
    S3.getObject({
      Bucket: bucket,
      Key: key,
    }).promise(),
  put: (bucket, key, body) =>
    S3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: "private",
    }).promise(),
  copy: (bucket, key, source) =>
    S3.copyObject({
      Bucket: bucket,
      Key: key,
      CopySource: source,
      ACL: "private",
    }).promise(),
  list: (bucket, prefix) =>
    S3.listObjectsV2({
      Bucket: bucket,
      Prefix: prefix,
    }).promise(),
  delete: (bucket, key) =>
    S3.deleteObject({
      Bucket: bucket,
      Key: key,
    }).promise(),
  getSignedUrl: (bucket, key) =>
    S3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: key,
      Expires: 600, // 10 minutes
    }),
};
