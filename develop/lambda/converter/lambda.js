"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const assert = require("assert");
const {
  constants,
  debuglog,
  errorlog,
  timestamp,
} = require("umesse-lib/constants");
const UMesseConverter = require("umesse-lib/converter");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
  AppError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

exports.handler = async (event, context) => {
  debuglog(
    `[converter] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  const body = JSON.parse(JSON.parse(event.Records[0].body).MessageBody);
  const unisCustomerCd = body.unisCustomerCd;
  const id = body.id;
  const category = body.category;

  debuglog(
    JSON.stringify({
      body: body,
      unisCustomerCd: unisCustomerCd,
      id: id,
      category: category,
    })
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: id,
    category: category,
  });
  if (checkError) return errorResponse(new BadRequestError(checkError));

  // CMデータ取得
  const key = { unisCustomerCd: unisCustomerCd };
  let options = {
    ProjectionExpression: "cm",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  let ret;
  try {
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    return errorResponse(new InternalServerError(e.message));
  }
  if (!ret || !ret.Item)
    return errorResponse(new NotFoundError(ERROR_CODE.E0000404));

  // CM一覧から該当CMを取得
  const list = ret.Item.cm;
  if (!list) return errorResponse(new NotFoundError(ERROR_CODE.E0000404));
  const index = list.findIndex((item) => item.cmId === id);
  if (index < 0) return errorResponse(new NotFoundError(ERROR_CODE.E0000404));
  const cm = list[index];

  // CMステータスの確認
  if (cm.status !== constants.cmStatus.CONVERT)
    return errorResponse(new NotFoundError(ERROR_CODE.E0000404));

  // CMコンバート処理
  try {
    ret = await convertCm(unisCustomerCd, id);
    if (ret) {
      errorlog(JSON.stringify(ret));
      return errorResponse(new InternalServerError(ret));
    }
  } catch (e) {
    errorlog(JSON.stringify(e));
    return errorResponse(new InternalServerError(e));
  }

  // 外部連携データ取得
  try {
    ret = await dynamodbManager.get(
      constants.dynamoDbTable().external,
      key,
      {}
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    return errorResponse(new InternalServerError(e.message));
  }

  // 対象外部連携データがある場合、データ更新
  if (ret && ret.Item && ret.Item.status === "0" && ret.Item.cmId === cm.cmId) {
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

    try {
      ret = await dynamodbManager.update(
        constants.dynamoDbTable().external,
        key,
        options
      );
    } catch (e) {
      errorlog(JSON.stringify(e));
      return errorResponse(new InternalServerError(e.message));
    }
    cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  } else {
    cm.status = constants.cmStatus.COMPLETE;
  }

  // DynamoDbデータ更新
  cm.timestamp = timestamp();
  options = {
    UpdateExpression: `SET cm[${index}] = :cm`,
    ExpressionAttributeValues: {
      ":cm": cm,
    },
    ReturnValues: "UPDATED_NEW",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  try {
    ret = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    return errorResponse(new InternalServerError(e.message));
  }

  return { code: "200", message: "complete" };
};

// CM音圧調整処理
function convertCm(unisCustomerCd, id) {
  return new Promise(async function (resolve, reject) {
    const workDir = `/tmp/umesse/${unisCustomerCd}/convert`;
    const ffmpeg = `ffmpeg -hide_banner`;

    try {
      execSync(`mkdir -p ${workDir} && rm -f ${workDir}/*`);

      let ret = await s3Manager.get(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/cm/${id}.mp3`
      );
      if (!ret || !ret.Body) throw "getObject failed";

      fs.writeFileSync(`${workDir}/${id}.mp3`, ret.Body);

      let command = "";
      let data = "";

      // 1. wav変換
      command = `${ffmpeg} -y -i ${workDir}/${id}.mp3 \
        -ar 44100 -acodec pcm_s16le -ac 2 -map_metadata -1 -flags +bitexact ${workDir}/tmp_1.wav`;
      debuglog(command);
      execSync(command);

      // 2. ラウドネス値取得 (1回目)
      command = `${ffmpeg} -i ${workDir}/tmp_1.wav \
        -af loudnorm=I=-24.0:LRA=+20.0:tp=-2.0:print_format=json -f null - 2>&1 | tail -12`;
      console.log(command);
      ret = execSync(command);
      data = JSON.parse(ret.toString());

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
      ret = execSync(command);
      data = JSON.parse(ret.toString());

      // 5. ラウドネス調整 + HE-AACv2化
      command = `${ffmpeg} -y -i ${workDir}/tmp_2.wav \
        -af volume=0dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 ${workDir}/${id}.aac`;
      if (data.input_i > -17.5) {
        command = `${ffmpeg} -y -i ${workDir}/tmp_2.wav \
          -af volume=-${
            parseFloat(data.input_i) + 17.5
          }dB -acodec libfdk_aac -profile:a aac_he_v2 -ab 48k -ar 48000 -ac 2 ${workDir}/${id}.aac`;
      }
      debuglog(command);
      execSync(command);

      // S3へPUT
      const fileStream = fs.createReadStream(`${workDir}/${id}.aac`);
      fileStream.on("error", (e) => {
        throw e;
      });
      ret = await s3Manager.put(
        constants.s3Bucket().users,
        `users/${unisCustomerCd}/${constants.resourceCategory.CM}/${id}.aac`,
        fileStream
      );
      if (!ret) throw "putObject failed";

      // FIXME: エンコード前の音源は削除するか検討（一旦コメントアウト）
      // await s3Manager.delete(
      //   constants.s3Bucket().users,
      //   `users/${unisCustomerCd}/cm/${id}.mp3`
      // );

      debuglog("converter complete");
      resolve();
    } catch (e) {
      errorlog(e);
      reject("converter failed");
    }
  });
}

function errorResponse(e) {
  assert(e instanceof AppError);
  return {
    code: e.statusCode,
    message: e.message,
  };
}
