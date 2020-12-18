"use strict";

process.env.debug = false;
process.env.environment = "local";
// TODO: mock
const isMock = true;

const { getUser } = require("../umesse/user");

const data = {
  unisCustomerCd: "123456789",
  serviceCd: "U01",
  serviceName: "U∞MUSNC",
  contractCd: "N01234567890123456789",
  contractStatusCd: "2",
  contractStatusName: "確定",
  customerName: "カフェUSEN",
  customerNameKana: "カフェユーセン",
  customerGroupCd: "1234567",
  customerGroupName: "CAFÉ USENグループ",
  createDate: "2019-09-01T09:00:00+9:00",
  renewalDate: "2019-09-01T09:00:00+9:00",
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
  };
});

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 min
  if (isMock) jest.resetAllMocks();
});

// TODO: draft
describe("user", () => {
  test("getUser success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: data });
    const response = await getUser(data.unisCustomerCd);
    expect(response).toEqual(data);
  });

  test("getUser not found", async () => {
    if (isMock) mock.mockResolvedValue("");
    const response = await getUser("aaa");
    expect(response).toEqual({ message: "not found" });
  });
});

// FIXME: error test
