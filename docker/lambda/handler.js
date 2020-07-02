'use strict';

const execSync = require('child_process').execSync;
const fs = require('fs');
const s3 = require('./s3Controller').controller;
const dynamodb = require('./dynamodbController').controller;

exports.get = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket',
    };
    if (!event.key) throw {
      'status': 400,
      'message': 'Parameter is not a key',
    };

    let url = await s3.getSignedUrl(event.bucket, event.key);
    if (!url) throw 'getSignedUrl faild';

    return { 'url': url };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.list = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket',
    };
    if (!event.key) event.key = '';

    let res = await s3.list(event.bucket, event.key);
    if (!res) throw 'list faild';

    let list = [];
    res.Contents.map(v => v.Key).forEach(v => {
      list.push(v);
    });

    return { 'list': list };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.convert = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket',
    };
    if (!event.key) throw {
      'status': 400,
      'message': 'Parameter is not a key',
    };

    const srcPath = '/tmp/src.mp3';
    const destPath = '/tmp/dest.mp3';

    execSync(`rm -rf ${srcPath} ${destPath}`);
    let ret = await s3.get(event.bucket, event.key);
    if (!ret.Body) throw 'getObject faild';

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

exports.convert = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket',
    };
    if (!event.key) throw {
      'status': 400,
      'message': 'Parameter is not a key',
    };

    const srcPath = '/tmp/src.mp3';
    const destPath = '/tmp/dest.mp3';

    execSync(`rm -rf ${srcPath} ${destPath}`);
    let ret = await s3.get(event.bucket, event.key);
    if (!ret.Body) throw 'getObject faild';

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

exports.mix = async (event) => {
  try {
    if (!event.bucket) throw {
      'status': 400,
      'message': 'Parameter is not a bucket',
    };
    if (!event.comment) throw {
      'status': 400,
      'message': 'Parameter is not a comment',
    };
    if (!event.bgm) throw {
      'status': 400,
      'message': 'Parameter is not a bgm',
    };

    const commentPath = '/tmp/comment.mp3';
    const bgmPath = '/tmp/bgm.mp3';
    const destPath = '/tmp/dest.mp3';

    execSync(`rm -rf ${commentPath} ${bgmPath} ${destPath}`);

    let ret = await s3.get(event.bucket, event.comment);
    if (!ret.Body) throw 'getObject faild';
    fs.writeFileSync(commentPath, ret.Body);

    ret = await s3.get(event.bucket, event.bgm);
    if (!ret.Body) throw 'getObject faild';
    fs.writeFileSync(bgmPath, ret.Body);

    execSync(`/var/task/bin/ffmpeg -i ${commentPath} -i ${bgmPath} -filter_complex amix=inputs=2:duration=longest ${destPath}`);
    // execSync(`/var/task/bin/ffmpeg -i ${commentPath} -i ${bgmPath} -af "afade=t=out:start_time=00:01:00:d=3" -c:v copy ${destPath}`);

    let fileStream = fs.createReadStream(destPath);
    fileStream.on('error', (error) => { throw error });
    await s3.put(event.bucket, 'output.mp3', fileStream);
    console.log('put complete');

    return { 'message': 'mix complete' };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.create = async (event) => {
  try {
    if (!event.table) throw {
      'status': 400,
      'message': 'Parameter is not a table',
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
    if (!ret) throw 'create faild';

    return { 'message': 'create complete' };
  } catch (e) {
    console.log(e);
    return e;
  }
};
