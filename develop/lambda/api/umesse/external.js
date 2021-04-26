"use strict";

const {
  constants,
  debuglog,
  errorlog,
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
  let checkError = checkParams(params);
  if (checkError) throw new BadRequestError(checkError);

  let uploadSystem = constants.cmUploadSystem[external.toUpperCase()];
  let ret;
  try {
    ret = await db.External.findByUploadSystem(uploadSystem);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
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
        let path = `users/${item.unisCustomerCd}/${constants.resourceCategory.CM}/${item.cmId}.aac`;
        item.url = await s3Manager.getSignedUrl(
          constants.s3Bucket().users,
          path
        );
        item.fileName = `${item.cmId}.aac`;
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
  let checkError = checkParams(
    {
      unisCustomerCd: unisCustomerCd,
      external: external,
      ...body,
    },
    ["dataProcessType", "cmId"]
  );
  if (checkError) throw new BadRequestError(checkError);

  // CM一覧から該当CMを取得
  let cm, index;
  try {
    [cm, index] = await db.User.findCmIndex(unisCustomerCd, body.cmId);
  } catch (e) {
    if (!e instanceof NotFoundError) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }
  }

  if (!cm) {
    // 該当CMが存在していない場合、外部連携をエラーにする
    let data = {
      ":status": "9",
      ":errorCode": "U990",
      ":errorMessage": ERROR_CODE.E0000404,
      ":timestamp": timestamp(),
    };
    try {
      const _ = await db.External.updateErrorData(unisCustomerCd, data);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }

    return body;
  }

  // CMステータスのチェック
  if (cm.status !== constants.cmStatus.EXTERNAL_UPLOADING) {
    // 整合性が合っていない状態の場合、外部連携をエラーにする
    let data = {
      ":status": "9",
      ":errorCode": "U991",
      ":errorMessage": ERROR_CODE.E0002000,
      ":timestamp": timestamp(),
    };
    try {
      const _ = await db.External.updateErrorData(unisCustomerCd, data);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }

    cm.status = constants.cmStatus.EXTERNAL_ERROR;
    try {
      const _ = await db.User.updateCm(unisCustomerCd, index, cm);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }

    return body;
  }

  // 外部連携データ取得
  let ret;
  try {
    ret = await db.External.find(unisCustomerCd);
  } catch (e) {
    if (e instanceof NotFoundError) throw e;
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

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
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }
    cm.status = constants.cmStatus.EXTERNAL_ERROR;
  } else {
    // 正常完了の場合
    if (ret.dataProcessType === constants.cmDataProcessType.DELETE) {
      // 連携解除の場合、各連携システム側で制御できないので、CMIDを新たに降りなおす
      const id = generateId(unisCustomerCd, constants.resourceCategory.CM);
      const path = `users/${unisCustomerCd}/${constants.resourceCategory.CM}`;
      let res;
      try {
        res = await s3Manager.copy(
          constants.s3Bucket().users,
          `${path}/${id}.aac`,
          `${constants.s3Bucket().users}/${path}/${cm.cmId}.aac`
        );
        const _ = await s3Manager.delete(
          constants.s3Bucket().users,
          `${path}/${cm.cmId}.aac`
        );
      } catch (e) {
        errorlog(JSON.stringify(e));
        throw new InternalServerError(ERROR_CODE.E0000500);
      }

      cm.cmId = id;
      cm.uploadSystem = "";
      cm.status = constants.cmStatus.COMPLETE;
    } else {
      cm.status = constants.cmStatus.EXTERNAL_COMPLETE;
    }

    try {
      const _ = await db.External.delete(unisCustomerCd);
    } catch (e) {
      errorlog(JSON.stringify(e));
      throw new InternalServerError(ERROR_CODE.E0000500);
    }
  }
  cm.timestamp = timestamp();

  // DynamoDBのデータ更新
  try {
    const _ = await db.User.updateCm(unisCustomerCd, index, cm);
  } catch (e) {
    errorlog(JSON.stringify(e));
    throw new InternalServerError(ERROR_CODE.E0000500);
  }

  return body;
};
