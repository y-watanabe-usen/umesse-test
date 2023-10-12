"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
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

  const body = JSON.parse(event.Records[0].body);
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
    return errorResponse(new BadRequestError(ERROR_CODE.E0002000));

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
async function convertCm(unisCustomerCd, id) {
  try {
    // UMesseConverter.
    const converter = new UMesseConverter(s3Manager);

    const workDir = converter.getWorkDir(unisCustomerCd, id);
    // Initialized workdir.
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
    }

    // 出力ファイルパス.
    const output = path.join(workDir, `${id}.aac`);
    const tmpOutput1 = path.join(workDir, `tmp_1.wav`);
    const tmpOutput2 = path.join(workDir, `tmp_2.wav`);

    // S3から該当CM取得
    let target = `users/${unisCustomerCd}/${constants.resourceCategory.CM}/${id}`;
    if (
      !(await converter.getContents(
        constants.s3Bucket().users,
        `${target}.mp3`,
        workDir,
        `${id}.mp3`
      ))
    )
      throw "getObject failed";
console.log('test1');
console.log(target);
    // 1. wav変換
    debuglog(`1. converter to wav`);
    await converter.toWav(`${workDir}/${id}.mp3`, tmpOutput1);

    // 2. ラウドネス値取得 (1回目)
    debuglog(`2. converter get loudnorm`);
    let loudnorm = await converter.getLoudnorm(tmpOutput1, {
      I: "-24.0",
      LRA: "+20.0",
      tp: "-2.0",
    });
console.log('test2');
    console.log(loudnorm);

    // 3. ラウドネス調整 + 音圧調整
    debuglog(`3. converter run loudnorm`);
    await converter.runLoudnorm(tmpOutput1, tmpOutput2, {
      I: "-24.0",
      LRA: "+20.0",
      tp: "-2.0",
      input_I: loudnorm.input_i,
      input_LRA: loudnorm.input_lra,
      input_tp: loudnorm.input_tp,
      input_thresh: loudnorm.input_thresh,
      target_offset: loudnorm.target_offset,
    });
console.log('test3');
    // 4. ラウドネス値取得 (2回目)
    debuglog(`4. converter get loudnorm`);
    loudnorm = await converter.getLoudnorm(tmpOutput2, {
      I: "-12.0",
      LRA: "+10.0",
      tp: "-2.0",
    });
console.log('test4');
    console.log(loudnorm);

    // 5. ラウドネス調整 + HE-AACv2化
    debuglog(`5. converter run loudnorm convert`);
    await converter.runLoudnormConvert(tmpOutput2, output, {
      input_I: loudnorm.input_i,
    });
console.log('test5');
    // S3へPUT
    const fileStream = fs.createReadStream(output);
    fileStream.on("error", (e) => {
      throw e;
    });
console.log('test6');
    let ret = await s3Manager.put(
      constants.s3Bucket().users,
      `${target}.aac`,
      fileStream
    );
    if (!ret) throw "putObject failed";
console.log('test7');
    await s3Manager.delete(constants.s3Bucket().users, `${target}.mp3`);
    debuglog("converter complete");
    return;
  } catch (e) {
console.log('test8');
    errorlog(e.message);
    return "converter failed";
  }
}

function errorResponse(e) {
  assert(e instanceof AppError);
  return {
    code: e.statusCode,
    message: e.message,
  };
}
