import { UMesseError } from "@/models/umesseError";
import axios from "@/repository/api/axiosInstance";
import { useCmService } from "@/services/cmService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import * as umesseapi from "umesseapi";
import { CmCache } from "@/repository/cache/cmCache";
import { CreateUserCmResponseItem } from "@/models/createUserCmResponseItem";

import {
  Convert,
  CreateUserCmRequestItem,
  Narration,
} from "@/models/createUserCmRequestItem";
import { Recording } from "@/models/displayCmItem";

const cmCache = new CmCache();
const cmRepository = new umesseapi.CmApi(undefined, "", axios);
const cmService = useCmService(cmRepository, cmCache);

describe("fetchのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、Scene[], CmItem[]が返ること`, async () => {
    const responseJson = [
      {
        sceneCd: "012",
        sceneName: "営業時間案内",
        details: [
          {
            seconds: 42,
            materials: {
              narrations: [
                {
                  volume: 100,
                  seconds: 0,
                  description: "ナレーション・サンプル04",
                  id: "サンプル04",
                  title: "サンプル04",
                  category: "narration",
                  timestamp: "2019-09-01T09:00:00+09:00",
                },
              ],
            },
            endDate: "9999-12-31T14:59:59.000Z",
            productionType: "02",
            description: "",
            uploadSystem: "01",
            title: "a",
            startDate: "2019-09-01T00:00:00.000Z",
            status: "03",
            timestamp: "2021-04-01T21:57:20.865+09:00",
            scene: {
              sceneCd: "012",
              sceneName: "営業時間案内",
            },
            id: "123456789-c-qzdjdj2m",
            category: "cm",
          },
        ],
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await cmService.fetch("unisCustomerCd", "token", 1);

    expect(response.length).toBe(2);
    expect(response[0].length).toBe(1);
    expect(response[0][0].cd).toBe("012");
    expect(response[1].length).toBe(1);
    expect(response[1][0].id).toBe("123456789-c-qzdjdj2m");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    await expect(cmService.fetch("unisCustomerCd", "token", 1)).rejects.toThrowError(
      expoectedError
    );
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(cmService.fetch("unisCustomerCd", "token", 1)).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("createのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cmCache.removeAll();
  });

  test(`正常終了の場合、CreateUserCmResponseItemが返ること`, async () => {
    jest.setTimeout(30000);
    const createUserCmResponseJson = {
      productionType: "02",
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "従業員向け、開店10分前（飲食業）",
            id: "000023_JP",
            title: "開店１０分前",
            category: "narration",
            timestamp: "2021-04-01T10:00:00+09:00",
          },
        ],
      },
      status: "05",
      timestamp: "2021-04-12T21:22:08.515+09:00",
      id: "123456789-c-friyf2wg",
      category: "cm",
    };
    const getUserCmResponseJson = {
      productionType: "02",
      seconds: 52,
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "従業員向け、開店10分前（飲食業）",
            id: "000023_JP",
            title: "開店１０分前",
            category: "narration",
            timestamp: "2021-04-01T10:00:00+09:00",
          },
        ],
      },
      status: "01",
      timestamp: "2021-04-12T21:22:28.448+09:00",
      url:
        "https://dev-umesse-users.s3.ap-northeast-1.amazonaws.com/users/123456789/cm/123456789-c-friyf2wg.mp3?AWSAccessKeyId=ASIAXVZCX6QHN4BX4WRV&Expires=1618230749&Signature=UiH12oXfY8OI5th8zbUyHhVdMRc%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGQaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAM613c6ykumC3jSXc37XuTCP2GpdVE1V8tqF5b8U7NTkAiAo4LAH19Ut4QZnmoO4WVVZk6%2B8ykwN4AL8Wz76nq8gUSrZAQi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDUyNzgxNjk3OTQ3MCIMvCbPICBx%2FTqAgPD6Kq0BG3mrxUzvuMkx%2BNrrUA59SQhLmSeeO1g6Tuq1JeuVbOMmfOzrEdVGAvrVOguqqGK5IwMI0UhmNpvatSnEgIMVIu1nCM9lA1qyvdMOjnkIBcFiyTRJXq1Q7NY3YPR87wPWcQjS6ER6kHg7DCydjYtfCfxeiDSIt0c3jyTvMA21U4PVNK9eYoCCrNHj1upP%2FZ%2BdVU4H%2BpYrK5sTq9Tnv5P%2FbZuzRbJmDV6icl3DMssw4vbQgwY64AG55gt4DOOu75boy3bthIiT7%2B3%2FG4Fr9RNe0zswyAB%2FnIEC9hjxpMky7Fb7rzAkTJc2J7BvRIepYYRe16o%2BBkUarrXVl6XilS9dXuBbOn5Lc69%2BeRhJgNhnzQXXj9Z3DpppWMj37Zwh7GVL4x9bmvOyuqTnn1QkhfZzJuk74mdUK5%2FQ67pBmZaAnJWpzFckvmkyXRiVwRWFzAoC4wAlQYQmFy8KEb7%2FJpcSPo%2FOT0PLwXKYkBl%2Bi0gGY1xZf3F4OUHzBuKI4liG6YGkOhKFIJxui8e7kYyV7SSGxV%2Bk3uK%2B4w%3D%3D",
      id: "123456789-c-friyf2wg",
      category: "cm",
    };
    jest
      .spyOn(axios, "request")
      .mockResolvedValueOnce({ data: createUserCmResponseJson })
      .mockResolvedValueOnce({ data: getUserCmResponseJson });

    const iterator = cmService.createGenerator(
      "unisCustomerCd",
      "token",
      [
        <Narration>{
          id: "000023_JP",
          title: "開店１０分前",
          description: "従業員向け、開店10分前（飲食業）",
          seconds: 0,
          timestamp: "2021-04-01T10:00:00+09:00",
          volume: 100,
          category: "narration",
        },
      ],
      null,
      null,
      null
    );

    let response!: CreateUserCmResponseItem;
    for await (response of iterator) {
      expect(response.id).toBe("123456789-c-friyf2wg");
      expect(response.url).toBe(
        "https://dev-umesse-users.s3.ap-northeast-1.amazonaws.com/users/123456789/cm/123456789-c-friyf2wg.mp3?AWSAccessKeyId=ASIAXVZCX6QHN4BX4WRV&Expires=1618230749&Signature=UiH12oXfY8OI5th8zbUyHhVdMRc%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGQaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAM613c6ykumC3jSXc37XuTCP2GpdVE1V8tqF5b8U7NTkAiAo4LAH19Ut4QZnmoO4WVVZk6%2B8ykwN4AL8Wz76nq8gUSrZAQi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDUyNzgxNjk3OTQ3MCIMvCbPICBx%2FTqAgPD6Kq0BG3mrxUzvuMkx%2BNrrUA59SQhLmSeeO1g6Tuq1JeuVbOMmfOzrEdVGAvrVOguqqGK5IwMI0UhmNpvatSnEgIMVIu1nCM9lA1qyvdMOjnkIBcFiyTRJXq1Q7NY3YPR87wPWcQjS6ER6kHg7DCydjYtfCfxeiDSIt0c3jyTvMA21U4PVNK9eYoCCrNHj1upP%2FZ%2BdVU4H%2BpYrK5sTq9Tnv5P%2FbZuzRbJmDV6icl3DMssw4vbQgwY64AG55gt4DOOu75boy3bthIiT7%2B3%2FG4Fr9RNe0zswyAB%2FnIEC9hjxpMky7Fb7rzAkTJc2J7BvRIepYYRe16o%2BBkUarrXVl6XilS9dXuBbOn5Lc69%2BeRhJgNhnzQXXj9Z3DpppWMj37Zwh7GVL4x9bmvOyuqTnn1QkhfZzJuk74mdUK5%2FQ67pBmZaAnJWpzFckvmkyXRiVwRWFzAoC4wAlQYQmFy8KEb7%2FJpcSPo%2FOT0PLwXKYkBl%2Bi0gGY1xZf3F4OUHzBuKI4liG6YGkOhKFIJxui8e7kYyV7SSGxV%2Bk3uK%2B4w%3D%3D"
      );
    }
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    const responseJson = {
      productionType: "01",
      seconds: 45,
      materials: {
        endChime: {
          volume: 100,
          seconds: 8,
          description: "スーパーやドラッグでも使用可能なファミリー層向け",
          id: "000007",
          title: "インフォC",
          category: "chime",
          timestamp: "2021-04-01T10:00:00+09:00",
        },
        startChime: {
          volume: 100,
          seconds: 6,
          description: "大型ショッピングモール等でも響き渡る様なPOPなイメージ",
          id: "000005",
          title: "インフォA",
          category: "chime",
          timestamp: "2021-04-01T10:00:00+09:00",
        },
        bgm: {
          volume: 50,
          seconds: 196,
          description: "原曲に近しいアレンジで汎用性あり",
          id: "000014",
          title: "ジムノペディ/エリック・サティ",
          category: "bgm",
          timestamp: "2021-04-01T10:00:00+09:00",
        },
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "開店案内（ショート）",
            id: "000514_JP",
            title: "開店案内",
            category: "narration",
            timestamp: "2021-04-01T10:00:00+09:00",
          },
        ],
      },
      status: "01",
      timestamp: "2021-04-12T21:06:47.048+09:00",
      url:
        "https://dev-umesse-users.s3.ap-northeast-1.amazonaws.com/users/123456789/cm/123456789-c-6qkg3y9c.mp3?AWSAccessKeyId=ASIAXVZCX6QHLTKIT5VM&Expires=1618229812&Signature=BVdfSjATB0QKIJrdEDYzBnZ9gVM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGQaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAItqtfnPksSnHOxLHC1igKDUEEyncbpOFFDFeP8ssjnjAiAf7vjxg%2B0eB7xrkf8L9ie4Q4b9ZD3RYPzJi%2BUdCXjuEyrZAQi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDUyNzgxNjk3OTQ3MCIMr80ajS3wwVMLHkUFKq0BbNuH40tMzk6hokVxmVHHq1Jqj4mxcB0RwqLtJou%2FGxAeoVhwq28Frzi7WH0mB1y7BMKsmjRFk0VzP90zmgF0Z74GMGxn5e1EFdNbYLVfLQmSe%2BT%2BgDY%2FIXXyd047QA3IZRgrYYSAqbouYxyWjPoqNvsJWiPTyuLA2YUwBGytUdHPqOPI6YRRH8BGjB5VgnxPD8qEM8L8Q6hmqq4Mj6eTulgFJ2iazl4IsHlLqM4woe%2FQgwY64AHZEcP2n6nF1QwfDAf%2Bx%2FfVKrtOfMLnsX9W3amvU6%2FZX8f5iLTehCuRTazteps%2BDXEJc6jgQYr1%2FdsYevDU1eSEHhRclQsBHOKlE0FRnkIowzs4wE9t3EXitOgt5V%2FC7hl8NOX04wGuqRrkcmmrqSQLre1NOXJbX%2FyUOHNwH9RWocmQJKYZiYC4TrDiulvahPmLO51wDbYCI5qqIu7riyToQCo792j1OReLnqTNue8xeUkTpFnXRpvBS5mINUm0kpQpnY1Hh9GNz3Y9AqmqqHHAr6BNa62W%2BeeE1MkSSH%2Bsew%3D%3D",
      id: "123456789-c-6qkg3y9c",
      category: "cm",
    };

    const requestModel: CreateUserCmRequestItem = {
      id: "123456789-c-x9vu7ezm",
      materials: {
        narrations: [
          <Recording>{
            id: "123456789-r-sbutlilf",
            title: "test",
            description: "",
            seconds: 0,
            timestamp: "2021-03-29T15:20:27.499+09:00",
            volume: 100,
            category: "recording",
          },
        ],
        startChime: undefined,
        endChime: undefined,
        bgm: undefined,
      },
    };
    const tmp = JSON.parse(JSON.stringify(requestModel));
    delete tmp.id;
    const cacheKey = Convert.createUserCmRequestItemToJson(tmp);
    cmCache.set(cacheKey, responseJson);

    const iterator = cmService.createGenerator(
      "unisCustomerCd",
      "token",
      [
        <Recording>{
          id: "123456789-r-sbutlilf",
          title: "test",
          description: "",
          seconds: 0,
          timestamp: "2021-03-29T15:20:27.499+09:00",
          volume: 100,
          category: "recording",
        },
      ],
      null,
      null,
      null,
      "123456789-c-x9vu7ezm"
    );

    let response!: CreateUserCmResponseItem;
    for await (response of iterator) {
      expect(response.id).toBe("123456789-c-6qkg3y9c");
      expect(response.url).toBe(
        "https://dev-umesse-users.s3.ap-northeast-1.amazonaws.com/users/123456789/cm/123456789-c-6qkg3y9c.mp3?AWSAccessKeyId=ASIAXVZCX6QHLTKIT5VM&Expires=1618229812&Signature=BVdfSjATB0QKIJrdEDYzBnZ9gVM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGQaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAItqtfnPksSnHOxLHC1igKDUEEyncbpOFFDFeP8ssjnjAiAf7vjxg%2B0eB7xrkf8L9ie4Q4b9ZD3RYPzJi%2BUdCXjuEyrZAQi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDUyNzgxNjk3OTQ3MCIMr80ajS3wwVMLHkUFKq0BbNuH40tMzk6hokVxmVHHq1Jqj4mxcB0RwqLtJou%2FGxAeoVhwq28Frzi7WH0mB1y7BMKsmjRFk0VzP90zmgF0Z74GMGxn5e1EFdNbYLVfLQmSe%2BT%2BgDY%2FIXXyd047QA3IZRgrYYSAqbouYxyWjPoqNvsJWiPTyuLA2YUwBGytUdHPqOPI6YRRH8BGjB5VgnxPD8qEM8L8Q6hmqq4Mj6eTulgFJ2iazl4IsHlLqM4woe%2FQgwY64AHZEcP2n6nF1QwfDAf%2Bx%2FfVKrtOfMLnsX9W3amvU6%2FZX8f5iLTehCuRTazteps%2BDXEJc6jgQYr1%2FdsYevDU1eSEHhRclQsBHOKlE0FRnkIowzs4wE9t3EXitOgt5V%2FC7hl8NOX04wGuqRrkcmmrqSQLre1NOXJbX%2FyUOHNwH9RWocmQJKYZiYC4TrDiulvahPmLO51wDbYCI5qqIu7riyToQCo792j1OReLnqTNue8xeUkTpFnXRpvBS5mINUm0kpQpnY1Hh9GNz3Y9AqmqqHHAr6BNa62W%2BeeE1MkSSH%2Bsew%3D%3D"
      );
    }
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ data: "aaaaaaaaaaaaaaaaa" });
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    const iterator = cmService.createGenerator(
      "unisCustomerCd",
      "token",
      [
        <Recording>{
          id: "123456789-r-sbutlilf",
          title: "test",
          description: "",
          seconds: 0,
          timestamp: "2021-03-29T15:20:27.499+09:00",
          volume: 100,
          category: "recording",
        },
      ],
      null,
      null,
      null,
      "001"
    );

    await expect(iterator.next()).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );
    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });
    const iterator = cmService.createGenerator(
      "unisCustomerCd",
      "token",
      [
        <Recording>{
          id: "123456789-r-sbutlilf",
          title: "test",
          description: "",
          seconds: 0,
          timestamp: "2021-03-29T15:20:27.499+09:00",
          volume: 100,
          category: "recording",
        },
      ],
      null,
      null,
      null,
      "001"
    );
    await expect(iterator.next()).rejects.toThrowError(expoectedError);
  });
});

