"use strict";

process.env.debug = false;
process.env.environment = "local";
// TODO: mock
const isMock = false;

const { getCm, createCm, updateCm, deleteCm } = require("../umesse/cm");

const unisCustomerCd = "123456789";
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
  status: "02",
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
// jest.mock("aws-sdk", () => {
//   return {
//     DynamoDB: {
//       DocumentClient: jest.fn(() => {
//         return {
//           get: () => {
//             return {
//               promise: mock,
//             };
//           },
//           update: () => {
//             return {
//               promise: mock,
//             };
//           },
//         };
//       }),
//     },
//     S3: jest.fn(() => {
//       return {
//         getObject: () => {
//           return {
//             promise: mock,
//           };
//         },
//         putObject: () => {
//           return {
//             promise: mock,
//           };
//         },
//         getSignedUrl: () => {
//           return {
//             promise: mock,
//           };
//         },
//       };
//     }),
//   };
// });

beforeAll(() => {
  jest.setTimeout(1000 * 30); // 30 min
  if (isMock) jest.resetAllMocks();
});

// TODO: draft
describe("cm", () => {
  test("getCm success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: data });
    const response = await getCm(unisCustomerCd, data.id);
    expect(response).toEqual(data);
  });

  test("getCm all success", async () => {
    if (isMock) mock.mockResolvedValue({ Item: data });
    const response = await getCm(unisCustomerCd);
    expect(response).toEqual([data]);
  });

  test("createCm success", async () => {
    if (isMock) mock.mockResolvedValue({ cm: data });
    const body = {
      materials: {
        narrations: [{ id: "narration/サンプル01", volume: 150 }],
        startChime: { id: "chime/サンプル01", volume: 50 },
        endChime: { id: "chime/サンプル02", volume: 50 },
        bgm: { id: "bgm/サンプル01", volume: 50 },
      },
    };
    const response = await createCm(unisCustomerCd, body);
    expect(response).toEqual({
      id: expect.stringMatching(`^${unisCustomerCd}-c-[0-9a-z]{8}$`),
      seconds: expect.anything(),
      productionType: "01",
      status: "01",
      ...body,
      url: expect.anything(),
      timestamp: expect.anything(),
    });
  });

  test("updateCm success", async () => {
    if (isMock) mock.mockResolvedValue({ cm: data });
    const body = {
      title: "テスト",
      description: "テスト",
    };
    const response = await updateCm(unisCustomerCd, data.id, body);
    expect(response).toEqual({
      ...data,
      ...body,
      timestamp: expect.anything(),
    });
  });

  test("deleteCm success", async () => {
    if (isMock) mock.mockResolvedValue({ cm: data });
    const response = await deleteCm(unisCustomerCd, data.id);
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
