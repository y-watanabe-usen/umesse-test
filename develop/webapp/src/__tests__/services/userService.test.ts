import { UMesseError } from "@/models/umesseError";
import axios from "@/repository/api/axiosInstance";
import { useUserService } from "@/services/userService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import * as umesseapi from "umesseapi";
import * as umesseLocalStorage from "@/repository/storage/localStorage";
import * as umesseSessionStorage from "@/repository/storage/sessionStorage";

const authRepository = new umesseapi.AuthApi(undefined, "", axios);
const userRepository = new umesseapi.UserApi(undefined, "", axios);
const localStorage = new umesseLocalStorage.umesseLocalStorage();
const sessionStorage = new umesseSessionStorage.umesseSessionStorage();
const userService = useUserService(
  authRepository,
  userRepository,
  localStorage,
  sessionStorage
);

describe("authのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、Authが返ること`, async () => {
    const responseJson = {
      expiration: "2019-09-01T09:00:00+9:00",
      token: "123456789",
      agree: "true",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await userService.auth("1111", "N1234567890");

    expect(response.token).toBe("123456789");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(userService.auth("1111", "N1234567890")).rejects.toThrowError(
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

    await expect(userService.auth("1111", "N1234567890")).rejects.toThrowError(
      expoectedError
    );
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

    const response = await userService.getInfo("unisCustomerCd", "authToken");

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

    await expect(
      userService.getInfo("unisCustomerCd", "authToken")
    ).rejects.toThrowError(expoectedError);
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

    await expect(
      userService.getInfo("unisCustomerCd", "authToken")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("getDontShowForeverTutorialのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、trueが返ること`, () => {
    localStorage.set(
      umesseLocalStorage.LOCAL_STORAGE_KEY.DONT_SHOW_FOREVER_TUTORIAL,
      "false"
    );

    const response = userService.getDontShowForeverTutorial();

    expect(response).toBe("false");
  });
});

describe("dontShowForeverTutorialのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、trueが返ること`, () => {
    userService.dontShowForeverTutorial();

    const response = userService.getDontShowForeverTutorial();

    expect(response).toBe("true");
  });
});

describe("isAlreadyShowTutorialのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、trueが返ること`, () => {
    sessionStorage.set(
      umesseSessionStorage.SESSION_STORAGE_KEY.ALREADY_SHOW_TUTORIAL,
      "true"
    );

    const response = userService.isAlreadyShowTutorial();

    expect(response).toBe("true");
  });
});

describe("showTutorialのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、trueが返ること`, () => {
    userService.showTutorial();

    const response = userService.isAlreadyShowTutorial();

    expect(response).toBe("true");
  });
});
