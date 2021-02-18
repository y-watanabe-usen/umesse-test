"use strict";

const { constants, debuglog, timestamp, errorlog } = require("umesse-lib/constants");
const { validation } = require("umesse-lib/validation");
const { getCm } = require("./cm");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");
const db = require("./db");

// 外部連携データ取得（一覧・個別）
exports.getExternalCm = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    external: external,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  let uploadSystem = constants.cmUploadSystem[external.toUpperCase()];
  let json;
  try {
    json = await db.External.findByUploadSystem(uploadSystem);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }

  if (unisCustomerCd) {
    json = json.filter((item) => item.unisCustomerCd === unisCustomerCd)[0];
  }
  if (!json) throw new InternalServerError("not found");
  return json;
};

// 外部連携完了
exports.completeExternalCm = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  // パラメーターチェック
  const checkParams = validation.checkParams({
    external: external,
    body: body,
  });
  if (checkParams) throw new BadRequestError(checkParams);

  // CM一覧から該当CMを取得
  const list = await getCm(unisCustomerCd);
  if (!list || !list.length) throw new InternalServerError("not found");
  const index = list.findIndex((item) => item.cmId === body.cmId);
  if (index < 0) throw new InternalServerError("not found");
  const cm = list[index];

  // TODO: CMステータス状態によるチェック

  const ret = await this.getExternalCm(unisCustomerCd, external);
  if (!ret) throw new InternalServerError("not found");

  if (body.dataProcessType == "01") {
    // 正常完了の場合
    try {
      const _ = await db.External.delete(unisCustomerCd);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw InternalServerError(e.message);
    }
    if (ret.dataProcessType == "03") {
      cm.uploadSystem = "";
      cm.status = constants.cmStatus.COMPLETE;
    } else {
      cm.status = constants.cmStatus.EXTERNAL_COMPLETE;
    }
  } else {
    // エラー終了の場合
    let data = {
      ":status": "9",
      ":errorCode": body.errorCode,
      ":errorMessage": body.errorMessage,
      ":timestamp": timestamp()
    };
    try {
      const _ = await db.External.updateErrorData(unisCustomerCd, data);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(e.message);
    }
    cm.status = constants.cmStatus.EXTERNAL_ERROR;
  }
  cm.timestamp = timestamp();

  // DynamoDBのデータ更新
  try {
    return await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};
