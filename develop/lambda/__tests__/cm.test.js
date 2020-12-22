"use strict";

// process.env.debug = true;
process.env.environment = "local";

const { getCm, createCm, updateCm, deleteCm } = require("../umesse/cm");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("cm", () => {
  test("getCm success", async () => {
    const response = await getCm(unisCustomerCd, data.id);
    expect(response).toEqual(data);
  });

  test("getCm list success", async () => {
    const response = await getCm(unisCustomerCd);
    expect(response).toEqual([data]);
  });

  test("getCm not found", async () => {
    const response = await getCm("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("getCm not params", async () => {
    const response = await getCm("");
    expect(response).toEqual({ message: "params failed" });
  });

  test("createCm success", async () => {
    const body = {
      materials: {
        narrations: [{ id: "narration/サンプル01", volume: 150 }],
        startChime: { id: "chime/サンプル01", volume: 50 },
        endChime: { id: "chime/サンプル02", volume: 50 },
      },
    };
    const response = await createCm(unisCustomerCd, body);
    expect(response).toEqual({
      id: expect.stringMatching(`^${unisCustomerCd}-c-[0-9a-z]{8}$`),
      seconds: expect.anything(),
      productionType: "02",
      status: "01",
      ...body,
      url: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("updateCm success", async () => {
    const body = {
      title: "テスト",
      description: "テスト",
    };
    const response = await updateCm(unisCustomerCd, data.id, body);
    expect(response).toEqual({
      ...data,
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("deleteCm success", async () => {
    const response = await deleteCm(unisCustomerCd, data.id);
    expect(response).toEqual({
      ...data,
      title: "テスト",
      description: "テスト",
      status: "00",
      timestamp: expect.anything(),
    });
  });
});

// FIXME: error test

// test data
const unisCustomerCd = "020000000";
const data = {
  id: "020000000-c-00000001",
  title: "CMテスト01",
  description: "CMテスト01",
  seconds: 60,
  startDate: "2019-09-01T09:00:00+9:00",
  endDate: "9999-12-31T23:59:59+09:00",
  productionType: "01",
  industry: [
    {
      id: "01",
      name: "業種01",
    },
  ],
  scene: [
    {
      id: "01",
      name: "シーン01",
    },
  ],
  materials: {
    narrations: [
      {
        id: "narration/サンプル01",
        volume: 150,
      },
    ],
    startChime: {
      id: "chime/サンプル01",
      volume: 50,
    },
    endChime: {
      id: "chime/サンプル02",
      volume: 50,
    },
    bgm: {
      id: "bgm/サンプル01",
      volume: 50,
    },
  },
  status: "02",
  timestamp: "2019-09-01T09:00:00+9:00",
};
