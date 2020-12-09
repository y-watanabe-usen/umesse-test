"use strict";

const { constants } = require("./constants");
const dynamodb = require("./utils/dynamodbController").controller;
const s3 = require("./utils/s3Controller").controller;
const fetch = require("./cm").fetch;

// センター連携データ取得（一覧・個別）
exports.fetch = async (unisCustomerCd) => {
  constants.debuglog(`center fetch unis_customer_cd: ${unisCustomerCd}`);

  try {
    const options = {
      FilterExpression: `#status = :status`,
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "1",
      },
    };
    constants.debuglog(`options: ${JSON.stringify(options)}`);

    const res = await dynamodb.scan(constants.centerTable, options);
    if (!res || !res.Items) throw "not found";

    let json = res.Items;
    if (unisCustomerCd) {
      json = json
        .filter((item) => item.unis_customer_cd === unisCustomerCd)
        .pop();
    }
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// センター連携追加
exports.create = async (unisCustomerCd, cmId, body) => {
  constants.debuglog(
    `center create unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await fetch(unisCustomerCd);
    if (!list) throw "not found";
    const cm = list
      .map((data, index) => {
        if (data.id === cmId) return { data, index };
      })
      .pop();
    if (!cm) throw "not found";

    // CMステータス状態によるチェック
    const check = checkCmStatus(cm.data.status, "create");
    if (check) throw check;

    // 連携用のデータ追加
    const item = {
      unis_customer_cd: unisCustomerCd,
      data_process_type: "01",
      id: cmId,
      title: cm.data.title,
      description: cm.data.description,
      seconds: cm.data.seconds,
      start_date: cm.data.start_date,
      end_date: cm.data.end_date,
      production_type: cm.data.production_type,
      industry: cm.data.industry.id,
      scene: cm.data.scenes.id,
      upload_system: body.upload,
      status: "1",
      timestamp: new Date().toISOString(),
    };

    let res = await dynamodb.put(constants.centerTable, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    if (body.upload == constants.cmUploadSystem.CENTER) {
      cm.data.status = constants.cmStatus.CENTER_UPLOADING;
    } else if (body.upload == constants.cmUploadSystem.SSENCE) {
      cm.data.status = constants.cmStatus.SSENCE_UPLOADING;
    }
    cm.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${cm.index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// センター連携解除
exports.remove = async (unisCustomerCd, cmId) => {
  constants.debuglog(
    `center remove unis_customer_cd: ${unisCustomerCd}, cm_id: ${cmId}`
  );

  try {
    // CM一覧から該当CMを取得
    const list = await fetch(unisCustomerCd);
    if (!list) throw "not found";
    const cm = list
      .map((data, index) => {
        if (data.id === cmId) return { data, index };
      })
      .pop();
    if (!cm) throw "not found";

    // CMステータス状態によるチェック
    const check = checkCmStatus(cm.data.status, "remove");
    if (check) throw check;

    let uploadSystem = "";
    if (cm.data.status == constants.cmStatus.CENTER_COMPLETE) {
      uploadSystem = constants.uploadSystem.CENTER;
      cm.data.status = constants.cmStatus.CENTER_UPLOADING;
    } else if (cm.data.status == constants.cmStatus.SSENCE_COMPLETE) {
      uploadSystem = constants.uploadSystem.SSENCE;
      cm.data.status = constants.cmStatus.SSENCE_UPLOADING;
    }

    // 連携用のデータ追加
    const item = {
      unis_customer_cd: unisCustomerCd,
      data_process_type: "03",
      id: cmId,
      end_date: cm.data.end_date,
      upload_system: uploadSystem,
      status: "1",
      timestamp: new Date().toISOString(),
    };

    let res = await dynamodb.put(constants.centerTable, item, {});
    if (!res) throw "put failed";

    // DynamoDBのデータ更新
    cm.data.timestamp = new Date().toISOString();
    const key = { unis_customer_cd: unisCustomerCd };
    const options = {
      UpdateExpression: `SET cm[${cm.index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// センター連携完了
exports.complete = async (unisCustomerCd, body) => {
  constants.debuglog(
    `center complete unis_customer_cd: ${unisCustomerCd}, body: ${JSON.stringify(
      body
    )}`
  );

  try {
    // TODO: body validation check
    if (!body) throw "body parameter failed";

    // CM一覧から該当CMを取得
    const list = await fetch(unisCustomerCd);
    if (!list) throw "not found";
    const cm = list
      .map((data, index) => {
        if (data.id === body.uMesseCmId) return { data, index };
      })
      .pop();
    if (!cm) throw "not found";

    // CMステータス状態によるチェック
    const check = checkCmStatus(cm.data.status, "complete");
    if (check) throw check;

    let res = "";
    const key = { unis_customer_cd: unisCustomerCd };

    if (body.dataProcessType == "01") {
      res = await dynamodb.delete(constants.centerTable, key, {});
      if (!res) throw "delete failed";

      if (cm.data.status == constants.cmStatus.CENTER_UPLOADING) {
        cm.data.status = constants.cmStatus.CENTER_COMPLETE;
      } else if (cm.data.status == constants.cmStatus.SSENCE_UPLOADING) {
        cm.data.status = constants.cmStatus.SSENCE_COMPLETE;
      }
    } else {
      const options = {
        UpdateExpression: `SET status = :status, error_code = :errorCode, error_message = :errorMessage, timestamp = :timestamp`,
        ExpressionAttributeValues: {
          ":status": "9",
          ":errorCode": body.errorCode,
          ":errorMessage": body.errorMessage,
          ":timestamp": new Date().toISOString(),
        },
        ReturnValues: "UPDATED_NEW",
      };
      res = await dynamodb.update(constants.centerTable, key, options);
      if (!res) throw "update failed";

      if (cm.data.status == constants.cmStatus.CENTER_UPLOADING) {
        cm.data.status = constants.cmStatus.CENTER_ERROR;
      } else if (cm.data.status == constants.cmStatus.SSENCE_UPLOADING) {
        cm.data.status = constants.cmStatus.SSENCE_ERROR;
      }
    }

    // DynamoDBのデータ更新
    cm.data.timestamp = new Date().toISOString();
    const options = {
      UpdateExpression: `SET cm[${cm.index}] = :cm`,
      ExpressionAttributeValues: {
        ":cm": cm.data,
      },
      ReturnValues: "UPDATED_NEW",
    };
    constants.debuglog(
      `key: ${JSON.stringify(key)}, options: ${JSON.stringify(options)}`
    );

    res = await dynamodb.update(constants.usersTable, key, options);
    if (!res) throw "update failed";

    let json = res.Attributes.cm;
    return json;
  } catch (e) {
    // TODO: error handle
    console.log(e);
  }
};

// CMステータス状態によるチェック
function checkCmStatus(status, process) {
  let message = "";

  if (process == "create") {
    switch (status) {
      case constants.cmStatus.CREATING:
        message = "CM作成中のため、アップロードできません";
        break;
      case constants.cmStatus.COMPLETE:
        // OK
        break;
      case constants.cmStatus.CONVERT:
        message = "CMエンコード中のため、アップロードできません";
        break;
      case constants.cmStatus.SHARING:
        message = "CM共有中のため、アップロードできません";
        break;
      case constants.cmStatus.CENTER_UPLOADING:
      case constants.cmStatus.CENTER_COMPLETE:
        message = "U MUSICへ連携中のため、アップロードできません";
        break;
      case constants.cmStatus.SSENCE_UPLOADING:
      case constants.cmStatus.SSENCE_COMPLETE:
        message = "S'Senceへ連携中のため、アップロードできません";
        break;
      case constants.cmStatus.ERROR:
      case constants.cmStatus.CENTER_ERROR:
      case constants.cmStatus.SSENCE_ERROR:
        message = "エラーが発生しているため、アップロードできません";
        break;
      default:
        message = "unknown cm status";
    }
  } else if (process == "remove") {
    switch (status) {
      case constants.cmStatus.CREATING:
      case constants.cmStatus.COMPLETE:
      case constants.cmStatus.CONVERT:
      case constants.cmStatus.SHARING:
        message = "CM連携していないため、解除できません";
        break;
      case constants.cmStatus.CENTER_UPLOADING:
        message = "U MUSICへ連携中のため、解除できません";
        break;
      case constants.cmStatus.CENTER_COMPLETE:
        // OK
        break;
      case constants.cmStatus.SSENCE_UPLOADING:
        message = "S'Senceへ連携中のため、解除できません";
        break;
      case constants.cmStatus.SSENCE_COMPLETE:
        // OK
        break;
      case constants.cmStatus.ERROR:
      case constants.cmStatus.CENTER_ERROR:
      case constants.cmStatus.SSENCE_ERROR:
        message = "エラーが発生しているため、解除できません";
        break;
      default:
        message = "unknown cm status";
    }
  } else if (process == "complete") {
    switch (status) {
      case constants.cmStatus.CREATING:
      case constants.cmStatus.COMPLETE:
      case constants.cmStatus.CONVERT:
      case constants.cmStatus.SHARING:
        message = "CM連携していないため、完了できません";
        break;
      case constants.cmStatus.CENTER_UPLOADING:
        // OK
        break;
      case constants.cmStatus.CENTER_COMPLETE:
        message = "U MUSICへ連携済のため、完了できません";
        break;
      case constants.cmStatus.SSENCE_UPLOADING:
        // OK
        break;
      case constants.cmStatus.SSENCE_COMPLETE:
        message = "S'Senceへ連携済のため、完了できません";
        break;
      case constants.cmStatus.ERROR:
      case constants.cmStatus.CENTER_ERROR:
      case constants.cmStatus.SSENCE_ERROR:
        message = "エラーが発生しているため、解除できません";
        break;
      default:
        message = "unknown cm status";
    }
  } else {
    message = "unknown process";
  }
  return message;
}
