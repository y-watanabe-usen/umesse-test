"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");

exports.handler = async (event, context) => {
  debuglog(
    `[converter] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  try {
    const body = JSON.parse(event.Records[0].body);

    // TODO: body message check
    const unisCustomerCd = body.unisCustomerCd;
    const cmId = body.cmId;
    // パラメーターチェック
    const checkParams = validation.checkParams({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    });
    if (checkParams) throw checkParams;

    // CMデータ取得
    const key = { unisCustomerCd: unisCustomerCd };
    let options = {
      ProjectionExpression: "cm",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    let res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res || !res.Item) throw "not found";
    const list = res.Item.cm;
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.cmId === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータスの確認
    if (cm.status != constants.cmStatus.CONVERT)
      throw "音圧調整/エンコードができません";

    // CMコンバート処理
    res = await convertCm(unisCustomerCd, cmId);
    if (res) throw res;

    // DynamoDbデータ更新
    // CMステータスを完了へ変更(03 → 02)
    cm.status = constants.cmStatus.COMPLETE;
    cm.timestamp = timestamp();
    options = {
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

    // 外部連携データがある場合、データ更新
    options = {
      UpdateExpression: "SET #status = :status, #timestamp = :timestamp",
      ConditionExpression: "cmId = :cmId",
      ExpressionAttributeNames: {
        "#status": "status",
        "#timestamp": "timestamp",
      },
      ExpressionAttributeValues: {
        ":status": "1",
        ":timestamp": timestamp(),
        ":cmId": cm.cmId,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodbManager.update(
      constants.dynamoDbTable().external,
      key,
      options
    );
    if (!res) throw "update failed";

    return { message: "complete" };
  } catch (e) {
    // TODO: 該当のCMステータスをエラーに変更

    // error handler
    console.log(e);
    return { message: e };
  }
};

// CM音圧調整処理
function convertCm(unisCustomerCd, cmId) {
  return new Promise(async function (resolve, reject) {
    const workDir = `/tmp/umesse/${unisCustomerCd}/convert`;
    const ffmpeg = `ffmpeg -hide_banner`;

    try {
      execSync(`mkdir -p ${workDir} && rm -f ${workDir}/*`);

      let res = await s3Manager.get(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.mp3`
      );
      if (!res || !res.Body) throw "getObject failed";

      fs.writeFileSync(`${workDir}/${cmId}.mp3`, res.Body);

      let command = "";
      let data = "";

      // 1. wav変換
      command = `${ffmpeg} -y -i ${workDir}/${cmId}.mp3 \
        -ar 44100 -acodec pcm_s16le -ac 2 -map_metadata -1 -flags +bitexact ${workDir}/tmp_1.wav`;
      debuglog(command);
      execSync(command);

      // 2. ラウドネス値取得 (1回目)
      command = `${ffmpeg} -i ${workDir}/tmp_1.wav \
        -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12`;
      console.log(command);
      res = execSync(command);
      data = JSON.parse(res.toString());

      // 3. ラウドネス調整 + 音圧調整
      command = `${ffmpeg} -y -i ${workDir}/tmp_1.wav \
        -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:measured_I=${data.input_i}:measured_LRA=${data.input_lra}:measured_tp=${data.input_tp}:measured_thresh=${data.input_thresh}:offset=${data.target_offset},acompressor=threshold=-35dB:ratio=1.7:attack=200,alimiter=limit=-17dB:level=false:level_out=17dB \
        -ar 44100 ${workDir}/tmp_2.wav`;
      debuglog(command);
      execSync(command);

      // 4. ラウドネス値取得 (2回目)
      command = `${ffmpeg} -i ${workDir}/tmp_2.wav \
        -af loudnorm=I=-12.0:LRA=+10.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12`;
      debuglog(command);
      res = execSync(command);
      data = JSON.parse(res.toString());

      // 5. ラウドネス調整 + HE-AACv2化
      command = `${ffmpeg} -y -i ${workDir}/tmp_2.wav \
        -af volume=0dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 ${workDir}/${cmId}.aac`;
      if (data.input_i > -17.5) {
        command = `${ffmpeg} -y -i ${workDir}/tmp_2.wav \
          -af volume=-${
            parseFloat(data.input_i) + 17.5
          }dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 ${workDir}/${cmId}.aac`;
      }
      debuglog(command);
      execSync(command);

      // S3へPUT
      const fileStream = fs.createReadStream(`${workDir}/${cmId}.aac`);
      fileStream.on("error", (e) => {
        throw e;
      });
      res = await s3Manager.put(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.aac`,
        fileStream
      );
      if (!res) throw "putObject failed";

      // FIXME: エンコード前の音源は削除するか検討（一旦コメントアウト）
      // await s3Manager.delete(
      //   constants.s3Bucket().users,
      //   `users/${unisCustomerCd}/cm/${cmId}.mp3`
      // );

      debuglog("converter complete");
      resolve();
    } catch (e) {
      console.log(e);
      reject("converter failed");
    }
  });
}
