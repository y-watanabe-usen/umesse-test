"use strict";

const assert = require("assert");
const fs = require("fs");
const https = require("https");
const { constants, debuglog, errorlog } = require("umesse-lib/constants");
const {
  ERROR_CODE,
  AppError,
  InternalServerError,
} = require("umesse-lib/error");
const { dynamodbManager } = require("umesse-lib/utils/dynamodbManager");
const file = "./lastdate";

exports.handler = async (event, context) => {
  debuglog(
    `[sync] ${JSON.stringify({
      event: event,
      context: context,
    })}`
  );

  // lastdateの取得
  let lastdate;
  try {
    lastdate = fs.readFileSync(file);
    if (!lastdate || lastdate == "") throw _;
  } catch (e) {
    lastdate = targetDate(60 * 60);
  }

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
    if (!ret || ret.count == 0) return { code: "200", message: "data noting" };

    // DynamoDbデータ更新
    const contracts = ret.contracts;
    const key = { unisCustomerCd: contracts.unisCustomerCd };
    const options = {
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
        ":contractCd": contracts.contractCd,
        ":serviceCd": contracts.serviceCd,
        ":serviceName": contracts.serviceName,
        ":customerName": contracts.customerName,
        ":customerNameKana": contracts.customerNameKana,
        ":customerGroupCd": contracts.customerGroupCd,
        ":customerGroupName": contracts.customerGroupName,
        ":contractStatusCd": contracts.contractStatusCd,
        ":contractStatusName": contracts.contractStatusName,
        ":createDate": contracts.createDate,
        ":renewalDate": contracts.renewalDate,
      },
      ReturnValues: "UPDATED_NEW",
    };
    debuglog(JSON.stringify({ key: key, options: options }));
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

  fs.writeFileSync(file, targetDate(0));
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
      let data;
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
  //UDS側が+9:00するので、UTCで渡す
  return time.toISOString();
}

function errorResponse(e) {
  assert(e instanceof AppError);
  return {
    code: e.statusCode,
    message: e.message,
  };
}
