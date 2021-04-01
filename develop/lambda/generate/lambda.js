"use strict";

const assert = require("assert");
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
    `[generate] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  const body = JSON.parse(JSON.parse(event.Records[0].body).MessageBody);
  const unisCustomerCd = body.unisCustomerCd;
  const id = body.id;
  const category = body.category;
  const materials = body.materials;

  debuglog(
    JSON.stringify({
      body: body,
      unisCustomerCd: unisCustomerCd,
      id: id,
      category: category,
      materials: materials,
    })
  );

  // パラメーターチェック
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: id,
    category: category,
    materials: materials,
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
  if (cm.status !== constants.cmStatus.GENERATE)
    return errorResponse(new NotFoundError(ERROR_CODE.E0000404));

  // CMコンバート処理
  let seconds;
  try {
    seconds = await generateCm(unisCustomerCd, id, materials);
  } catch (e) {
    errorlog(JSON.stringify(e.message));
    return errorResponse(new InternalServerError(e.message));
  }

  // DynamoDbデータ更新
  cm.seconds = seconds;
  cm.status = constants.cmStatus.CREATING;
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

// CM結合処理
async function generateCm(unisCustomerCd, id, materials) {
  try {
    // UMesseConverter.
    const converter = new UMesseConverter(s3Manager);

    // 出力ファイルパス解決.
    const workDir = converter.getWorkDir(unisCustomerCd, id);
    const output = path.join(workDir, `${id}.mp3`);

    // CM作成.
    await converter.generateCm(unisCustomerCd, id, materials, output);

    // CMのduration取得.
    const seconds = await converter.getDuration(output);
    debuglog(`seconds = ${seconds}`);

    // CM Fileをs3へ.
    // TODO: Windowsのpath解決のため converter.createReadStreamをコールしている
    // converterに依存しないでfs.createReadStream(output);にしたい
    const fileStream = await converter.createReadStream(output);
    fileStream.on("error", (e) => {
      throw e;
    });
    const res = await s3Manager.put(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${constants.resourceCategory.CM}/${id}.mp3`,
      fileStream
    );
    if (!res) throw new InternalServerError(ERROR_CODE.E0000500);
    debuglog("generate complete");
    return Math.trunc(seconds);
  } catch (e) {
    throw new InternalServerError(e.message);
  }
}

function errorResponse(e) {
  assert(e instanceof AppError);
  return {
    code: e.statusCode,
    message: e.message,
  };
}
