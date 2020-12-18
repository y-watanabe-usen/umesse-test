"use strict";

process.env.debug = false;
process.env.environment = "local";
// TODO: mock
const isMock = true;

const { getShareCm } = require("../umesse/share");

const data = {
  id: "123456789-c-12345678",
  title: "サンプル",
  description: "サンプル",
  seconds: 540,
  startDate: "2019-09-01T09:00:00+9:00",
  endDate: "9999-12-31T23:59:59+09:00",
  productionType: "01",
  industry: [{ id: "01", name: "全業種" }],
  scene: [{ id: "01", name: "全シーン" }],
  status: "04",
  materials: {
    narrations: [
      { id: "narration/サンプル01", volume: 150 },
      { id: "narration/サンプル02", volume: 150 },
      { id: "narration/サンプル03", volume: 150 },
    ],
    startChime: { id: "chime/サンプル01", volume: 50 },
    endChime: { id: "chime/サンプル02", volume: 50 },
    bgm: { id: "bgm/サンプル01", volume: 50 },
  },
  timestamp: "2019-09-01T09:00:00+9:00",
};

const mock = jest.fn();
// TODO: mock
jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          get: () => {
            return {
              promise: mock,
            };
          },
        };
      }),
    },
    S3: jest.fn(() => {
      return {
        copy: () => {
          return {
            promise: mock,
          };
        },
      };
    }),
  };
});

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 min
  if (isMock) jest.resetAllMocks();
});

// TODO: draft
describe("share", () => {
  test("getShareCm success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: { cm: [data] } });
    const response = await getShareCm("123456789", data.id);
    expect(response).toEqual(data);
  });
});

// FIXME: error test
