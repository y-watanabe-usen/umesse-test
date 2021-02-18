"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getShareCm } = require("../umesse/share");
const {BadRequestError, InternalServerError} = require("../umesse/error");

// test data
const json = require("./data/share.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 共有CMデータ取得
describe("共有CMデータ取得", () => {
  test("[success] 共有CMデータ取得", async () => {
    const response = await getShareCm(data.unisCustomerCd, data.cm[0].cmId);
    expect(response).toEqual(data.cm[0]);
  });

  test("[success] 共有CMデータ一覧取得", async () => {
    const response = await getShareCm(data.unisCustomerCd);
    expect(response).toEqual([data.cm[0]]);
  });

  test("[error] 共有CMデータ取得　データ存在しない", async () => {
    await expect(getShareCm("999999999")).rejects.toThrow(new InternalServerError("not found"));
  });

  test("[error] 共有CMデータ取得　パラメータなし", async () => {
    await expect(getShareCm("")).rejects.toThrow(new BadRequestError("params failed"));
  });
});

// FIXME: error test
