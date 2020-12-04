"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

exports.fetch = async (unisCustomerCd, cmId) => {
  constants.debuglog(
    `cm fetch unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    if (cmId) {
      json = json.filter((item) => item.id === cmId);
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

exports.create = async (unisCustomerCd, body) => {
  constants.debuglog(
    `cm create unis_customer_cd: ${unisCustomerCd}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    const id = constants.generateId(unisCustomerCd, "c");

    // cm mixing and s3 put
    const seconds = await generateCm(unisCustomerCd, id, body);
    if (!seconds) throw "generate cm failed";

    // s3 signed url
    const url = await s3.getSignedUrl(
      constants.usersBucket,
      `users/${unisCustomerCd}/cm/${id}.mp3`
    );
    if (!url) throw "getSignedUrl failed";

    // dynamodb update
    const data = {
      id: id,
      materials: body.materials,
      production_type: "bgm" in body.materials ? "01" : "02",
      seconds: seconds,
      status: "01",
      timestamp: new Date().toISOString(),
    };
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET cm = list_append(cm, :cm)",
      ExpressionAttributeValues: {
        ":cm": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res || !res.Attributes) throw "update failed";

    let json = res.Attributes.cm.pop();
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

exports.update = async (unisCustomerCd, cmId, body) => {
  constants.debuglog(
    `cm update unis_customer_cd: ${unisCustomerCd}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: CM convert
    // TODO: Center upload
    // TODO: Dynamodb update
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

exports.remove = async (unisCustomerCd, cmId) => {
  constants.debuglog(
    `cm remove unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}`
  );

  try {
    // TODO: Center upload
    // TODO: Dynamodb update
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    if (cmId) {
      json = json.filter((item) => item.id === cmId);
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

function generateCm(unisCustomerCd, id, materials) {
  return new Promise(async function (resolve, reject) {
    // FIXME: materials
    const list = [
      "chime/サンプル01.mp3",
      "chime/サンプル02.mp3",
      "bgm/サンプル01.mp3",
      "narration/サンプル01.mp3",
      "narration/サンプル02.mp3",
      "narration/サンプル03.mp3",
    ];
    const workDir = `/tmp/${unisCustomerCd}`;

    try {
      execSync(`mkdir -p ${workDir} && rm -rf ${workDir}/*.mp3`);

      let paths = "";
      for (const [key, value] of list.entries()) {
        constants.debuglog(`key: ${key}, value: ${value}`);
        const res = await s3.get(constants.contentsBucket, value);
        if (!res || !res.Body) throw "getObject failed";
        fs.writeFileSync(`${workDir}/${key}.mp3`, res.Body);
        paths += `-i ${workDir}/${key}.mp3 `;
      }

      // FIXME: ffmpeg path
      const command = `./umesse/bin/ffmpeg -hide_banner ${paths} \
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
        ' -y ${workDir}/${id}.mp3`;
      constants.debuglog(command);
      execSync(command);

      // FIXME: get seconds...
      const seconds = execSync(
        `./umesse/bin/ffmpeg -hide_banner -i ${workDir}/${id}.mp3 2>&1 | \
          grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`
      )
        .toString()
        .replace(/\n/g, "");
      constants.debuglog(`seconds: ${seconds}`);

      const fileStream = fs.createReadStream(`${workDir}/${id}.mp3`);
      fileStream.on("error", (e) => {
        throw e;
      });
      await s3.put(
        constants.usersBucket,
        `users/${unisCustomerCd}/cm/${id}.mp3`,
        fileStream
      );
      constants.debuglog("generate complete");
      resolve(seconds);
    } catch (e) {
      console.log(e);
      reject();
    }
  });
}
