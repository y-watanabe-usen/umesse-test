"use strict";

const { getCm, createCm, updateCm, deleteCm } = require("../umesse/cm");

// TODO: mock
const isMock = false;

process.env.AWS_ACCESS_KEY_ID = "local";
process.env.AWS_SECRET_ACCESS_KEY = "local";
process.env.debug = true;
process.env.environment = "local";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const unisCustomerCd = "123456789";
const data = {
  id: "123456789-c-12345678",
  title: "サンプル",
  description: "サンプル",
  seconds: 540,
  start_date: "2019-09-01T09:00:00+9:00",
  end_date: "9999-12-31T23:59:59+09:00",
  production_type: "01",
  industry: [{ id: "01", name: "全業種" }],
  scene: [{ id: "01", name: "全シーン" }],
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

const mockDynamoDb = jest.fn();
const mockS3 = jest.fn();
if (isMock) {
  jest.mock("aws-sdk", () => {
    return {
      DynamoDB: {
        DocumentClient: jest.fn(() => {
          return {
            get: () => {
              return {
                promise: mockDynamoDb,
              };
            },
            update: () => {
              return {
                promise: mockDynamoDb,
              };
            },
          };
        }),
      },
      S3: jest.fn(() => {
        return {
          getObject: () => {
            return {
              promise: mockS3,
            };
          },
          putObject: () => {
            return {
              promise: mockS3,
            };
          },
          getSignedUrl: () => {
            return {
              promise: mockS3,
            };
          },
        };
      }),
    };
  });
}

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 min
  jest.resetAllMocks();
});

// TODO: draft
describe("cm", () => {
  test("getCm success", async () => {
    if (isMock) mockDynamoDb.mockResolvedValue({ Item: data });
    const response = await getCm(unisCustomerCd, data.id);
    console.log(response);
    expect(response).toEqual(data);
  });

  test("getCm all success", async () => {
    if (isMock) mockDynamoDb.mockResolvedValue({ Item: data });
    const response = await getCm(unisCustomerCd);
    console.log(response);
    expect(response).toEqual([data]);
  });

  test("createCm success", async () => {
    if (isMock) mockDynamoDb.mockResolvedValue({ cm: data });
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
    if (isMock) mockDynamoDb.mockResolvedValue({ cm: data });
    const body = {
      title: "テスト",
      description: "テスト",
    };
    const response = await updateCm(unisCustomerCd, data.id, body);
    console.log(response);
    expect(response).toEqual({
      ...data,
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("deleteCm", async () => {
    if (isMock) mockDynamoDb.mockResolvedValue({ cm: data });
    const response = await deleteCm(unisCustomerCd, data.id);
    console.log(response);
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
