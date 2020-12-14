"use strict";

const {
  constants,
  debuglog,
  timestamp,
  checkCmStatus,
} = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const { getCm } = require("./cm");

// CM外部連携
exports.createExternal = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[createExternal] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
      body: body,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("createExternal", cm.status);
    if (check) throw check;

    // 連携用のデータ追加
    const item = {
      unis_customer_cd: unisCustomerCd,
      data_process_type: "01",
      id: cmId,
      title: cm.title,
      description: cm.description,
      seconds: cm.seconds,
      start_date: cm.start_date,
      end_date: cm.end_date,
      production_type: cm.production_type,
      industry: cm.industry.id,
      scene: cm.scenes.id,
      upload_system: body.uploadSystem,
      status: "1",
      timestamp: timestamp(),
    };

    let res = await dynamodb.put(constants.externalTable, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    if (body.uploadSystem == constants.cmUploadSystem.CENTER)
      cm.status = constants.cmStatus.CENTER_UPLOADING;
    else if (body.uploadSystem == constants.cmUploadSystem.SSENCE)
      cm.status = constants.cmStatus.SSENCE_UPLOADING;

    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
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

// CM外部連携解除
exports.deleteExternal = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[deleteExternal] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const check = checkCmStatus("deleteExternal", cm.status);
    if (check) throw check;

    let uploadSystem = "";
    if (cm.status == constants.cmStatus.CENTER_COMPLETE) {
      uploadSystem = constants.cmUploadSystem.CENTER;
      cm.status = constants.cmStatus.CENTER_UPLOADING;
    } else if (cm.status == constants.cmStatus.SSENCE_COMPLETE) {
      uploadSystem = constants.cmUploadSystem.SSENCE;
      cm.status = constants.cmStatus.SSENCE_UPLOADING;
    }

    // 連携用のデータ追加
    const item = {
      unis_customer_cd: unisCustomerCd,
      data_process_type: "03",
      id: cmId,
      end_date: body.endDate,
      upload_system: uploadSystem,
      status: "1",
      timestamp: timestamp(),
    };

    let res = await dynamodb.put(constants.externalTable, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    cm.timestamp = timestamp();
    const key = { unis_customer_cd: unisCustomerCd };
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

// 外部連携データ取得（一覧・個別）
exports.getExternal = async (unisCustomerCd, external) => {
  debuglog(
    `[getExternal] ${JSON.stringify({
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
exports.getExternalUser = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getExternalUser] ${JSON.stringify({
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
exports.completeExternal = async (unisCustomerCd, external, body) => {
  debuglog(
    `[completeExternal] ${JSON.stringify({
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
    const check = checkCmStatus("completeExternal", cm.status);
    if (check) throw check;

    const data = await this.getExternal(unisCustomerCd, external);
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
