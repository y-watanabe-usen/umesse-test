import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/api/axiosInstance";
import { useUserService } from "@/services/userService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";

const authRepository = new umesseapi.AuthApi(undefined, "", axios);
const userRepository = new umesseapi.UserApi(undefined, "", axios);
const userService = useUserService(authRepository, userRepository);

describe("authのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、tokenが返ること`, async () => {
    const responseJson = {
      token: "123456789",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await userService.auth("1111");

    expect(response).toBe("123456789");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(userService.auth("1111")).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A4999,
      ERROR_PATTERN.A4999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(userService.auth("1111")).rejects.toThrowError(expoectedError);
  });
});

describe("getInfoのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、Userが返ること`, async () => {
    const responseJson = {
      contractCd: "N01234567890123456789",
      contractStatusCd: "2",
      contractStatusName: "確定",
      createDate: "2019-09-01T09:00:00+09:00",
      customerGroupCd: "1234567",
      customerGroupName: "CAFÉ USENグループ",
      customerName: "カフェUSEN",
      customerNameKana: "カフェユーセン",
      renewalDate: "2019-09-01T09:00:00+09:00",
      serviceCd: "U01",
      serviceName: "U∞MUSNC",
      unisCustomerCd: "123456789",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await userService.getInfo("authToken");

    expect(response.contractCd).toBe("N01234567890123456789");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(userService.getInfo("authToken")).rejects.toThrowError(
      expoectedError
    );
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A4999,
      ERROR_PATTERN.A4999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(userService.getInfo("authToken")).rejects.toThrowError(
      expoectedError
    );
  });
});
