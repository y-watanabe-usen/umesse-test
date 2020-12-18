"use strict";

process.env.debug = false;
process.env.environment = "local";
// TODO: mock
const isMock = true;

const {
  getSignedUrl,
  getResource,
  getUserResource,
} = require("../umesse/resources");

const bgmData = {
  id: "bgm/サンプル01",
  title: "タイトル",
  description: "説明文",
  seconds: 300,
  industry: [
    {
      cd: "01",
      name: "業種名",
    },
  ],
  scene: [
    {
      cd: "01",
      name: "シーン名",
    },
  ],
  timestamp: "2019-09-01T09:00:00+9:00",
};

const userData = {
  unisCustomerCd: "123456789",
  recording: [
    {
      id: "123456789-r-12345678",
      title: "サンプル",
      description: "サンプル",
      startDate: "2019-09-01T09:00:00+9:00",
      timestamp: "2019-09-01T09:00:00+9:00",
    },
  ],
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
          scan: () => {
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
describe("resources", () => {
  test("getSignedUrl success", async () => {
    if (isMock) mock.mockResolvedValue("signed url");
    const response = await getSignedUrl("123456789-c-12345678");
    expect(response).toEqual({ url: expect.anything() });
  });

  test("getResource success", async () => {
    if (isMock) mock.mockResolvedValue({ Items: bgmData });
    const response = await getResource("bgm");
    expect(response).toEqual(bgmData);
  });

  test("getUserResource success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: userData });
    const response = await getUserResource(
      userData.unisCustomerCd,
      "recording"
    );
    expect(response).toEqual(userData.recording);
  });
});

// FIXME: error test
