"use strict";

const {
  constants,
  debuglog,
  timestamp,
  generateId,
  responseData,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const { sqsManager } = require("umesse-lib/utils/sqsManager");
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
  let params = {
    unisCustomerCd: unisCustomerCd,
  };
  if (id) params.cmId = id;
  if (sort) params.sort = sort;
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.findCm(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    throw new InternalServerError(e.message);
  }
  if (id) {
    ret = ret.filter((item) => item.cmId === id).shift();
    if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);
    ret.url = await s3Manager.getSignedUrl(
      constants.s3Bucket().users,
      `users/${ret.unisCustomerCd}/${constants.resourceCategory.CM}/${ret.cmId}.mp3`
    );
  }

  let data = responseData(ret, constants.resourceCategory.CM, sort);
  // レスポンスデータ成形
  if (Array.isArray(data)) {
    const scenes = Array.from(
      new Set(
        data.map((item) => {
          if (!item.scene) item.scene = { sceneCd: "999", sceneName: "作成中" };
          return item.scene.sceneCd;
        })
      )
    ).sort();

    let res = [];
    for (const sceneCd of scenes) {
      const details = data.filter((item) => item.scene.sceneCd === sceneCd);
      res.push({
        sceneCd: sceneCd,
        sceneName: details[0].scene.sceneName,
        details: details,
      });
    }
    data = res;
  }

  return data;
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
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      ...body,
    },
    ["materials"]
  );
  if (checkError) throw new BadRequestError(checkError);

  // ID生成
  let id = generateId(unisCustomerCd, constants.resourceCategory.CM);

  // CMIDが存在している場合は更新する
  let cm, index;
  if (body.id) {
    id = body.id;
    try {
      [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
    } catch (e) {
      if (e instanceof NotFoundError) throw e;
      throw new InternalServerError(e.message);
    }
  }

  // FIXME: ローカル環境だとここでエラーになって先の検証が出来ないので、一旦ローカル環境では動かないようにしてる
  if (process.env.environment !== "local") {
    // CM結合、S3へPUT
    // SQS send
    const messageBody = {
      unisCustomerCd: unisCustomerCd,
      id: id,
      category: constants.resourceCategory.CM,
      materials: body.materials,
    };

    try {
      const _ = await sqsManager.send(
        messageBody,
        constants.sqsGenerateQueueUrl()
      );
    } catch (e) {
      throw new InternalServerError(e.message);
    }
  }

  // DynamoDBのデータ更新
  let ret;
  if (cm) {
    // 更新の場合
    cm.materials = body.materials;
    cm.productionType =
      "bgm" in body.materials
        ? constants.cmProductionType.MUSIC
        : constants.cmProductionType.NONE;
    cm.status = constants.cmStatus.GENERATE;
    cm.timestamp = timestamp();
    try {
      ret = await db.User.updateCm(unisCustomerCd, index, cm);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
  } else {
    // 新規の場合
    const data = {
      cmId: id,
      materials: body.materials,
      productionType:
        "bgm" in body.materials
          ? constants.cmProductionType.MUSIC
          : constants.cmProductionType.NONE,
      status: constants.cmStatus.GENERATE,
      timestamp: timestamp(),
    };

    try {
      ret = await db.User.addCm(unisCustomerCd, data);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
  }

  return responseData(ret, constants.resourceCategory.CM);
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
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      cmId: id,
      ...body,
    },
    ["title"]
  );
  if (checkError) throw new BadRequestError(checkError);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    throw new InternalServerError(e.message);
  }

  // TODO: CMステータス状態によるチェック
  if (body.uploadSystem) {
    // 既に連携データがある場合はエラー
    let external;
    try {
      external = await db.External.find(unisCustomerCd);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
    if (external) throw new BadRequestError(ERROR_CODE.E0400010);
  }

  let dataProcessType;
  let startDatetime;
  let endDatetime;
  let productionType;
  let contentTime;
  let sceneCd;
  let status = constants.cmStatus.COMPLETE;

  // CM作成中の場合
  if (cm.status === constants.cmStatus.CREATING) {
    // FIXME: ローカル環境だとここでエラーになって先の検証が出来ないので、一旦ローカル環境では動かないようにしてる
    if (process.env.environment !== "local") {
      try {
        // SQS send
        const messageBody = {
          unisCustomerCd: unisCustomerCd,
          id: id,
          category: constants.resourceCategory.CM,
        };

        const _ = await sqsManager.send(
          messageBody,
          constants.sqsConverterQueueUrl()
        );
      } catch (e) {
        throw new InternalServerError(e.message);
      }
    }

    cm.status = constants.cmStatus.CONVERT;
    dataProcessType = constants.cmDataProcessType.ADD;
    startDatetime = body.startDate;
    endDatetime = body.endDate;
    productionType = cm.productionType;
    contentTime = cm.seconds * 1000; // millisecond
    sceneCd = body.scene.sceneCd;
    status = "0";
  } else if (cm.status !== constants.cmStatus.CREATING && body.uploadSystem) {
    cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
    dataProcessType = constants.cmDataProcessType.UPDATE;
    status = "1";
  }

  // 外部連携データ登録
  if (body.uploadSystem) {
    const item = {
      unisCustomerCd: unisCustomerCd,
      dataProcessType: dataProcessType,
      cmId: id,
      cmName: body.title,
      cmCommentManuscript: body.description,
      startDatetime: startDatetime,
      endDatetime: endDatetime,
      productionType: productionType,
      contentTime: contentTime,
      sceneCd: sceneCd,
      uploadSystem: body.uploadSystem,
      status: status,
      timestamp: timestamp(),
    };

    try {
      const _ = await db.External.add(item);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
  }

  // DynamoDBのデータ更新
  Object.keys(body).map((key) => {
    cm[key] = body[key];
  });
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    throw new InternalServerError(e.message);
  }

  return responseData(ret, constants.resourceCategory.CM);
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
  let checkError = checkParams({
    unisCustomerCd: unisCustomerCd,
    cmId: id,
  });
  if (checkError) throw new BadRequestError(checkError);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    throw new InternalServerError(e.message);
  }

  // TODO: CMステータス状態によるチェック
  if (cm.status !== constants.cmStatus.COMPLETE)
    throw new NotFoundError(ERROR_CODE.E0000404);

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.DELETE;
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    throw new InternalServerError(e.message);
  }

  // S3上のCMを削除
  try {
    const _ = await s3Manager.delete(
      constants.s3Bucket().users,
      `users/${unisCustomerCd}/${constants.resourceCategory.CM}/${id}.aac`
    );
  } catch (e) {
    throw new InternalServerError(e.message);
  }

  return responseData(ret, constants.resourceCategory.CM);
};
