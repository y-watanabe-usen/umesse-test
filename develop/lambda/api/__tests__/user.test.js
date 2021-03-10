"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const { getUser } = require("../src/service/UserService");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");

// test data
const json = require("./data/user.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// ユーザーデータ取得
describe("ユーザーデータ", () => {
  test("[success] ユーザーデータ取得", async () => {
    const response = await getUser(data.unisCustomerCd);
    expect(response).toEqual(data);
  });

  test("[error] ユーザーデータ取得　データ存在しない", async () => {
    await expect(getUser("999999999")).rejects.toThrow(
      new InternalServerError("not found")
    );
  });

  test("[error] ユーザーデータ取得　パラメータなし", async () => {
    await expect(getUser("")).rejects.toThrow(
      new BadRequestError("params failed")
    );
  });
});

// FIXME: error test
