"use strict";

const {
  constants,
  debuglog,
  timestamp,
  generateId,
} = require("umesse-lib/constants");
const { checkParams } = require("umesse-lib/validation");
const { s3Manager } = require("umesse-lib/utils/s3Manager");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("umesse-lib/error");
const db = require("./db");
const { getCm } = require("./cm");

// 外部連携データ取得（一覧・個別）
exports.getExternalCm = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
    })}`
  );

  // パラメーターチェック
  let params = {
    external: external,
  };
  if (unisCustomerCd) params.unisCustomerCd = unisCustomerCd;
  let checkMessages = checkParams(params);
  if (checkMessages) throw new BadRequestError(checkMessages.join("\n"));

  let uploadSystem = constants.cmUploadSystem[external.toUpperCase()];
  let ret;
  try {
    ret = await db.External.findByUploadSystem(uploadSystem);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    else throw new InternalServerError(e.message);
  }

  if (unisCustomerCd) {
    ret = ret.filter((item) => item.unisCustomerCd === unisCustomerCd);
  }
  if (!ret || !ret.length) throw new NotFoundError(ERROR_CODE.E0000404);

  // レスポンスの成形
  const customers = Array.from(new Set(ret.map((item) => item.unisCustomerCd)));
  let json = { unisCustomers: [] };
  for (const customer of customers) {
    let data = ret.filter((item) => item.unisCustomerCd === customer);
    let meta = [];
    data.forEach(async (item) => {
      if (item.dataProcessType === constants.cmDataProcessType.ADD) {
        item.url = await s3Manager.getSignedUrl(
          constants.s3Bucket().users,
          `users/${item.unisCustomerCd}/${constants.resourceCategory.CM}/${item.cmId}.aac`
        );
      }
      delete item.unisCustomerCd;
      meta.push(item);
    });
    json.unisCustomers.push({
      unisCustomerCd: customer,
      cmMetas: meta,
    });
  }

  return json;
};

// 外部連携完了
exports.completeExternalCm = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
      body,
    })}`
  );

  // パラメーターチェック
  let checkMessages = checkParams({
    unisCustomerCd: unisCustomerCd,
    external: external,
    ...body,
  });
  if (checkMessages) throw new BadRequestError(checkMessages.join("\n"));

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new NotFoundError(ERROR_CODE.E0000404);
  const index = list.findIndex((item) => item.id === body.cmId);
  if (index < 0) throw new NotFoundError(ERROR_CODE.E0000404);
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  let ret = await this.getExternalCm(unisCustomerCd, external);
  ret = ret.unisCustomers.shift();
  if (!ret) throw new NotFoundError(ERROR_CODE.E0000404);

  if (body.dataProcessType == constants.cmDataProcessType.ERROR) {
    // エラー終了の場合
    let data = {
      ":status": "9",
      ":errorCode": body.errorCode,
      ":errorMessage": body.errorMessage,
      ":timestamp": timestamp(),
    };
    try {
      const _ = await db.External.updateErrorData(unisCustomerCd, data);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
    cm.status = constants.cmStatus.EXTERNAL_ERROR;
  } else {
    // 正常完了の場合
    try {
      const _ = await db.External.delete(unisCustomerCd);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
    if (ret.dataProcessType == constants.cmDataProcessType.DELETE) {
      // 連携解除の場合、各連携システム側で制御できないので、CMIDを新たに降りなおす
      const id = generateId(unisCustomerCd, "c");
      const path = `users/${unisCustomerCd}/${constants.resourceCategory.CM}`;
      let res;
      try {
        res = await s3Manager.copy(
          constants.s3Bucket().users,
          `${path}/${id}.mp3`,
          `${constants.s3Bucket().users}/${path}/${cm.cmId}.mp3`
        );
      } catch (e) {
        throw new InternalServerError(e.message);
      }
      if (!res) throw new InternalServerError(ERROR_CODE.E0000500);

      cm.cmId = id;
      cm.uploadSystem = "";
      cm.status = constants.cmStatus.COMPLETE;
    } else {
      cm.status = constants.cmStatus.EXTERNAL_COMPLETE;
    }
  }
  cm.timestamp = timestamp();

  // DynamoDBのデータ更新
  try {
    const _ = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    throw new InternalServerError(e.message);
  }
  return body;
};
