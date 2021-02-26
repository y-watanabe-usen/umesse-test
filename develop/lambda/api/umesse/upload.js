"use strict";

const { constants, debuglog, timestamp, errorlog } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { getCm } = require("./cm");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");
const db = require("./db");

// 外部連携データ取得（一覧・個別）
exports.getUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    unisCustomerCd: unisCustomerCd,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  try {
    return await db.External.findById(unisCustomerCd, cmId);
  } catch (e) {
    console.error(e.message);
    throw new InternalServerError(e.message);
  }
};

// CM外部連携
exports.createUploadCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[createUploadCm] ${JSON.stringify({
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
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: "01",
    cmId: cmId,
    cmName: cm.title,
    cmCommentManuscript: cm.description,
    startDatetime: cm.startDate,
    endDatetime: cm.endDate,
    productionType: cm.productionType,
    contentTime: cm.seconds,
    sceneCd: cm.scene.sceneCd,
    uploadSystem: body.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };

  try {
    const _ = await db.External.add(item);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  // DynamoDBのデータ更新
  cm.uploadSystem = body.uploadSystem;
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();

  try {
    return await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};

// CM外部連携解除
exports.deleteUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[deleteUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
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
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();

  let res;
  try {
    res = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: "03",
    cmId: cmId,
    endDateTime: timestamp(),
    uploadSystem: cm.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };
  try {
    const _ = await db.External.add(item);
  } catch (e) {
    errorlog(JSON.stringify(e));
  }
  return res;

};
