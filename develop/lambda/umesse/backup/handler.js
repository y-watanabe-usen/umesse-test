"use strict";

const execSync = require("child_process").execSync;
const fs = require("fs");
const s3 = require("../utils/s3Controller").controller;
const dynamodb = require("../utils/dynamodbController").controller;

exports.getSignedUrl = async (params) => {
  if (!params.bucket)
    throw {
      status: 400,
      message: "Parameter is not a bucket",
    };
  if (!params.key)
    throw {
      status: 400,
      message: "Parameter is not a key",
    };

  let url = await s3.getSignedUrl(params.bucket, params.key);
  if (!url) throw "getSignedUrl failed";

  return { url: url };
};

exports.list = async (params) => {
  if (!params.bucket)
    throw {
      status: 400,
      message: "Parameter is not a bucket",
    };
  if (!params.key) params.key = "";

  let res = await s3.list(params.bucket, params.key);
  if (!res) throw "list failed";

  let list = [];
  res.Contents.map((v) => v.Key).forEach((v) => {
    list.push(v);
  });

  return { list: list };
};

exports.getMeta = async (params) => {
  if (!params.bucket)
    throw {
      status: 400,
      message: "Parameter is not a bucket",
    };
  if (!params.key) params.key = "";

  let res = await s3.get(params.bucket, params.key);
  if (!res) throw "get failed";

  return { res: res };
};

exports.getTag = async (params) => {
  if (!params.bucket)
    throw {
      status: 400,
      message: "Parameter is not a bucket",
    };
  if (!params.key) params.key = "";

  let res = await s3.getTag(params.bucket, params.key);
  if (!res) throw "getTag failed";

  return { res: res };
};

exports.mix = async (params) => {
  if (!params.bucket)
    throw {
      status: 400,
      message: "Parameter is not a bucket",
    };

  const list = [
    "チャイム/se_maoudamashii_chime01.mp3",
    "チャイム/se_maoudamashii_chime02.mp3",
    "BGM/11_NSF227-011.mp3",
    "ナレーション/NA_001.mp3",
    "ナレーション/NA_002.mp3",
    "ナレーション/NA_003.mp3",
  ];

  execSync(`rm -rf /tmp/チャイム /tmp/BGM /tmp/ナレーション /tmp/output.mp3`);
  execSync(`mkdir -p /tmp/{チャイム,BGM,ナレーション}`);

  for (let key of list) {
    console.log(key);
    let res = await s3.get(params.bucket, key);
    if (!res.Body) throw "getObject failed";
    fs.writeFileSync("/tmp/" + key, res.Body);
  }

  let paths = "";
  for (let key of list) {
    paths += " -i /tmp/" + key;
  }

  let command = `/var/task/src/bin/ffmpeg -y ${paths} \
    -filter_complex ' \
      [0:a]volume=0.5[start_chime]; \
      [1:a]volume=0.5,adelay=3s|3s[end_chime]; \
      [2:a]volume=0.5,aloop=2:2.14748e+009[bgm]; \
      [3:a]volume=3.0,adelay=3s|3s[narration1]; \
      [4:a]volume=3.0,adelay=3s|3s[narration2]; \
      [5:a]volume=3.0,adelay=3s|3s,apad=pad_dur=5[narration3]; \
      [narration1][narration2][narration3]concat=n=3:v=0:a=1[join]; \
      [join][bgm]amix=duration=shortest[mix]; \
      [mix][end_chime]acrossfade=d=3[last]; \
      [start_chime][last]concat=n=2:v=0:a=1 \
    ' /tmp/output.mp3`;
  console.log(command);
  execSync(command);

  let fileStream = fs.createReadStream("/tmp/output.mp3");
  fileStream.on("error", (error) => {
    throw error;
  });
  await s3.put(params.bucket, "output.mp3", fileStream);
  console.log("put complete");

  return { message: "mix complete" };
};

exports.listTables = async (params) => {
  let res = await dynamodb.listTables({});
  if (!res) throw "listTables failed";

  return { res: res };
};

exports.getItem = async (params) => {
  if (!params.table)
    throw {
      status: 400,
      message: "Parameter is not a table",
    };
  if (!params.key) params.key = "";

  let res = await dynamodb.get({
    TableName: params.table,
    Key: {
      Id: params.key,
    },
  });
  if (!res) throw "scan failed";

  return { res: res };
};
