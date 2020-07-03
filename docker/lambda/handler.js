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

    const list = [
      'chime/se_maoudamashii_chime01.mp3',
      'chime/se_maoudamashii_chime02.mp3',
      'bgm/11_NSF227-011.mp3',
      'narration/NA_001.mp3',
      'narration/NA_002.mp3',
      'narration/NA_003.mp3',
    ];

    execSync(`rm -rf /tmp/chime /tmp/bgm /tmp/narration /tmp/output.mp3`);
    execSync(`mkdir -p /tmp/{chime,bgm,narration}`);

    for (let key of list) {
      console.log(key);
      let res = await s3.get(event.bucket, key);
      if (!res.Body) throw 'getObject faild';
      fs.writeFileSync('/tmp/' + key, res.Body);
    }

    let paths = '';
    for (let key of list) {
      paths += ' -i /tmp/' + key;
    }

    let command = `/var/task/bin/ffmpeg -y ${paths} \
      -filter_complex " \
        [0:a]volume=0.8[startchime]; \
        [1:a]volume=0.8[endchime]; \
        [2:a]volume=0.6,aloop=2:2.14748e+009[bgm]; \
        [3:a]volume=2.0,adelay=3s|3s[narration1]; \
        [4:a]volume=2.0,adelay=3s|3s[narration2]; \
        [5:a]volume=2.0,adelay=3s|3s[narration3]; \
        [narration1][narration2][narration3]concat=n=3:v=0:a=1[join]; \
        [join][bgm]amix=inputs=2:duration=shortest:dropout_transition=3[mix]; \
        [startchime][mix][endchime]concat=n=3:v=0:a=1 \
      " /tmp/output.mp3`;
    console.log(command);
    execSync(command);

    let fileStream = fs.createReadStream('/tmp/output.mp3');
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
