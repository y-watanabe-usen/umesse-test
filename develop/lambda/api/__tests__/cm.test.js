"use strict";

process.env.environment = "local";

const aws = require("aws-sdk");
const {
  ERROR_CODE,
  BadRequestError,
  NotFoundError,
} = require("umesse-lib/error");
const { getCm, createCm, updateCm, deleteCm } = require("../umesse/cm");

// test data
const json = require("./data/cm.test.json");
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

// CMデータ取得
describe("CMデータ取得", () => {
  test("[success] CMデータ取得", async () => {
    await expect(getCm(data.unisCustomerCd, data.cm[0].id)).resolves.toEqual(
      data.cm[0]
    );
  });

  test("[success] CMデータ一覧取得", async () => {
    await expect(getCm(data.unisCustomerCd)).resolves.toEqual(data.cm);
  });

  test("[error] CMデータ取得　CMデータ存在しない", async () => {
    await expect(getCm("999999999")).rejects.toThrow(
      new NotFoundError(ERROR_CODE.E0000404)
    );

    await expect(
      getCm(data.unisCustomerCd, "020000000-c-00000000")
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] CMデータ取得　パラメータチェック", async () => {
    await expect(getCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(getCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getCm("1111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getCm("11111111111")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(getCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );

    await expect(getCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );
  });
});

// CM新規作成
describe("CM新規作成", () => {
  test("[success] CM新規作成", async () => {
    const body = {
      materials: {
        narrations: [{ id: "サンプル03", category: "narration", volume: 300 }],
        startChime: { id: "サンプル01", category: "chime", volume: 50 },
        endChime: { id: "サンプル02", category: "chime", volume: 50 },
      },
    };
    await expect(createCm(data.unisCustomerCd, body)).resolves.toEqual({
      id: expect.stringMatching(`^${data.unisCustomerCd}-c-[0-9a-z]{8}$`),
      category: "cm",
      seconds: expect.anything(),
      productionType: "02",
      status: "01",
      ...body,
      url: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("[error] CM新規作成　パラメータチェック", async () => {
    await expect(createCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createCm("1111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createCm("11111111111")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(createCm("9999999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(createCm("9999999999", { materials: {} })).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [],
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001240} (E0001240)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [{ id: "サンプル01", category: "test", volume: 300 }],
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: "010" },
          ],
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001250} (E0001250)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          startChime: { id: "サンプル01", category: "test", volume: 50 },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          startChime: { id: "サンプル01", category: "chime", volume: "010" },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001250} (E0001250)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          endChime: { id: "サンプル01", category: "test", volume: 50 },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          endChime: { id: "サンプル01", category: "chime", volume: "010" },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001250} (E0001250)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          bgm: { id: "サンプル01", category: "test", volume: 50 },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001030} (E0001030)`));

    await expect(
      createCm("9999999999", {
        materials: {
          narrations: [
            { id: "サンプル01", category: "narration", volume: 300 },
          ],
          bgm: { id: "サンプル01", category: "bgm", volume: "010" },
        },
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001250} (E0001250)`));
  });
});

// CMデータ更新
describe("CMデータ更新", () => {
  test("[success] CMデータ更新　タイトル/説明文", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
    };
    await expect(
      updateCm(data.unisCustomerCd, data.cm[1].id, body)
    ).resolves.toEqual({
      ...data.cm[1],
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("[success] CMデータ更新　コンバート", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
      startDate: "2019-09-01T09:00:00+9:00",
      endDate: "9999-12-31T23:59:59+09:00",
      industry: {
        industryCd: "01",
        industryName: "業種名",
      },
      scene: {
        sceneCd: "01",
        sceneName: "シーン01",
      },
    };
    await expect(
      updateCm(data.unisCustomerCd, data.cm[2].id, body)
    ).resolves.toEqual({
      ...data.cm[2],
      ...body,
      status: "03",
      timestamp: expect.anything(),
    });
  });

  test("[success] CMデータ更新　コンバート＋外部連携", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
      startDate: "2019-09-01T09:00:00+9:00",
      endDate: "9999-12-31T23:59:59+09:00",
      industry: {
        industryCd: "01",
        industryName: "業種名",
      },
      scene: {
        sceneCd: "01",
        sceneName: "シーン01",
      },
      uploadSystem: "01",
    };
    await expect(
      updateCm(data.unisCustomerCd, data.cm[3].id, body)
    ).resolves.toEqual({
      ...data.cm[3],
      ...body,
      status: "03",
      timestamp: expect.anything(),
    });
  });

  test("[error] CMデータ更新　CMデータ存在しない", async () => {
    await expect(
      updateCm(data.unisCustomerCd, "020000000-c-00000000", {
        title: "テスト",
        description: "テスト",
      })
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] CMデータ更新　パラメータチェック", async () => {
    await expect(updateCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(updateCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      updateCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(updateCm("1111", "9999999999-c-99999999")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      updateCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(updateCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001210} (E0001210)`,
        ].join("\n")
      )
    );

    await expect(updateCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001210} (E0001210)`,
        ].join("\n")
      )
    );

    await expect(
      updateCm("9999999999", "9999999999-c-99999999", {
        title: "テスト",
        description: "テスト",
        uploadSystem: "aa",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001130} (E0001130)`));

    await expect(
      updateCm("9999999999", "9999999999-c-99999999", {
        title: "テスト",
        description: "テスト",
        uploadSystem: "00",
      })
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001130} (E0001130)`));
  });
});

// CMデータ削除
describe("CMデータ削除", () => {
  test("[success] CMデータ削除", async () => {
    await expect(deleteCm(data.unisCustomerCd, data.cm[1].id)).resolves.toEqual(
      {
        ...data.cm[1],
        title: "テスト",
        description: "テスト",
        status: "00",
        timestamp: expect.anything(),
      }
    );
  });

  test("[error] CMデータ削除　CMデータ存在しない", async () => {
    await expect(
      deleteCm(data.unisCustomerCd, "020000000-c-00000000")
    ).rejects.toThrow(new NotFoundError(ERROR_CODE.E0000404));
  });

  test("[error] CMデータ削除　パラメータチェック", async () => {
    await expect(deleteCm()).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001001} (E0001001)`)
    );

    await expect(deleteCm("aaaaaaaaaa")).rejects.toThrow(
      new BadRequestError(
        [
          `${ERROR_CODE.E0001001} (E0001001)`,
          `${ERROR_CODE.E0001010} (E0001010)`,
        ].join("\n")
      )
    );

    await expect(
      deleteCm("aaaaaaaaaa", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(deleteCm("1111", "9999999999-c-99999999")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`)
    );

    await expect(
      deleteCm("11111111111", "9999999999-c-99999999")
    ).rejects.toThrow(new BadRequestError(`${ERROR_CODE.E0001010} (E0001010)`));

    await expect(deleteCm("9999999999", "aaaa")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );

    await expect(deleteCm("9999999999", "9999999999-c")).rejects.toThrow(
      new BadRequestError(`${ERROR_CODE.E0001210} (E0001210)`)
    );
  });
});
