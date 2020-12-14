"use strict";

process.env.AWS_ACCESS_KEY_ID = "local";
process.env.AWS_SECRET_ACCESS_KEY = "local";
process.env.debug = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// TODO: mock
const dynamodb = require("../umesse/utils/dynamodbController").controller;
const s3 = require("../umesse/utils/s3Controller").controller;
const {
  getCm,
  createCm,
  updateCm,
  deleteCm,
  linkCm,
  unlinkCm,
} = require("../umesse/cm");

beforeAll(() => {
  jest.setTimeout(30000);
});

const unisCustomerCd = "123456789";
const defaultCm = {
  id: "123456789-c-12345678",
  title: "サンプル",
  description: "サンプル",
  seconds: 540,
  start_date: "2019-09-01T09:00:00+9:00",
  end_date: "9999-12-31T23:59:59+09:00",
  production_type: "01",
  industry: [{ id: "01", name: "全業種" }],
  scenes: [{ id: "01", name: "全シーン" }],
  status: "02",
  materials: {
    narrations: [
      { id: "narration/サンプル01", volume: 150 },
      { id: "narration/サンプル02", volume: 150 },
      { id: "narration/サンプル03", volume: 150 },
    ],
    start_chime: { id: "chime/サンプル01", volume: 50 },
    end_chime: { id: "chime/サンプル02", volume: 50 },
    bgm: { id: "bgm/サンプル01", volume: 50 },
  },
  timestamp: "2019-09-01T09:00:00+9:00",
};

// TODO: draft
describe("cm", () => {
  test("getCm", async () => {
    const response = await getCm(unisCustomerCd);
    console.log(response);
    expect(response).toEqual([defaultCm]);
  });

  test("getCm", async () => {
    const response = await getCm(unisCustomerCd, defaultCm.id);
    console.log(response);
    expect(response).toEqual(defaultCm);
  });

  test("createCm", async () => {
    const body = {
      materials: {
        narrations: [{ id: "narration/サンプル01", volume: 150 }],
        startChime: { id: "chime/サンプル01", volume: 50 },
        endChime: { id: "chime/サンプル02", volume: 50 },
        bgm: { id: "bgm/サンプル01", volume: 50 },
      },
    };
    const response = await createCm(unisCustomerCd, body);
    console.log(response);
    expect(response).toEqual({
      id: expect.stringMatching(`^${unisCustomerCd}-c-[0-9a-z]{8}$`),
      seconds: expect.anything(),
      production_type: "01",
      status: "01",
      ...body,
      url: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("updateCm", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
    };
    const response = await updateCm(unisCustomerCd, defaultCm.id, body);
    console.log(response);
    expect(response).toEqual({
      ...defaultCm,
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("deleteCm", async () => {
    const response = await deleteCm(unisCustomerCd, defaultCm.id);
    console.log(response);
    expect(response).toEqual({
      ...defaultCm,
      title: "テスト",
      description: "テスト",
      status: "00",
      timestamp: expect.anything(),
    });
  });
});
// FIXME: error
