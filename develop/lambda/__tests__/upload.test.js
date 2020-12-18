"use strict";

process.env.debug = false;
process.env.environment = "local";
// TODO: mock
const isMock = true;

const { getUploadCm } = require("../umesse/upload");

const data = {
  unisCustomerCd: "123456789",
  dataProcessType: "01",
  id: "123456789-c-12345678",
  title: "時報A",
  description: "テストCMです",
  seconds: "60",
  startDate: "2020-01-01T12:34:56+09:00",
  endDate: "9999-12-31T23:59:59+09:00",
  productionType: "01",
  industry: "001",
  scene: "001",
  uploadSystem: "01",
  status: "1",
  timestamp: "2020-01-01T12:34:56+09:00",
};

const mock = jest.fn();
// TODO: mock
jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          query: () => {
            return {
              promise: mock,
            };
          },
        };
      }),
    },
    S3: jest.fn(() => {
      return {
        getSignedUrl: () => {
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
describe("upload", () => {
  test("getUploadCm success", async () => {
    if (isMock) mock.mockResolvedValue({ Items: { cm: [data] } });
    const response = await getUploadCm(data.unisCustomerCd, data.id);
    expect(response).toEqual(data);
  });
});

// FIXME: error test
