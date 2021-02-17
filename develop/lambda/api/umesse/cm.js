"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const path = require('path');
const {
  constants,
  debuglog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const UMesseConverter = require("umesse-lib/converter");
const { validation } = require("umesse-lib/validation");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { sqsManager } = require("umesse-lib/utils/sqsManager");
const { BadRequestError, InternalServerError } = require("./error");

// CM取得（一覧・個別）
exports.getCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  const key = { unisCustomerCd: unisCustomerCd };
  const options = {
    ProjectionExpression: "cm",
  };
  debuglog(JSON.stringify({ key: key, options: options }));

  let res;
  try {
    res = await dynamodbManager.get(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res || !res.Item) throw new InternalServerError("not found");

  let json = res.Item.cm;
  if (cmId) {
    json = json.filter((item) => item.cmId === cmId)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
};

// CM新規作成（結合処理）
exports.createCm = async (unisCustomerCd, body) => {
  debuglog(
    `[createCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);
  // ナレーションチェック
  if (!body.materials.narrations || body.materials.narrations.length < 1)
    throw new BadRequestError("not narration");


  // ID生成
  const cmId = generateId(unisCustomerCd, "c");

  // CM結合、S3へPUT
  const seconds = await generateCm(unisCustomerCd, cmId, body.materials);
  if (!seconds) throw new InternalServerError("generate cm failed");

  // 署名付きURLの発行
  let url;
  try {
    url = await s3Manager.getSignedUrl(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!url) throw new InternalServerError("getSignedUrl failed");

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

  let res;
  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes.cm.pop();
  json["url"] = url;
  return json;
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

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await this.getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
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
    if (!res) throw new InternalServerError("update failed");

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

    try {
      res = await dynamodbManager.put(
        constants.dynamoDbTable().external,
        item,
        {}
      );
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(e.message);
    }
    if (!res) throw new InternalServerError("put failed");
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

  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes.cm[index];
  return json;
};

// CM削除
exports.deleteCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: cmId,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await this.getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // S3上のCMを削除
  try {
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${cmId}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

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

  let res;
  try {
    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!res) throw new InternalServerError("update failed");

  let json = res.Attributes.cm[index];
  return json;
};

// CM結合処理
async function generateCm(unisCustomerCd, cmId, materials) {
  try {
    // UMesseConverter.
    const converter = new UMesseConverter(s3Manager);

    // 出力ファイルパス解決.
    const workDir = converter.getWorkDir(unisCustomerCd, cmId);
    const output = path.join(workDir, `${cmId}.mp3`);

    // CM作成.
    await converter.generateCm(unisCustomerCd, cmId, materials, output);

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
      `users/${unisCustomerCd}/cm/${cmId}.mp3`,
      fileStream
    );
    if (!res) throw new InternalServerError("putObject failed");
    debuglog("generate complete");
    return seconds;
  } catch (e) {
    throw new InternalServerError(e.message);
  }
}

