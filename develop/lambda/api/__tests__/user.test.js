"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const { getUser } = require("../umesse/user");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");

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
    await expect(getUser(data.unisCustomerCd)).resolves.toEqual(data);
  });

  test("[error] ユーザーデータ取得　データ存在しない", async () => {
    await expect(getUser("999999999")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );
  });

  test("[error] ユーザーデータ取得　パラメータチェック", async () => {
    await expect(getUser()).rejects.toThrow(
      new BadRequestError(ERROR_CODE.E0001001)
    );
    await expect(getUser("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(ERROR_CODE.E0001002)
    );
    await expect(getUser("1111")).rejects.toThrow(
      new BadRequestError(ERROR_CODE.E0001003)
    );
    await expect(getUser("11111111111")).rejects.toThrow(
      new BadRequestError(ERROR_CODE.E0001003)
    );
  });
});