describe("updateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CmItemが返ること`, async () => {
    const responseJson = {
      endDate: "9999-12-31T14:59:59.000Z",
      productionType: "02",
      description: "説明",
      title: "cmテスト",
      scene: {
        sceneCd: "001",
        sceneName: "チャイム",
      },
      seconds: 74.109388,
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "ナレーション・サンプル01",
            id: "サンプル01",
            title: "サンプル01",
            category: "narration",
            timestamp: "2019-09-01T09:00:00+09:00",
          },
        ],
      },
      uploadSystem: "01",
      id: "123456789-c-v2qvc913",
      category: "cm",
      startDate: "2019-09-01T00:00:00.000Z",
      status: "03",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await cmService.update(
      "unisCustomerCd",
      "token",
      "001",
      "タイトル",
      "説明",
      "001",
      "02",
      "原稿"
    );

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.title).toBe("cmテスト");
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
      cmService.update("unisCustomerCd", "token", "001", "タイトル", "説明", "001", "02", "原稿")
    ).rejects.toThrowError(expoectedError);
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(
      cmService.update("unisCustomerCd", "token", "001", "タイトル", "説明", "001", "02", "原稿")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、CmItemが返ること`, async () => {
    const responseJson = {
      endDate: "9999-12-31T14:59:59.000Z",
      productionType: "02",
      description: "説明",
      title: "cmテスト",
      scene: {
        sceneCd: "001",
        sceneName: "チャイム",
      },
      seconds: 74.109388,
      materials: {
        narrations: [
          {
            volume: 100,
            seconds: 0,
            description: "ナレーション・サンプル01",
            id: "サンプル01",
            title: "サンプル01",
            category: "narration",
            timestamp: "2019-09-01T09:00:00+09:00",
          },
        ],
      },
      uploadSystem: "01",
      id: "123456789-c-v2qvc913",
      category: "cm",
      startDate: "2019-09-01T00:00:00.000Z",
      status: "03",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await cmService.remove("unisCustomerCd", "token", "001");

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.title).toBe("cmテスト");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(cmService.remove("unisCustomerCd", "token", "001")).rejects.toThrowError(
      expoectedError
    );
  });

  test(`エラーの場合、UMesseErrorがthrowされること`, async () => {
    const expoectedError = new UMesseError(
      ERROR_CODE.A3999,
      ERROR_PATTERN.A3999,
      ""
    );

    jest
      .spyOn(axios, "request")
      .mockRejectedValue({ response: { status: 500 } });

    await expect(cmService.remove("unisCustomerCd", "token", "001")).rejects.toThrowError(
      expoectedError
    );
  });
});
