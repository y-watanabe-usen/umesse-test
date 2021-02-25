"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getExternalCm } = require("../umesse/external");
const { BadRequestError, InternalServerError } = require("umesse-lib/error");

// test data
const data = {
  unisCustomers: [
    {
      unisCustomerCd: "060000002",
      cmMetas: [
        {
          dataProcessType: "02",
          cmId: "060000002-c-00000001",
          cmName: "時報A",
          cmCommentManuscript: "テストCMです",
        },
      ],
    },
    {
      unisCustomerCd: "060000000",
      cmMetas: [
        {
          dataProcessType: "01",
          cmId: "060000000-c-00000001",
          cmName: "時報A",
          cmCommentManuscript: "テストCMです",
          startDatetime: "2020-01-01T12:34:56+09:00",
          endDatetime: "9999-12-31T23:59:59+09:00",
          productionType: "01",
          contentTime: 60,
          sceneCd: "01",
        },
      ],
    },
  ],
};

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 外部連携CMデータ取得
describe("外部連携CMデータ", () => {
  test("[success] 外部連携CMデータ取得", async () => {
    const response = await getExternalCm(data.unisCustomerCd, "center");
    expect(response).toEqual(data);
  });

  test("[error] 外部連携CMデータ取得　データ存在しない", async () => {
    await expect(getExternalCm("", "ssence")).rejects.toThrow(
      new InternalServerError("not found")
    );
  });

  test("[error] 外部連携CMデータ取得　パラメータなし", async () => {
    await expect(getExternalCm("")).rejects.toThrow(
      new BadRequestError("params failed")
    );
  });
});

// FIXME: error test
