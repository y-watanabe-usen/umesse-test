'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const s3 = require('./s3Controller').controller;
const dynamodb = require('./dynamodbController').controller;

exports.get = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket'
    };
    if (!event.key) throw {
      'status': 400,
      'message': 'Parameter is not a key'
    };

    let url = await s3.getSignedUrl(event.bucket, event.key);
    if (!url) throw 'getSignedUrl faild'

    return { 'url': url };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.convert = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket'
    };
    if (!event.key) throw {
      'status': 400,
      'message': 'Parameter is not a key'
    };

    const srcPath = '/tmp/src.mp3';
    const destPath = '/tmp/dest.mp3';

    execSync(`rm -rf ${srcPath} ${destPath}`);
    let ret = await s3.get(event.bucket, event.key);
    if (!ret.Body) throw 'getObject faild'

    fs.writeFileSync(srcPath, ret.Body);
    execSync(`/var/task/bin/ffmpeg -i ${srcPath} -af volume=3.0 ${destPath}`);

    let fileStream = fs.createReadStream(destPath);
    fileStream.on('error', (error) => { throw error });
    await s3.put(event.bucket, 'output.mp3', fileStream);
    console.log('put complete');

    return { 'message': 'convert complete' };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.create = async (event) => {
  try {
    if (!event.table) throw {
      'status': 400,
      'message': 'Parameter is not a table'
    };

    let ret = await dynamodb.createTable({
      TableName: event.table,
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'numbers', AttributeType: 'N' }
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'numbers', KeyType: 'RANGE' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
    });
    if (!ret) throw 'create faild'

    return { 'message': 'create complete' };
  } catch (e) {
    console.log(e);
    return e;
  }
};
