"use strict";

const { execSync } = require("child_process");
const fs = require("fs");

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { updateDynamoDb } = require("umesse-lib/utils/dynamodbManager");
const { getS3, putS3, deleteS3 } = require("umesse-lib/utils/s3Manager");

exports.handler = async (event, context) => {
  debuglog(
    `[converter] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  try {
    const body = JSON.parse(event.Records[0].body);
    const unisCustomerCd = body.unisCustomerCd;
    const cmId = body.cmId;

    // TODO: body message check

    // TODO: データ存在確認

    // TODO: CMステータスの確認

    //
    const res = await convertCm(unisCustomerCd, cmId);
    if (!res) throw "convert failed";

    // TODO: DynamoDbデータ更新
    // CMステータスを完了へ変更(03 → 02)

    // TODO: 外部連携の場合、データ更新
    // 外部連携のパラメータが来た場合は、連携データのステータス更新（0 → 1）

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
    const workDir = `/tmp/${unisCustomerCd}/convert`;
    const ffmpeg = `ffmpeg`;

    try {
      execSync(`mkdir -p ${workDir} && rm -f ${workDir}/*`);

      let res = await getS3(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.mp3`
      );
      if (!res || !res.Body) throw "getObject failed";

      fs.writeFileSync(`${workDir}/${cmId}.mp3`, res.Body);

      let command = "";
      let data = "";

      // 1. wav変換
      command = `${ffmpeg} -hide_banner -y -i ${workDir}/${cmId}.mp3 \
        -ar 44100 -acodec pcm_s16le -ac 2 -map_metadata -1 -flags +bitexact ${workDir}/tmp_1.wav`;
      debuglog(command);
      execSync(command);

      // 2. ラウドネス値取得 (1回目)
      command = `${ffmpeg} -hide_banner -i ${workDir}/tmp_1.wav \
        -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12`;
      console.log(command);
      res = execSync(command);
      data = JSON.parse(res.toString());

      // 3. ラウドネス調整 + 音圧調整
      command = `${ffmpeg} -hide_banner -y -i ${workDir}/tmp_1.wav \
        -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:measured_I=${data.input_i}:measured_LRA=${data.input_lra}:measured_tp=${data.input_tp}:measured_thresh=${data.input_thresh}:offset=${data.target_offset},acompressor=threshold=-35dB:ratio=1.7:attack=200,alimiter=limit=-17dB:level=false:level_out=17dB \
        -ar 44100 ${workDir}/tmp_2.wav`;
      debuglog(command);
      execSync(command);

      // 4. ラウドネス値取得 (2回目)
      command = `${ffmpeg} -hide_banner -i ${workDir}/tmp_2.wav \
        -af loudnorm=I=-12.0:LRA=+10.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12`;
      debuglog(command);
      res = execSync(command);
      data = JSON.parse(res.toString());

      // 5. ラウドネス調整 + HE-AACv2化
      command = `${ffmpeg} -hide_banner -y -i ${workDir}/tmp_2.wav \
        -af volume=0dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 ${workDir}/${cmId}.aac`;
      if (data.input_i > -17.5) {
        command = `${ffmpeg} -hide_banner -y -i ${workDir}/tmp_2.wav \
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
      res = await putS3(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${cmId}.aac`,
        fileStream
      );
      if (!res) throw "putObject failed";

      // TODO: エンコード前の音源は削除するか検討（一旦コメントアウト）
      // await deleteS3(
      //   constants.s3Bucket().users,
      //   `users/${unisCustomerCd}/cm/${cmId}.mp3`
      // );

      debuglog("converter complete");
      resolve(true);
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
}
