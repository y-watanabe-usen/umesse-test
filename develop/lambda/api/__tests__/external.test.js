"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const { getExternalCm, completeExternalCm } = require("../umesse/external");

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
          url: expect.anything(),
        },
      ],
    },
  ],
};

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 外部連携CMデータ取得
describe("外部連携CMデータ", () => {
  test("[success] 外部連携CMデータ取得", async () => {
    await expect(getExternalCm("", "center")).resolves.toEqual(data);
  });

  test("[error] 外部連携CMデータ取得　データ存在しない", async () => {
    await expect(getExternalCm("", "ssence")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );
  });

  test("[error] 外部連携CMデータ取得　パラメータチェック", async () => {
    await expect(getExternalCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getExternalCm("999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getExternalCm("aaaaaaaaaa", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("1111", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("11111111111", "center")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getExternalCm("", "aenter")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001170} (E0001170)`)
    );

    await expect(getExternalCm("", "asence")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001170} (E0001170)`)
    );
  });
});

// 外部連携CMデータ連携完了
describe("外部連携CMデータ連携完了", () => {
  test("[success] 外部連携CMデータ連携完了", async () => {
    const data = {
      dataProcessType: "01",
      cmId: "060000000-c-00000001",
    };
    await expect(
      completeExternalCm("060000000", "center", data)
    ).resolves.toEqual(data);
  });

  test("[error] 外部連携CMデータ連携完了　データ存在しない", async () => {
    await expect(
      completeExternalCm("999999999", "ssence", {
        dataProcessType: "01",
        cmId: "999999999-c-12345678",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));

    await expect(
      completeExternalCm("060000000", "ssence", {
        dataProcessType: "01",
        cmId: "060000001-c-00000001",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));

    await expect(
      completeExternalCm("060000001", "center", {
        dataProcessType: "01",
        cmId: "060000001-c-00000001",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));

    await expect(
      completeExternalCm("060000002", "center", {
        dataProcessType: "01",
        cmId: "060000002-c-00000001",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 外部連携CMデータ連携完了　パラメータチェック", async () => {
    await expect(completeExternalCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(completeExternalCm("999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(completeExternalCm("aaaaaaaaaa", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("1111", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("11111111111", "center")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("999999999", "aenter")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001170} (E0001170)`,
        ].join("\n")
      )
    );

    await expect(completeExternalCm("999999999", "asence")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001170} (E0001170)`,
        ].join("\n")
      )
    );

    await expect(
      completeExternalCm("999999999", "center", {
        dataProcessType: "00",
        cmId: "9999999999-c-99999999",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001180} (E0001180)`));

    await expect(
      completeExternalCm("999999999", "center", {
        dataProcessType: "01",
        cmId: "9999999999-c",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`));
  });
});
