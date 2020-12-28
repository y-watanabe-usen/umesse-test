"use strict";

const { constants, debuglog, timestamp } = require("./constants");
const { validation } = require("./validation");
const dynamodb = require("./utils/dynamodbController").controller;
const { getCm } = require("./cm");

// 外部連携データ取得（一覧・個別）
exports.getUploadCm = async (unisCustomerCd, cmId) => {
  debuglog(
    `[getUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("getUploadCm", unisCustomerCd);
    if (checkParams) throw checkParams;

    const options = {
      KeyConditionExpression: "unisCustomerCd = :unisCustomerCd",
      ExpressionAttributeValues: {
        ":unisCustomerCd": unisCustomerCd,
      },
    };
    const res = await dynamodb.query(
      constants.dynamoDbTable().external,
      options
    );
    if (!res || !res.Items.length) throw "not found";

    let json = res.Items;
    if (cmId) {
      json = json.filter((item) => item.id === cmId)[0];
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
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

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("createUploadCm", body);
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus("createUploadCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

    // 連携用のデータ追加
    const item = {
      unisCustomerCd: unisCustomerCd,
      dataProcessType: "01",
      id: cmId,
      title: cm.title,
      description: cm.description,
      seconds: cm.seconds,
      startDate: cm.startDate,
      endDate: cm.endDate,
      productionType: cm.productionType,
      industry: cm.industry.id,
      scene: cm.scene.id,
      uploadSystem: body.uploadSystem,
      status: "1",
      timestamp: timestamp(),
    };

    let res = await dynamodb.put(constants.dynamoDbTable().external, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    if (body.uploadSystem == constants.cmUploadSystem.CENTER)
      cm.status = constants.cmStatus.CENTER_UPLOADING;
    else if (body.uploadSystem == constants.cmUploadSystem.SSENCE)
      cm.status = constants.cmStatus.SSENCE_UPLOADING;

    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodb.update(constants.dynamoDbTable().users, key, options);
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
exports.deleteUploadCm = async (unisCustomerCd, cmId, body) => {
  debuglog(
    `[deleteUploadCm] ${JSON.stringify({
      unisCustomerCd: unisCustomerCd,
      cmId: cmId,
    })}`
  );

  try {
    // パラメーターチェック
    const checkParams = validation.checkParams("deleteUploadCm", body);
    if (checkParams) throw checkParams;

    // CM一覧から該当CMを取得
    const list = await getCm(unisCustomerCd);
    if (!list) throw "not found";
    const index = list.findIndex((item) => item.id === cmId);
    if (index < 0) throw "not found";
    const cm = list[index];

    // CMステータス状態によるチェック
    const checkCmStatus = validation.checkCmStatus("deleteUploadCm", cm.status);
    if (checkCmStatus) throw checkCmStatus;

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
      unisCustomerCd: unisCustomerCd,
      dataProcessType: "03",
      id: cmId,
      endDate: body.endDate,
      uploadSystem: uploadSystem,
      status: "1",
      timestamp: timestamp(),
    };

    let res = await dynamodb.put(constants.dynamoDbTable().external, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    cm.timestamp = timestamp();
    const key = { unisCustomerCd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));

    res = await dynamodb.update(constants.dynamoDbTable().users, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm[index];
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
    return { message: e };
  }
};