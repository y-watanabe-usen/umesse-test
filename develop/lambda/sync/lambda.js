"use strict";

const assert = require("assert");
const https = require("https");
const { constants, debuglog, errorlog } = require("umesse-lib/constants");
const {
  ERROR_CODE,
  AppError,
  InternalServerError,
} = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");

exports.handler = async (event, context) => {
  debuglog(
    `[sync] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  // lastdateの取得
  let lastdate = targetDate(60 * 60);
  if (process.env.lastdate) lastdate = process.env.lastdate;
  debuglog(`Start Sync: ${lastdate} -----`);

  // UDS API リクエスト
  let serviceCd;
  for (serviceCd of constants.targetServiceCd) {
    debuglog(`get customer data at UDS-API. serviceCd: ${serviceCd}`);

    let ret;
    try {
      ret = await requestUdsApi(serviceCd, lastdate);
    } catch (e) {
      errorlog(JSON.stringify(e));
      return errorResponse(new InternalServerError(ERROR_CODE.E0000500));
    }
    debuglog(JSON.stringify(ret));
    if (!ret || ret.count == 0) continue;

    for (const contract of ret.contracts) {
      const key = { unisCustomerCd: contract.unis_customer_cd };
      let user;
      try {
        user = await dynamodbManager.get(
          constants.dynamoDbTable().users,
          key,
          {}
        );
      } catch (e) {
        errorlog(JSON.stringify(e));
        return errorResponse(new InternalServerError(ERROR_CODE.E0000500));
      }
      debuglog(JSON.stringify(user));

      let options = {
        UpdateExpression: `SET 
          contractCd = :contractCd,
          serviceCd = :serviceCd,
          serviceName = :serviceName,
          customerName = :customerName,
          customerNameKana = :customerNameKana,
          customerGroupCd = :customerGroupCd,
          customerGroupName = :customerGroupName,
          contractStatusCd = :contractStatusCd,
          contractStatusName = :contractStatusName,
          createDate = :createDate,
          renewalDate = :renewalDate`,
        ExpressionAttributeValues: {
          ":contractCd": contract.contract_cd,
          ":serviceCd": contract.service_cd,
          ":serviceName": contract.service_name,
          ":customerName": contract.customer_name,
          ":customerNameKana": contract.customer_name_kana,
          ":customerGroupCd": contract.customer_group_cd,
          ":customerGroupName": contract.customer_group_name,
          ":contractStatusCd": contract.contract_status_cd,
          ":contractStatusName": contract.contract_status_name,
          ":createDate": contract.create_date,
          ":renewalDate": contract.renewal_date,
        },
        ReturnValues: "UPDATED_NEW",
      };

      if (!user.Item) {
        options.UpdateExpression += `, cm = :cm, recording = :recording, tts = :tts`;
        options.ExpressionAttributeValues[":cm"] = [];
        options.ExpressionAttributeValues[":recording"] = [];
        options.ExpressionAttributeValues[":tts"] = [];
      }

      debuglog(JSON.stringify({ key: key, options: options }));

      // DynamoDbデータ登録
      try {
        ret = await dynamodbManager.update(
          constants.dynamoDbTable().users,
          key,
          options
        );
      } catch (e) {
        errorlog(JSON.stringify(e));
        return errorResponse(new InternalServerError(ERROR_CODE.E0000500));
      }
    }
  }

  return { code: "200", message: "complete" };
};

// UDSリクエスト
function requestUdsApi(serviceCd, lastdate) {
  return new Promise(function (resolve, reject) {
    const options = {
      host: constants.udsApiConfig().host,
      path: `${constants.udsApiConfig().path}/${serviceCd}/${lastdate}`,
      port: 443,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": constants.udsApiConfig().key,
      },
    };
    debuglog(JSON.stringify({ options: options }));

    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        if (response.statusCode == 200) {
          resolve(JSON.parse(data));
        } else {
          reject(`${response.statusMessage}: ${data}`);
        }
      });
      response.on("error", (error) => {
        reject(error);
      });
    });
    request.end();
  });
}

function targetDate(interval) {
  const target = new Date().getTime() - interval;
  const time = new Date(target);
  time.setHours(time.getHours() + 9);
  return time.toISOString();
}

function errorResponse(e) {
  assert(e instanceof AppError);
  return {
    code: e.statusCode,
    message: e.message,
  };
}
