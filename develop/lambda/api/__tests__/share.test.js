"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getShareCm } = require("../umesse/share");

// test data
const json = require("./data/share.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 共有CMデータ取得
describe("共有CMデータ取得", () => {
  test("[success] 共有CMデータ取得", async () => {
    const response = await getShareCm(data.unisCustomerCd, data.cm[0].id);
    expect(response).toEqual(data.cm[0]);
  });

  test("[success] 共有CMデータ一覧取得", async () => {
    const response = await getShareCm(data.unisCustomerCd);
    expect(response).toEqual([data.cm[0]]);
  });

  test("[error] 共有CMデータ取得　データ存在しない", async () => {
    const response = await getShareCm("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] 共有CMデータ取得　パラメータなし", async () => {
    const response = await getShareCm("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// FIXME: error test
