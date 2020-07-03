'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({
  region: 'ap-northeast-1',
  endpoint: process.env.AWS_S3_ENDPOINT || 'http://docker-s3:9000',
  s3ForcePathStyle: 'true', // docker-lambda only
});

exports.controller = {
  get: (bucket, key) => {
    return s3.getObject({
      Bucket: bucket,
      Key: key,
    }).promise();
  },

  put: (bucket, key, body) => {
    return s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: 'private'
    }).promise();
  },

  list: (bucket, key) => {
    return s3.listObjectsV2({
      Bucket: bucket,
      Prefix: key,
    }).promise();
  },

  getSignedUrl: (bucket, key) => {
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: key,
      Expires: 600, // 10 minutes
    });
  },
};