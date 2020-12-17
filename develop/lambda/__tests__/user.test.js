"use strict";

const { getUser } = require("../umesse/user");

// TODO: mock
const isMock = false;

process.env.AWS_ACCESS_KEY_ID = "local";
process.env.AWS_SECRET_ACCESS_KEY = "local";
process.env.debug = true;
process.env.environment = "local";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const data = {
  unis_customer_cd: "123456789",
  service_cd: "U01",
  service_name: "U∞MUSNC",
  contract_cd: "N01234567890123456789",
  contract_status_cd: "2",
  contract_status_name: "確定",
  customer_name: "カフェUSEN",
  customer_name_kana: "カフェユーセン",
  customer_group_cd: "1234567",
  customer_group_name: "CAFÉ USENグループ",
  create_date: "2019-09-01T09:00:00+9:00",
  renewal_date: "2019-09-01T09:00:00+9:00",
};

const mock = jest.fn();
if (isMock) {
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
}

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 min
  jest.resetAllMocks();
});

// TODO: draft
describe("user", () => {
  test("getUser success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: data });
    const response = await getUser(data.unis_customer_cd);
    expect(response).toEqual(data);
  });

  test("getUser not found", async () => {
    if (isMock) mock.mockResolvedValue("");
    const response = await getUser("aaa");
    expect(response).toEqual({ message: "not found" });
  });
});

// FIXME: error test
