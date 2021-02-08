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
const { sqsManager } = require("umesse-lib/utils/sqsManager");

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
    const seconds = await generateCm(unisCustomerCd, cmId, body.materials);
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

    let res = "";
    let dataProcessType = "";
    let status = "";
    // CM作成中の場合
    if (cm.status == constants.cmStatus.CREATING) {
      // sqs send
      const params = {
        MessageBody: JSON.stringify({
          unisCustomerCd: unisCustomerCd,
          cmId: cmId,
        }),
        QueueUrl: CONVERTER_SQS_QUEUE_URL,
        DelaySeconds: 0,
      };

      res = await SQS.sqsManager(params);
      if (!res) throw "update failed";

      cm.status = constants.cmStatus.CONVERT;
      dataProcessType = "01";
      status = "0";
    } else {
      // CMアップロード
      if (body.uploadSystem) {
        cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
        dataProcessType = "02";
        status = "1";
      }
    }

    // CMアップロード
    if (body.uploadSystem) {
      const item = {
        unisCustomerCd: unisCustomerCd,
        dataProcessType: dataProcessType,
        cmId: cmId,
        cmName: cm.title,
        cmCommentManuscript: cm.description,
        startDatetime: cm.startDate,
        endDatetime: cm.endDate,
        productionType: cm.productionType,
        contentTime: cm.seconds,
        sceneCd: cm.scene.sceneCd,
        uploadSystem: body.uploadSystem,
        status: status,
        timestamp: timestamp(),
      };

      res = await dynamodbManager.put(
        constants.dynamoDbTable().external,
        item,
        {}
      );
      if (!res) throw "put failed";
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

    res = await dynamodbManager.update(
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
  const isWindows = process.platform === "win32";
  const isLocal = process.env.environment === "local";
  const isLocalWindows = isLocal && isWindows;

  return new Promise(async function (resolve, reject) {
    const workDir = `/tmp/umesse/${unisCustomerCd}/mix/${cmId}`;
    const windowsWorkDir = `${process.cwd()}\\tmp\\umesse\\${unisCustomerCd}\\mix\\${cmId}`; // windows only
    const ffmpeg = `ffmpeg -hide_banner`;
    const has = {
      startChime: "startChime" in materials,
      endChime: "endChime" in materials,
      bgm: "bgm" in materials,
    };

    try {
      // ナレーションチェック
      if (!materials.narrations || materials.narrations.length < 1)
        throw "not narration";

      // workディレクトリ作成
      let initDirCommand = ``;
      if (!isLocalWindows) {
        initDirCommand = `mkdir -p ${workDir} && rm -f ${workDir}/*`;
      } else {
        initDirCommand = `mkdir ${windowsWorkDir} > NUL 2>&1 && \
          if ERRORLEVEL 1 cmd /c exit 0 && \
          rd /q ${windowsWorkDir}\\*`;
      }
      execSync(initDirCommand);

      // S3から無音ファイルを取得
      let filePath = !isLocalWindows
        ? `/tmp/umesse`
        : `${process.cwd()}\\tmp\\umesse`;
      if (!(await getContents(constants.s3Bucket().contents, "silent.mp3", filePath, "silent.mp3")))
        throw "getObject failed";

      let paths = "-i /tmp/umesse/silent.mp3 ";
      let options = "";
      let extra = "";
      let index = 0;

      // S3からファイル取得、コマンド作成
      for (let [key, value] of Object.entries(materials).sort()) {
        debuglog(JSON.stringify({ key: key, value: value }));
        let fileName = "";

        switch (key) {
          case "narrations":
            let count = 0;
            let narrations = "";

            for (let v of value) {
              let target = `narration/${v.contentsId}.mp3`;
              let bucket = constants.s3Bucket().contents;

              if (v.contentsId.match(`^${unisCustomerCd}-r-[0-9a-z]{8}$`)) {
                // レコーディング音源の場合
                target = `${unisCustomerCd}/${constants.resourceCategory.RECORDING}/${v.contentsId}.mp3`;
                bucket = constants.s3Bucket().users;
              } else if (v.contentsId.match(`^${unisCustomerCd}-t-[0-9a-z]{8}$`)) {
                // TTS音源の場合
                target = `${unisCustomerCd}/${constants.resourceCategory.TTS}/${v.contentsId}.mp3`;
                bucket = constants.s3Bucket().users;
              }

              fileName = `narration_${++count}`;
              if (!(await getContents(bucket, target, workDir, `${fileName}.mp3`)))
                throw "getObject failed";
              paths += `-i ${workDir}/${fileName}.mp3 `;
              narrations += `[${fileName}]`;
              // 無音カット ボリューム調整　末尾に3秒無音追加
              options += createCommand(["silent", "volume", "apad"], `[${++index}:a]`, v.volume, 3, fileName);
            }
            // ナレーションを結合
            extra += createCommand(["concat"], narrations, null, count, "mix");
            if (has.bgm) {
              // BGMがある場合は、前後に3秒無音追加
              extra += createCommand(["adelay", "apad"], "[mix]", null, 3, "mix");
            }
            break;

          case "startChime":
            fileName = "start_chime";
            if (!(await getContents(constants.s3Bucket().contents, `chime/${value.contentsId}.mp3`, workDir, `${fileName}.mp3`)))
              throw "getObject failed";
            paths += `-i ${workDir}/${fileName}.mp3 `;
            // 無音カット ボリューム調整　末尾に1秒無音追加
            options += createCommand(["silent", "volume", "apad"], `[${++index}:a]`, value.volume, 1, fileName);
            break;

          case "endChime":
            fileName = "end_chime";
            if (!(await getContents(constants.s3Bucket().contents, `chime/${value.contentsId}.mp3`, workDir, `${fileName}.mp3`)))
              throw "getObject failed";
            paths += `-i ${workDir}/${fileName}.mp3 `;
            // 無音カット ボリューム調整　頭にBGMあり3秒、BGMなし1秒無音追加
            options += createCommand(["silent", "volume", "adelay"], `[${++index}:a]`, value.volume, has.bgm ? 3 : 1, fileName);
            break;

          case "bgm":
            fileName = "bgm";
            if (!(await getContents(constants.s3Bucket().contents, `bgm/${value.contentsId}.mp3`, workDir, `${fileName}.mp3`)))
              throw "getObject failed";
            paths += `-i ${workDir}/${fileName}.mp3 `;
            // 無音カット ボリューム調整　BGMを無限ループ
            options += createCommand(["silent", "volume", "aloop"], `[${++index}:a]`, value.volume, -1, fileName);
            break;
        }
      }

      if (has.bgm) {
        // 結合したナレーションとBGMをMIX
        extra += createCommand(["amix"], "[mix][bgm]", null, null, "mix");
      }
      if (has.startChime) {
        // 結合したナレーションと開始チャイムを結合
        extra += createCommand(["concat"], "[start_chime][mix]", null, 2, "mix");
      }
      if (has.endChime) {
        // 結合したナレーションと終了チャイムを結合、フェードアウト3秒
        extra += createCommand(["acrossfade"], "[mix][end_chime]", null, 3, "mix");
      } else if (!has.endChime && has.bgm) {
        // 無音を3秒に伸ばす
        extra += createCommand(["adelay"], "[0:a]", null, 3, "silent");
        // 結合したナレーションと無音を結合、フェードアウト3秒
        extra += createCommand(["acrossfade"], "[mix][silent]", null, 3, "mix");
      }
      // 前後に無音を追加
      extra += createCommand(["concat"], "[0:a][mix][0:a]", null, 3, null);

      // MIX処理実施
      let command = `${ffmpeg} ${paths} -filter_complex '${options}${extra}' -y ${workDir}/${cmId}.mp3`;
      if (isLocalWindows) {
        fs.writeFileSync(
          `${windowsWorkDir}/ffmped-command`,
          `#!/bin/bash\n${command}`
        );
        command = `docker run --name ffmpeg-runner --rm \
          -v ${process.cwd()}\\..\\layer\\bin:/usr/local/bin \
          -v ${windowsWorkDir}:${workDir} \
          centos:latest \
          sh ${workDir}/ffmped-command`;
      }
      debuglog(command);
      execSync(command);

      // CMの秒数を取得
      let secondsCommand = `${ffmpeg} -hide_banner -i ${workDir}/${cmId}.mp3 2>&1 | \
        grep 'Duration' | cut -d ' ' -f 4 | cut -d '.' -f 1`;
      if (isLocalWindows) {
        fs.writeFileSync(
          `${windowsWorkDir}/ffmpeg-seconds-command`,
          `#!/bin/bash\n${secondsCommand}`
        );
        secondsCommand = `docker run --name ffmpeg-runner --rm \
          -v ${process.cwd()}\\..\\layer\\bin:/usr/local/bin \
          -v ${windowsWorkDir}:${workDir} \
          centos:latest \
          sh ${workDir}/ffmpeg-seconds-command`;
      }
      const seconds = execSync(secondsCommand).toString().replace(/\n/g, "");

      const cmFilePath = !isLocalWindows ? workDir : windowsWorkDir;
      const fileStream = fs.createReadStream(`${cmFilePath}/${cmId}.mp3`);
      fileStream.on("error", (e) => {
        throw e;
      });
      const res = await s3Manager.put(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.mp3`,
        fileStream
      );
      if (!res) throw "putObject failed";
      debuglog("generate complete");
      resolve(seconds);
    } catch (e) {
      console.log(e);
      reject();
    }
  });
}

async function getContents(bucket, target, outputPath, outputFileName) {
  try {
    const res = await s3Manager.get(bucket, target);
    if (!res || !res.Body) throw "getObject failed";
    fs.writeFileSync(`${outputPath}/${outputFileName}`, res.Body);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function createCommand(process, index, volume, num, div) {
  const command = {
    silent: `silenceremove=start_periods=1:stop_periods=1:detection=peak`,
    volume: `volume=${volume / 100}`,
    adelay: `adelay=${num}s|${num}s`,
    apad: `apad=pad_dur=${num}`,
    aloop: `aloop=${num}:2.14748e+009`,
    concat: `concat=n=${num}:v=0:a=1`,
    amix: `amix=duration=shortest`,
    acrossfade: `acrossfade=d=${num}`,
  };

  let res = `${index}`;
  let options = [];
  for (const key of process) {
    if (key in command) {
      options.push(command[key]);
    }
  }
  res += options.join();
  if (div) {
    res += `[${div}];`;
  }
  return res;
}
