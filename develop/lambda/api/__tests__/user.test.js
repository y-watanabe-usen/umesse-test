"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getUser } = require("../umesse/user");

// test data
const json = require("./data/user.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// ユーザーデータ取得
describe("ユーザーデータ取得", () => {
  test("[success] ユーザーデータ取得", async () => {
    const response = await getUser(data.unisCustomerCd);
    expect(response).toEqual(data);
  });

  test("[error] ユーザーデータ取得　顧客データ存在しない", async () => {
    const response = await getUser("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("[error] ユーザーデータ取得　パラメータなし", async () => {
    const response = await getUser("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// FIXME: error test
