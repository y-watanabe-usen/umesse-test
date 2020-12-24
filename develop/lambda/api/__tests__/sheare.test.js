"use strict";

// process.env.debug = true;
process.env.environment = "local";

const { getShareCm } = require("../umesse/share");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("share", () => {
  test("getShareCm success", async () => {
    const response = await getShareCm("040000000", data.id);
    expect(response).toEqual(data);
  });

  test("getShareCm not found", async () => {
    const response = await getShareCm("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("getShareCm not params", async () => {
    const response = await getShareCm("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// FIXME: error test

// test data
const data = {
  id: "040000000-c-00000001",
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
  status: "04",
  timestamp: "2019-09-01T09:00:00+9:00",
};
