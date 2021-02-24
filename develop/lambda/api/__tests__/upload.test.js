"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getUploadCm } = require("../umesse/upload");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");

// test data
const json = require("./data/upload.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-external"][0].PutRequest.Item
);

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 外部連携CMデータ取得
describe("外部連携CMデータ", () => {
  test("[success] 外部連携CMデータ取得", async () => {
    const response = await getUploadCm(data.unisCustomerCd, data.cmId);
    expect(response).toEqual(data);
  });

  test("[success] 外部連携CMデータ一覧取得", async () => {
    const response = await getUploadCm(data.unisCustomerCd);
    expect(response).toEqual([data]);
  });

  test("[error] 外部連携CMデータ取得　データ存在しない", async () => {
    await expect(getUploadCm("999999999")).rejects.toThrow(
      new InternalServerError("not found")
    );
  });

  test("[error] 外部連携CMデータ取得　パラメータなし", async () => {
    await expect(getUploadCm("")).rejects.toThrow(
      new BadRequestError("params failed")
    );
  });
});

// FIXME: error test
