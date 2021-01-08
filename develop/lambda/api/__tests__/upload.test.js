"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getUploadCm } = require("../umesse/upload");

// test data
const json = require("./data/upload.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-external"][0].PutRequest.Item
);

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
    const response = await getUploadCm("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] 外部連携CMデータ取得　パラメータなし", async () => {
    const response = await getUploadCm("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// FIXME: error test
