"use strict";

// process.env.debug = true;
process.env.environment = "local";

const { getExternalCm } = require("../umesse/external");

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 sec
});

// TODO: draft
describe("external", () => {
  test("getExternalCm success", async () => {
    const response = await getExternalCm(data.unisCustomerCd, "center");
    expect(response).toEqual(data);
  });

  test("getExternalCm list success", async () => {
    const response = await getExternalCm("", "center");
    expect(response).toEqual([data]);
  });

  test("getExternalCm nothing", async () => {
    const response = await getExternalCm("", "ssence");
    expect(response).toEqual({ message: "nothing" });
  });
});

// FIXME: error test

// test data
const data = {
  unisCustomerCd: "030000000",
  dataProcessType: "01",
  id: "030000000-c-00000001",
  title: "時報A",
  description: "テストCMです",
  seconds: 60,
  startDate: "2020-01-01T12:34:56+09:00",
  endDate: "9999-12-31T23:59:59+09:00",
  productionType: "01",
  industry: "01",
  scene: "01",
  uploadSystem: "01",
  status: "1",
  timestamp: "2020-01-01T12:34:56+09:00",
};
