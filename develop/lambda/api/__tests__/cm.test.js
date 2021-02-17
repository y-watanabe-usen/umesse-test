"use strict";

// process.env.debug = true;
process.env.environment = "local";

const aws = require("aws-sdk");
const { getCm, createCm, updateCm, deleteCm } = require("../umesse/cm");

// test data
const json = require("./data/cm.test.json");
const data = aws.DynamoDB.Converter.unmarshall(
  json["umesse-users"][0].PutRequest.Item
);
const { BadRequestError, InternalServerError } = require("../umesse/error");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// CMデータ取得
describe("CMデータ取得", () => {
  test("[success] CMデータ取得", async () => {
    const response = await getCm(data.unisCustomerCd, data.cm[0].cmId);
    expect(response).toEqual(data.cm[0]);
  });

  test("[success] CMデータ一覧取得", async () => {
    const response = await getCm(data.unisCustomerCd);
    expect(response).toEqual(data.cm);
  });

  test("[error] CMデータ取得　CMデータ存在しない", async () => {
    await expect(getCm(data.unisCustomerCd, "99999999")).rejects.toThrow(new InternalServerError("not found"));
  });

  test("[error] CMデータ取得　パラメータなし", async () => {
    await expect(getCm("")).rejects.toThrow(new BadRequestError("params failed"));
  });
});

// CM新規作成
describe("CM新規作成", () => {
  test("[success] CM新規作成", async () => {
    const body = {
      materials: {
        narrations: [{ contentsId: "サンプル03", volume: 300 }],
        startChime: { contentsId: "サンプル01", volume: 50 },
        endChime: { contentsId: "サンプル02", volume: 50 },
      },
    };
    const response = await createCm(data.unisCustomerCd, body);
    expect(response).toEqual({
      cmId: expect.stringMatching(`^${data.unisCustomerCd}-c-[0-9a-z]{8}$`),
      seconds: expect.anything(),
      productionType: "02",
      status: "01",
      ...body,
      url: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("[error] CM新規作成　パラメータなし", async () => {
    await expect(createCm("")).rejects.toThrow(new BadRequestError("params failed"));
  });
});

// CMデータ更新
describe("CMデータ更新", () => {
  test("[success] CMデータ更新　タイトル/説明文", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
    };
    const response = await updateCm(data.unisCustomerCd, data.cm[1].cmId, body);
    expect(response).toEqual({
      ...data.cm[1],
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("[error] CMデータ更新　CMデータ存在しない", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
    };
    await expect(updateCm(data.unisCustomerCd, "999999999", body)).rejects.toThrow(new InternalServerError("not found"));
  });

  test("[error] CMデータ更新　パラメータなし", async () => {
    await expect(updateCm("")).rejects.toThrow(new BadRequestError("params failed"));
  });
});

// CMデータ削除
describe("CMデータ削除", () => {
  test("[success] CMデータ削除", async () => {
    const response = await deleteCm(data.unisCustomerCd, data.cm[1].cmId);
    expect(response).toEqual({
      ...data.cm[1],
      title: "テスト",
      description: "テスト",
      status: "00",
      timestamp: expect.anything(),
    });
  });

  test("[error] CMデータ削除　CMデータ存在しない", async () => {
    await expect(deleteCm(data.unisCustomerCd, "999999999")).rejects.toThrow(new InternalServerError("not found"));
  });

  test("[error] CMデータ削除　パラメータなし", async () => {
    await expect(deleteCm("")).rejects.toThrow(new BadRequestError("params failed"));
  });
});

// FIXME: error test
