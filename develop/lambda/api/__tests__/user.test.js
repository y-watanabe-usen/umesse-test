"use strict";

// process.env.debug = true;
process.env.environment = "local";

const { getUser } = require("../umesse/user");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("user", () => {
  test("getUser success", async () => {
    const response = await getUser(data.unisCustomerCd);
    expect(response).toEqual(data);
  });

  test("getUser not found", async () => {
    const response = await getUser("999999999");
    expect(response).toEqual({ message: "not found" });
  });

  test("getUser not params", async () => {
    const response = await getUser("");
    expect(response).toEqual({ message: "params failed" });
  });
});

// FIXME: error test

// test data
const data = {
  unisCustomerCd: "010000000",
  serviceCd: "U01",
  serviceName: "U∞MUSNC",
  contractCd: "N0100000000",
  contractStatusCd: "2",
  contractStatusName: "確定",
  customerName: "テスト01",
  customerNameKana: "テスト01",
  customerGroupCd: "010000000",
  customerGroupName: "テスト01グループ",
  createDate: "2019-09-01T09:00:00+9:00",
  renewalDate: "2019-09-01T09:00:00+9:00",
};
