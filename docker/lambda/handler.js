'use strict';

const aws = require('aws-sdk');
const execSync = require('child_process').execSync;
const fs = require('fs');

exports.get = async (event) => {
  try {
    if (!event.Bucket) throw 'Parameter is not a Bucket'
    if (!event.Key) throw 'Parameter is not a Key'

    let params = {
      Bucket: event.Bucket,
      Key: event.Key,
      Expires: 600, // 10min
    };

    // FIXME: do not here, but for verification.
    const s3 = new aws.S3({
      region: 'ap-northeast-1',
      endpoint: 'http://localhost:9000',
      s3ForcePathStyle: 'true', // docker-lambda only
    });
    let url = await s3.getSignedUrl('getObject', params);
    if (!url) throw 'getSignedUrl faild'

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'url': url,
      }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e)
    };
  }
};

exports.convert = async (event) => {
  try {
    if (!event.Bucket) throw 'Parameter is not a Bucket'
    if (!event.Key) throw 'Parameter is not a Key'

    const srcPath = '/tmp/src.mp3';
    const destPath = '/tmp/dest.mp3';
    execSync(`rm -rf ${srcPath} ${destPath}`);

    let params = {
      Bucket: event.Bucket,
      Key: event.Key,
    };

    // FIXME: do not here, but for verification.
    const s3 = new aws.S3({
      region: 'ap-northeast-1',
      endpoint: 'http://docker-s3:9000',
      s3ForcePathStyle: 'true', // docker-lambda only
    });
    let ret = await s3.getObject(params).promise();
    if (!ret.Body) throw 'getObject faild'

    fs.writeFileSync(srcPath, ret.Body);
    execSync(`/var/task/bin/ffmpeg -i ${srcPath} -af volume=3.0 ${destPath}`);

    let fileStream = fs.createReadStream(destPath);
    fileStream.on('error', (error) => { throw error });

    params = {
      Body: fileStream,
      Bucket: event.Bucket,
      Key: 'output.mp3',
    };
    await s3.putObject(params).promise();
    console.log('put complete');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'message': 'convert complete',
      }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e)
    };
  }
};