"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const {
  constants,
  debuglog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

// CM取得（一覧・個別）
exports.getCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
    });
    if (checkParams) throw checkParams;

    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      ProjectionExpression: "cm",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res || !res.Item) throw "not found";

    let json = res.Item.cm;
    if (cmId) {
      json = json.filter((item) => item.cmId === cmId)[0];
    }
    if (!json) throw "not found";
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
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      body: body,
    });
    if (checkParams) throw checkParams;

    // ID生成
    const cmId = generateId(unisCustomerCd, "c");

    // CM結合、S3へPUT
    const seconds = await generateCm(unisCustomerCd, cmId, body);
    if (!seconds) throw "generate cm failed";

    // 署名付きURLの発行
    const url = await s3Manager.getSignedUrl(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
    if (!url) throw "getSignedUrl failed";

    // DynamoDBのデータ更新
    const data = {
      cmId: cmId,
      materials: body.materials,
      productionType:
        "bgm" in body.materials
          ? constants.cmProductionType.MUSIC
          : constants.cmProductionType.NONE,
      seconds: seconds,
      status: constants.cmStatus.CREATING,
      timestamp: timestamp(),
    };
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: "SET cm = list_append(cm, :cm)",
      ExpressionAttributeValues: {
        ":cm": [data],
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
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
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    });
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.cmId === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // TODO: CMステータス状態によるチェック

    // CM作成中の場合
    if (cm.status == constants.cmStatus.CREATING) {
      // TODO: add sqs
      cm.status = constants.cmStatus.CONVERT;
    } else {
      // CMアップロード
      if (body.uploadSystem) {
        // TODO:
        cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
      }
    }

    // DynamoDBのデータ更新
    Object.keys(body).map((key) => {
      cm[key] = body[key];
    });
    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
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
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    });
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await this.getCm(unisCustomerCd);
    if (!list || !list.length) throw "not found";
    const index = list.findIndex((item) => item.cmId === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // TODO: CMステータス状態によるチェック

    // S3上のCMを削除
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );

    // DynamoDBのデータ更新
    cm.status = constants.cmStatus.DELETE;
    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    const res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
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
function generateCm(unisCustomerCd, cmId, materials) {
  return new Promise(async function (resolve, reject) {
    const isWindows = process.platform === 'win32'

    // FIXME: materials 一旦仮
    const list = [
      "chime/サンプル01.mp3",
      "chime/サンプル02.mp3",
      "bgm/サンプル01.mp3",
      "narration/サンプル01.mp3",
      "narration/サンプル02.mp3",
      "narration/サンプル03.mp3",
    ];
    const hostWorkDir = `${process.cwd()}\\tmp\\${unisCustomerCd}\\mix\\${cmId}`;
    const containerWorkDir = `/tmp/${unisCustomerCd}/mix/${cmId}`;
    const ffmpeg = `/root/bin/ffmpeg -hide_banner`;

    try {
      // execSync(`mkdir -p ${workDir} && rm -f ${workDir}/*`);
      execSync(`mkdir ${hostWorkDir} > NUL 2>&1 && \
        if ERRORLEVEL 1 cmd /c exit 0 && \
        rd /q ${hostWorkDir}\\*`
      );

      let paths = "";
      for (const [key, value] of list.entries()) {
        debuglog(`key: ${key}, value: ${value}`);
        const res = await s3Manager.get(constants.s3Bucket().contents, value);
        if (!res || !res.Body) throw "getObject failed";
        fs.writeFileSync(`${hostWorkDir}/${key}.mp3`, res.Body);
        paths += `-i ${containerWorkDir}/${key}.mp3 `;
      }

      // FIXME: 各パラメーターをチューニング
      const command = `${ffmpeg} ${paths} \
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
        ' -y ${containerWorkDir}/${cmId}.mp3`;
      fs.writeFileSync(`${hostWorkDir}/cmd`, `#!/bin/bash\n${command}`);
      const dockerCommand = `docker run --name ffmpeg-runner --rm \
        -v ${process.cwd()}\\..\\layer\\bin:/root/bin \
        -v ${hostWorkDir}:${containerWorkDir} \
        centos:latest sh \
        ${containerWorkDir}/cmd`;
      debuglog(dockerCommand);
      execSync(dockerCommand);

      // TODO: 出来るまで待つ

      // FIXME: get seconds... 他に方法があるか
      const secondCommand = `${ffmpeg} -hide_banner -i ${containerWorkDir}/${cmId}.mp3 2>&1 | \
           grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`;
      fs.writeFileSync(`${hostWorkDir}/secondCommand`, `#!/bin/bash\n${secondCommand}`);
      const dockerSecondCommand = `docker run --name ffmpeg-runner --rm \
        -v ${process.cwd()}\\..\\layer\\bin:/root/bin \
        -v ${hostWorkDir}:${containerWorkDir} \
        centos:latest \
        sh ${containerWorkDir}/secondCommand`;
      // const seconds = execSync(
      //   `${ffmpeg} -hide_banner -i ${workDir}/${cmId}.mp3 2>&1 | \
      //     grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`
      // )
      //   .toString()
      //   .replace(/\n/g, "");
      // debuglog(`seconds: ${seconds}`);
      const seconds = execSync(
        dockerSecondCommand)
        .toString()
        .replace(/\n/g, "");
      debuglog(`seconds: ${seconds}`);

      const fileStream = fs.createReadStream(`${hostWorkDir}/${cmId}.mp3`);
      fileStream.on("error", (e) => {
        throw e;
      });
      await s3Manager.put(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.mp3`,
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
