"use strict";

const path = require("path");
const {
  constants,
  debuglog,
  errorlog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const UMesseConverter = require("umesse-lib/converter");
const { validation } = require("umesse-lib/validation");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { sqsManager } = require("umesse-lib/utils/sqsManager");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");
const db = require("./db");

// CM取得（一覧・個別）
exports.getCm = async (unisCustomerCd, id, sort) => {
  debuglog(
    `[getCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
      sort: sort,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  let json;
  try {
    json = await db.User.findCm(unisCustomerCd);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (id) {
    json = json.filter((item) => item.cmId === id).shift();
  }

  if (!json) throw new InternalServerError("not found");

  if (!sort) sort = 1;
  let sortFunc;
  switch (sort) {
    case constants.sort.TITLE_ASC:
      sortFunc = (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      };
      break;
    case constants.sort.TITLE_DESC:
      // titleの降順でソート
      sortFunc = (a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      };
      break;
    case constants.sort.TIMESTAMP_ASC:
      sortFunc = (a, b) => {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
      };
      break;
    case constants.sort.TIMESTAMP_DESC:
      sortFunc = (a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      };
      break;
    default:
      // titleの昇順でソート
      sortFunc = (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      };
  }
  if (Array.isArray(json)) json.sort(sortFunc);

  if (Array.isArray(json)) {
    json = json.map((element) => {
      if (element["id"]) return element;
      element["id"] = element["cmId"];
      delete element["cmId"];
      element["category"] = constants.resourceCategory.CM;
      return element;
    })
  }

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
  const id = generateId(unisCustomerCd, "c");

  // CM結合、S3へPUT
  const seconds = await generateCm(unisCustomerCd, id, body.materials);
  if (!seconds) throw new InternalServerError("generate cm failed");

  // 署名付きURLの発行
  let url;
  try {
    url = await s3Manager.getSignedUrl(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${id}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  if (!url) throw new InternalServerError("getSignedUrl failed");

  // DynamoDBのデータ更新
  const data = {
    cmId: id,
    materials: body.materials,
    productionType:
      "bgm" in body.materials
        ? constants.cmProductionType.MUSIC
        : constants.cmProductionType.NONE,
    seconds: seconds,
    status: constants.cmStatus.CREATING,
    timestamp: timestamp(),
  };

  let json;
  try {
    json = await db.User.addCm(unisCustomerCd, data);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  json["id"] = id;
  delete json["cmId"];
  json["category"] = constants.resourceCategory.CM;
  json["url"] = url;
  return json;
};

// CM確定・更新
exports.updateCm = async (unisCustomerCd, id, body) => {
  debuglog(
    `[updateCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    id: id,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await this.getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.id === id);
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
        id: id,
        category: constants.resourceCategory.CM,
      }),
      QueueUrl: constants.sqsQueueUrl(),
      DelaySeconds: 0,
    };

    // FIXME: ローカル環境だとここでエラーになって先の検証が出来ないので、一旦ローカル環境では動かないようにしてる
    if (process.env.environment != "local") {
      res = await sqsManager.send(params);
      if (!res) throw new InternalServerError("update failed");
    }

    cm.status = constants.cmStatus.CONVERT;
    dataProcessType = constants.cmDataProcessType.ADD;
    status = "0";
  } else {
    // CMアップロード
    if (body.uploadSystem) {
      cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
      dataProcessType = constants.cmDataProcessType.UPDATE;
      status = "1";
    }
  }

  // CMアップロード
  if (body.uploadSystem) {
    const item = {
      unisCustomerCd: unisCustomerCd,
      dataProcessType: dataProcessType,
      cmId: id,
      cmName: cm.title,
      cmCommentManuscript: cm.description,
      startDatetime: cm.startDate,
      endDatetime: cm.endDate,
      productionType: cm.productionType,
      contentTime: cm.seconds,
      sceneCd: body.scene.sceneCd,
      uploadSystem: body.uploadSystem,
      status: status,
      timestamp: timestamp(),
    };

    try {
      res = await db.External.add(item);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(e.message);
    }
  }

  // DynamoDBのデータ更新
  Object.keys(body).map((key) => {
    cm[key] = body[key];
  });
  cm.timestamp = timestamp();

  let json;
  try {
    json = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
  json["id"] = id;
  delete json["cmId"];
  json["category"] = constants.resourceCategory.CM;
  return json
};

// CM削除
exports.deleteCm = async (unisCustomerCd, id) => {
  debuglog(
    `[deleteCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
    id: id,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await this.getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.id === id);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.DELETE;
  cm.timestamp = timestamp();
  let res;
  try {
    res = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  // S3上のCMを削除
  try {
    await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/cm/${id}.mp3`
    );
  } catch (e) {
    errorlog(JSON.stringify(e));
  }
  return res;
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
      `users/${unisCustomerCd}/cm/${id}.mp3`,
      fileStream
    );
    if (!res) throw new InternalServerError("putObject failed");
    debuglog("generate complete");
    return seconds;
  } catch (e) {
    throw new InternalServerError(e.message);
  }
}
