"use strict";

const { constants } = require("../constants");
const aws = require("aws-sdk");
const S3 = new aws.S3(constants.s3Config());

exports.getS3 = (bucket, key) =>
  S3.getObject({
    Bucket: bucket,
    Key: key,
  }).promise();

exports.putS3 = (bucket, key, body) =>
  S3.putObject({
    Bucket: bucket,
    Key: key,
    Body: body,
    ACL: "private",
  }).promise();

exports.copyS3 = (bucket, key, source) =>
  S3.copyObject({
    Bucket: bucket,
    Key: key,
    CopySource: source,
    ACL: "private",
  }).promise();

exports.listS3 = (bucket, prefix) =>
  S3.listObjectsV2({
    Bucket: bucket,
    Prefix: prefix,
  }).promise();

exports.deleteS3 = (bucket, key) =>
  S3.deleteObject({
    Bucket: bucket,
    Key: key,
  }).promise();

exports.getSignedUrlS3 = (bucket, key) =>
  S3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: 600, // 10 minutes
  });
