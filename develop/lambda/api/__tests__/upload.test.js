"use strict";

process.env.environment = "localstack";

const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const {
  getUploadCm,
  createUploadCm,
  deleteUploadCm,
} = require("../umesse/upload");

// test data
const json = require("./data/upload.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
data.cm.map((item) => {
  if (item.id) return item;
  item.id = item.cmId;
  delete item.cmId;
  item.category = "cm";
  return item;
});

console.warn = jest.fn();
console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 外部連携CMデータ取得
describe("外部連携CMデータ", () => {
  test("[success] 外部連携CMデータ取得", async () => {
    await expect(
      getUploadCm(data.unisCustomerCd, data.cm[0].id)
    ).resolves.toEqual(data.cm[0]);
  });

  test("[success] 外部連携CMデータ一覧取得", async () => {
    await expect(getUploadCm(data.unisCustomerCd)).resolves.toEqual([
      data.cm[0],
      data.cm[2],
    ]);
  });

  test("[error] 外部連携CMデータ取得　データ存在しない", async () => {
    await expect(getUploadCm("999999999")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );
  });

  test("[error] 外部連携CMデータ取得　パラメータチェック", async () => {
    await expect(getUploadCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getUploadCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getUploadCm("1111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getUploadCm("11111111111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getUploadCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );

    await expect(getUploadCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );
  });
});

// 外部連携CMデータ追加
describe("外部連携CMデータ追加", () => {
  // test("[success] 外部連携CMデータ追加", async () => {
  //   await expect(
  //     createUploadCm(data.unisCustomerCd, data.cm[1].id, { uploadSystem: "01" })
  //   ).resolves.toEqual({
  //     ...data.cm[1],
  //     uploadSystem: "01",
  //     status: "11",
  //     timestamp: expect.anything(),
  //   });
  // });

  test("[error] 外部連携CMデータ追加　重複", async () => {
    await expect(
      createUploadCm(data.unisCustomerCd, data.cm[1].id, { uploadSystem: "01" })
    ).rejects.toThrow(new BadRequestError(ERROR_CODE.E0400010));
  });

  test("[error] 外部連携CMデータ追加　データ存在しない", async () => {
    await expect(
      createUploadCm("999999999", "123456789-c-12345678", {
        uploadSystem: "01",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 外部連携CMデータ追加　パラメータチェック", async () => {
    await expect(createUploadCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createUploadCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createUploadCm("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createUploadCm("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      createUploadCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      createUploadCm("1111", "9999999999-c-99999999")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      createUploadCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createUploadCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001210} (E0001210)`,
        ].join("\n")
      )
    );

    await expect(createUploadCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001210} (E0001210)`,
        ].join("\n")
      )
    );
  });
});

// 外部連携CMデータ解除
describe("外部連携CMデータ解除", () => {
  // test("[success] 外部連携CMデータ解除", async () => {
  //   await expect(
  //     deleteUploadCm(data.unisCustomerCd, data.cm[2].id)
  //   ).resolves.toEqual({
  //     ...data.cm[2],
  //     status: "11",
  //     timestamp: expect.anything(),
  //   });
  // });

  test("[error] 外部連携CMデータ解除　データ存在しない", async () => {
    await expect(
      deleteUploadCm("999999999", "030000000-c-00000002")
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 外部連携CMデータ解除　パラメータチェック", async () => {
    await expect(deleteUploadCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(deleteUploadCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteUploadCm("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteUploadCm("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      deleteUploadCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      deleteUploadCm("1111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      deleteUploadCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(deleteUploadCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );

    await expect(deleteUploadCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );
  });
});
