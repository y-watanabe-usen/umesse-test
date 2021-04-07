import { UMesseError } from "@/models/UMesseError";
import axios from "@/repository/api/axiosInstance";
import { useUploadService } from "@/services/uploadService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";
import * as umesseapi from "umesseapi";
import { UploadCreateRequestItem } from "@/models/UploadCreateRequestItem";

const uploadRepository = new umesseapi.UploadApi(undefined, "", axios);
const uploadService = useUploadService(uploadRepository);

describe("createのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、ExternalItemが返ること`, async () => {
    const responseJson = {
      unisCustomerCd: "123456789",
      cmMetas: [
        {
          dataProcessType: "01：追加、02：変更、03：削除",
          cmId: "123456789-c-12345678",
          url: "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
          cmName: "時報A",
          cmCommentManuscript: "テストCMです",
          startDatetime: "2020-01-01T12:34:56+09:00",
          endDatetime: "9999-12-31T23:59:59+09:00",
          productionType: "01：音楽系、02：素ナレ",
          fileName: "123456789-c-12345678.aac",
          contentTime: 30000,
          sceneCd: "001",
        },
      ],
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await uploadService.create(
      "123456789-c-12345678",
      "123456789",
      "01"
    );

    expect(response.unisCustomerCd).toBe("123456789");
    expect(response.cmMetas.length).toBe(1);
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
      uploadService.create("123456789-c-12345678", "123456789", "01")
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
      uploadService.create("123456789-c-12345678", "123456789", "01")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、ExternalItemが返ること`, async () => {
    const responseJson = {
      unisCustomerCd: "123456789",
      cmMetas: [
        {
          dataProcessType: "01：追加、02：変更、03：削除",
          cmId: "123456789-c-12345678",
          url: "https://xxxxx/123456789-c-12345678.aac?AWSAccessKeyId=xxxxxxxx",
          cmName: "時報A",
          cmCommentManuscript: "テストCMです",
          startDatetime: "2020-01-01T12:34:56+09:00",
          endDatetime: "9999-12-31T23:59:59+09:00",
          productionType: "01：音楽系、02：素ナレ",
          fileName: "123456789-c-12345678.aac",
          contentTime: 30000,
          sceneCd: "001",
        },
      ],
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await uploadService.remove(
      "123456789-c-12345678",
      "123456789"
    );

    expect(response.unisCustomerCd).toBe("123456789");
    expect(response.cmMetas.length).toBe(1);
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
      uploadService.remove("123456789-c-12345678", "123456789")
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
      uploadService.remove("123456789-c-12345678", "123456789")
    ).rejects.toThrowError(expoectedError);
  });
});
