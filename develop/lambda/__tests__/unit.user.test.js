"use strict";

process.env.AWS_ACCESS_KEY_ID = "local";
process.env.AWS_SECRET_ACCESS_KEY = "local";
process.env.debug = true;
process.env.environment = "local";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// TODO: mock
const { getUser } = require("../umesse/user");

beforeAll(() => {
  jest.setTimeout(30000);
});

// TODO: draft
describe("user", () => {
  test("getUser", async () => {
    const response = await getUser("123456789");
    console.log(response);
    expect(response).toEqual({
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
    });
  });
});

// FIXME: error
