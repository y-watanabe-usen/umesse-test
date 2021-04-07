"use strict";

const {
  constants,
  debuglog,
  errorlog,
  timestamp,
  responseData,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const db = require("./db");

// 外部連携データ取得（一覧・個別）
exports.getUploadCm = async (unisCustomerCd, id) => {
  debuglog(
    `[getUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      id: id,
    })}`
  );

  // パラメーターチェック
  let params = {
    unisCustomerCd: unisCustomerCd,
  };
  if (id) params.cmId = id;
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let ret;
  try {
    ret = await db.User.findCm(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  ret = ret.filter(
    (item) =>
      item.status === constants.cmStatus.EXTERNAL_UPLOADING ||
      item.status === constants.cmStatus.EXTERNAL_COMPLETE ||
      item.status === constants.cmStatus.EXTERNAL_ERROR
  );
  if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);

  if (id) ret = ret.filter((item) => item.cmId === id).shift();
  if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);

  return responseData(ret, constants.resourceCategory.CM);
};

// CM外部連携登録
exports.createUploadCm = async (unisCustomerCd, id, body) => {
  debuglog(
    `[createUploadCm] ${JSON.stringify({
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
    ["uploadSystem"]
  );
  if (checkError) throw new BadRequestError(checkError);

  // 既に連携データがある場合はエラー
  let external;
  try {
    external = await db.External.find(unisCustomerCd);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }
  if (external) throw new BadRequestError(ERROR_CODE.E0400010);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  if (cm.status !== constants.cmStatus.COMPLETE)
    throw new BadRequestError(ERROR_CODE.E0002000);

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: constants.cmDataProcessType.ADD,
    cmId: id,
    cmName: cm.title,
    cmCommentManuscript: cm.description,
    startDatetime: cm.startDate,
    endDatetime: cm.endDate,
    productionType: cm.productionType,
    contentTime: cm.seconds * 1000, // millisecond
    sceneCd: cm.scene.sceneCd,
    uploadSystem: body.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };
  try {
    const _ = await db.External.add(item);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  cm.uploadSystem = body.uploadSystem;
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, constants.resourceCategory.CM);
};

// CM外部連携解除
exports.deleteUploadCm = async (unisCustomerCd, id) => {
  debuglog(
    `[deleteUploadCm] ${JSON.stringify({
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

  // 既に連携データがある場合はエラー
  let external;
  try {
    external = await db.External.find(unisCustomerCd);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }
  if (external) throw new BadRequestError(ERROR_CODE.E0400010);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, id);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // CMステータスのチェック
  if (cm.status !== constants.cmStatus.EXTERNAL_COMPLETE)
    throw new BadRequestError(ERROR_CODE.E0002000);

  // 連携用のデータ追加
  const item = {
    unisCustomerCd: unisCustomerCd,
    dataProcessType: constants.cmDataProcessType.DELETE,
    cmId: id,
    endDateTime: timestamp(),
    uploadSystem: cm.uploadSystem,
    status: "1",
    timestamp: timestamp(),
  };
  try {
    const _ = await db.External.add(item);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  // DynamoDBのデータ更新
  cm.status = constants.cmStatus.EXTERNAL_UPLOADING;
  cm.timestamp = timestamp();

  let ret;
  try {
    ret = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return responseData(ret, constants.resourceCategory.CM);
};
