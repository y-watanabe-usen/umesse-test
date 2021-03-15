"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const { getShareCm, createShareCm, deleteShareCm } = require("../umesse/share");

// test data
const json = require("./data/share.test.json");
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

console.error = jest.fn();
beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// 共有CMデータ取得
describe("共有CMデータ取得", () => {
  test("[success] 共有CMデータ取得", async () => {
    await expect(
      getShareCm(data.unisCustomerCd, data.cm[0].id)
    ).resolves.toEqual(data.cm[0]);
  });

  test("[success] 共有CMデータ一覧取得", async () => {
    await expect(getShareCm(data.unisCustomerCd)).resolves.toEqual([
      data.cm[0],
    ]);
  });

  test("[error] 共有CMデータ取得　データ存在しない", async () => {
    await expect(getShareCm("999999999")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );
  });

  test("[error] 共有CMデータ取得　パラメータチェック", async () => {
    await expect(getShareCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getShareCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getShareCm("1111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getShareCm("11111111111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getShareCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );

    await expect(getShareCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );
  });
});

// 共有CMデータ追加
describe("共有CMデータ追加", () => {
  test("[success] 共有CMデータ追加", async () => {
    await expect(
      createShareCm(data.unisCustomerCd, data.cm[1].id)
    ).resolves.toEqual({
      ...data.cm[1],
      status: "04",
      timestamp: expect.anything(),
    });
  });

  test("[error] 共有CMデータ追加　データ存在しない", async () => {
    await expect(
      createShareCm(data.unisCustomerCd, data.cm[0].id)
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 共有CMデータ追加　パラメータチェック", async () => {
    await expect(createShareCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createShareCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createShareCm("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createShareCm("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      createShareCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      createShareCm("1111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      createShareCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(createShareCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );

    await expect(createShareCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );
  });
});

// 共有CMデータ解除
describe("共有CMデータ解除", () => {
  test("[success] 共有CMデータ解除", async () => {
    await expect(
      deleteShareCm(data.unisCustomerCd, data.cm[1].id)
    ).resolves.toEqual({
      ...data.cm[1],
      status: "02",
      timestamp: expect.anything(),
    });
  });

  test("[error] 共有CMデータ解除　データ存在しない", async () => {
    await expect(
      deleteShareCm(data.unisCustomerCd, data.cm[1].id)
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] 共有CMデータ解除　パラメータチェック", async () => {
    await expect(deleteShareCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(deleteShareCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteShareCm("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(deleteShareCm("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      deleteShareCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      deleteShareCm("1111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(
      deleteShareCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(deleteShareCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );

    await expect(deleteShareCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001020} (E0001020)`)
    );
  });
});
