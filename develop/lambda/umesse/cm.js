"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const {
  constants,
  debuglog,
  timestamp,
  generateId,
  checkCmStatus,
} = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;

// CM取得（一覧・個別）
exports.getCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.get(constants.usersTable, key, options);
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    if (cmId) {
      json = json.filter((item) => item.id === cmId)[0];
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// CM新規作成（結合処理）
exports.createCm = async (unisCustomerCd, body) => {
  debuglog(
    `[createCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // ID作成
    const id = generateId(unisCustomerCd, "c");

    // CM結合、S3へPUT
    const seconds = await generateCm(unisCustomerCd, id, body);
    if (!seconds) throw "generate cm failed";

    // 署名付きURLの発行
    const url = await s3.getSignedUrl(
      constants.usersBucket,
      `users/${unisCustomerCd}/cm/${id}.mp3`
    );
    if (!url) throw "getSignedUrl failed";

    // DynamoDBのデータ更新
    const data = {
      id: id,
      materials: body.materials,
      production_type:
        "bgm" in body.materials
          ? constants.cmProductionType.MUSIC
          : constants.cmProductionType.NONE,
      seconds: seconds,
      status: constants.cmStatus.CREATING,
      timestamp: timestamp(),
    };
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET cm = list_append(cm, :cm)",
      ExpressionAttributeValues: {
        ":cm": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm.pop();
    json["url"] = url;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// CM確定・更新
exports.updateCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[updateCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("updateCm", cm.status);
    if (check) throw check;

    // CM作成中の場合
    if (cm.status == constants.cmStatus.CREATING) {
      // TODO: add sqs
      cm.status = constants.cmStatus.CONVERT;
    }

    // CMアップロード
    if (body.uploadSystem == constants.cmUploadSystem.CENTER) {
      // センターアップロードの場合
      // TODO:
      cm.status = constants.cmStatus.CENTER_UPLOADING;
    } else if (body.uploadSystem == constants.cmUploadSystem.SSENCE) {
      // S'senceアップロードの場合
      // TODO:
      cm.status = constants.cmStatus.SSENCE_UPLOADING;
    }

    // DynamoDBのデータ更新
    Object.keys(body).map((key) => {
      cm[key] = body[key];
    });
    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// CM削除
exports.deleteCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("deleteCm", cm.status);
    if (check) throw check;

    // S3上のCMを削除
    await s3.delete(
      constants.usersBucket,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.DELETE;
    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    const res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// CM結合処理
function generateCm(unisCustomerCd, id, materials) {
  return new Promise(async function (resolve, reject) {
    // FIXME: materials 一旦仮
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
        debuglog(`key: ${key}, value: ${value}`);
        const res = await s3.get(constants.contentsBucket, value);
        if (!res || !res.Body) throw "getObject failed";
        fs.writeFileSync(`${workDir}/${key}.mp3`, res.Body);
        paths += `-i ${workDir}/${key}.mp3 `;
      }

      // FIXME: ffmpeg path 相対パスでもよいか、各パラメーターをチューニング
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
      debuglog(command);
      execSync(command);

      // FIXME: get seconds... 他に方法があるか
      const seconds = execSync(
        `./umesse/bin/ffmpeg -hide_banner -i ${workDir}/${id}.mp3 2>&1 | \
          grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`
      )
        .toString()
        .replace(/\n/g, "");
      debuglog(`seconds: ${seconds}`);

      const fileStream = fs.createReadStream(`${workDir}/${id}.mp3`);
      fileStream.on("error", (e) => {
        throw e;
      });
      await s3.put(
        constants.usersBucket,
        `users/${unisCustomerCd}/cm/${id}.mp3`,
        fileStream
      );
      debuglog("generate complete");
      resolve(seconds);
    } catch (e) {
      console.log(e);
      reject();
    }
  });
}
