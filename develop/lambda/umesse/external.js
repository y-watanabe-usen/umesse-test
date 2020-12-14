"use strict";

const {
  constants,
  debuglog,
  timestamp,
  checkCmStatus,
} = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;
const { getCm } = require("./cm");

// 外部連携データ取得（一覧・個別）
exports.getExternalCm = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      external: external,
    })}`
  );

  try {
    const res = await dynamodb.scan(constants.externalTable, {});
    if (!res || !res.Items) throw "not found";

    let json = res.Items;
    if (unisCustomerCd) {
      json = json.filter((item) => item.unis_customer_cd === unisCustomerCd);
    }
    if (external == "center") {
      json = json.filter(
        (item) =>
          item.upload_system === constants.cmUploadSystem.CENTER &&
          item.status === "1"
      );
    } else if (external == "ssence") {
      json = json.filter(
        (item) =>
          item.upload_system === constants.cmUploadSystem.SSENCE &&
          item.status === "1"
      );
    } else {
      throw "unknown external";
    }

    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 外部連携データ取得（一覧・個別）ユーザー用
exports.getUserExternalCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getUserExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    const res = await dynamodb.scan(constants.externalTable, {});
    if (!res || !res.Items) throw "not found";

    let json = res.Items;
    if (unisCustomerCd) {
      json = json.filter((item) => item.unis_customer_cd === unisCustomerCd);
    }
    if (cmId) {
      json = json.filter((item) => item.id === cmId);
    }

    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};

// 外部連携完了
exports.completeExternalCm = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternalCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      body: body,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === body.uMesseCmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("completeExternalCm", cm.status);
    if (check) throw check;

    const data = await this.getExternalCm(unisCustomerCd, external);
    if (!data) throw "not found";

    let res = "";
    const key = { unis_customer_cd: unisCustomerCd };

    if (body.dataProcessType == "01") {
      // 正常完了の場合
      res = await dynamodb.delete(constants.externalTable, key, {});
      if (!res) throw "delete failed";
      console.log(res);

      if (data[0].data_process_type == "03") {
        cm.status = constants.cmStatus.COMPLETE;
      } else {
        cm.status = constants.cmStatus[`${external.toUpperCase()}_COMPLETE`];
      }
    } else {
      // エラー終了の場合
      const options = {
        UpdateExpression: `SET status = :status, error_code = :errorCode, error_message = :errorMessage, timestamp = :timestamp`,
        ExpressionAttributeValues: {
          ":status": "9",
          ":errorCode": body.errorCode,
          ":errorMessage": body.errorMessage,
          ":timestamp": timestamp(),
        },
        ReturnValues: "UPDATED_NEW",
      };
      res = await dynamodb.update(constants.externalTable, key, options);
      if (!res) throw "update failed";

      cm.status = constants.cmStatus[`${external.toUpperCase()}_ERROR`];
    }

    // DynamoDBのデータ更新
    cm.timestamp = timestamp();
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
