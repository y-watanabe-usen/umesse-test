"use strict";

const { constants, debuglog, timestamp } = require("umesse-lib/constants");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const { validation } = require("./validation");
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
    const res = await dynamodbManager.scan(
      constants.dynamoDbTable().external,
      {}
    );
    if (!res || !res.Items.length) throw "not found";

    let json = res.Items;
    if (external == "center") {
      json = json.filter(
        (item) =>
          item.uploadSystem === constants.cmUploadSystem.CENTER &&
          item.status === "1"
      );
    } else if (external == "ssence") {
      json = json.filter(
        (item) =>
          item.uploadSystem === constants.cmUploadSystem.SSENCE &&
          item.status === "1"
      );
    }
    if (!json.length) throw "nothing";

    if (unisCustomerCd) {
      json = json.filter((item) => item.unisCustomerCd === unisCustomerCd)[0];
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
    // パラメーターチェック
    const checkParams = validation.checkParams("completeExternalCm", body);
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === body.uMesseCmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus(
      "completeExternalCm",
      cm.status
    );
    if (checkCmStatus) throw checkCmStatus;

    const external = await this.getExternal(
      unisCustomerCd,
      external,
      body.uMesseCmId
    );
    if (!external) throw "not found";

    let res = "";
    const key = { unisCustomerCd: unisCustomerCd };

    if (body.dataProcessType == "01") {
      // 正常完了の場合
      res = await dynamodbManager.delete(
        constants.dynamoDbTable().external,
        key,
        {}
      );
      if (!res) throw "delete failed";

      if (external[0].dataProcessType == "03") {
        cm.status = constants.cmStatus.COMPLETE;
      } else {
        cm.status = constants.cmStatus[`${external.toUpperCase()}_COMPLETE`];
      }
    } else {
      // エラー終了の場合
      const options = {
        UpdateExpression: `SET status = :status, errorCode = :errorCode, errorMessage = :errorMessage, timestamp = :timestamp`,
        ExpressionAttributeValues: {
          ":status": "9",
          ":errorCode": body.errorCode,
          ":errorMessage": body.errorMessage,
          ":timestamp": timestamp(),
        },
        ReturnValues: "UPDATED_NEW",
      };
      res = await dynamodbManager.update(
        constants.dynamoDbTable().external,
        key,
        options
      );
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
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodbManager.update(
      constants.dynamoDbTable().users,
      key,
      options
    );
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};
