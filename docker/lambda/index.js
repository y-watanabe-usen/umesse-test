'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({
  region: 'ap-northeast-1',
  endpoint: 'http://localhost:9000',
  s3ForcePathStyle: 'true', // docker-lambda only
});

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  try {
    if (!event.Bucket) throw 'Parameter is not a Bucket'
    if (!event.Key) throw 'Parameter is not a Key'

    const params = {
      Bucket: event.Bucket,
      Key: event.Key,
      Expires: 600, // 10min
    };

    const url = await s3.getSignedUrl('getObject', params);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'url': url,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error)
    };
  }
};
