import { UMesseError } from "@/models/umesseError";
import axios from "@/repository/api/axiosInstance";
import {
  useRecordingService,
  RecordingFile,
} from "@/services/recordingService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import * as umesseapi from "umesseapi";

const resourcesRepository = new umesseapi.ResourcesApi(undefined, "", axios);
const recordingRepository = new umesseapi.RecordingApi(undefined, "", axios);
const recordingService = useRecordingService(
  resourcesRepository,
  recordingRepository
);

describe("fetchのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItem[]が返ること`, async () => {
    const responseJson = [
      {
        id: "123456789-c-v2qvc913",
        category: "recording",
        title: "recording1",
        description: "description1",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2021-03-17T13:29:32.195+09:00",
      },
      {
        id: "123456789-c-5ml6xdvj",
        category: "recording",
        title: "recording2",
        description: "description2",
        startDate: "2019-09-01T00:00:00.000Z",
        timestamp: "2021-03-17T13:29:32.195+09:00",
      },
    ];
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await recordingService.fetch("unisCustomerCd", "authToken");

    expect(response.length).toBe(2);
    expect(response[0].id).toBe("123456789-c-v2qvc913");
    expect(response[1].id).toBe("123456789-c-5ml6xdvj");
    expect(response[0].category).toBe("recording");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    const responseJson = "aaaaaaaaaaaaaa";
    const expoectedError = new UMesseError(
      ERROR_CODE.A0001,
      ERROR_PATTERN.A0001,
      ""
    );

    jest.spyOn(axios, "request").mockRejectedValue({ data: responseJson });

    await expect(recordingService.fetch("unisCustomerCd", "authToken")).rejects.toThrowError(
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

    await expect(recordingService.fetch("unisCustomerCd", "authToken")).rejects.toThrowError(
      expoectedError
    );
  });
});

describe("updateのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItemが返ること`, async () => {
    const responseJson = {
      id: "123456789-c-v2qvc913",
      category: "recording",
      title: "recording1",
      description: "description1",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await recordingService.update(
      "unisCustomerCd",
      "authToken",
      "001",
      "title",
      "description"
    );

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.category).toBe("recording");
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
      recordingService.update("unisCustomerCd", "authToken", "001", "title", "description")
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
      recordingService.update("unisCustomerCd", "authToken", "001", "title", "description")
    ).rejects.toThrowError(expoectedError);
  });
});

describe("uploadのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItemが返ること`, async () => {
    const responseJson = {
      id: "123456789-c-v2qvc913",
      category: "recording",
      title: "recording1",
      description: "description1",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await recordingService.upload("unisCustomerCd", "authToken", <RecordingFile>{
      id: "id",
      title: "title",
      description: "description",
      blob: undefined,
    });

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.category).toBe("recording");
    expect(response.title).toBe("recording1");
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
      recordingService.upload("unisCustomerCd", "authToken", <RecordingFile>{
        id: "id",
        title: "title",
        description: "description",
        blob: undefined,
      })
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
      recordingService.upload("unisCustomerCd", "authToken", <RecordingFile>{
        id: "id",
        title: "title",
        description: "description",
        blob: undefined,
      })
    ).rejects.toThrowError(expoectedError);
  });
});

describe("removeのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`正常終了の場合、RecordingItemが返ること`, async () => {
    const responseJson = {
      id: "123456789-c-v2qvc913",
      category: "recording",
      title: "recording1",
      description: "description1",
      startDate: "2019-09-01T00:00:00.000Z",
      timestamp: "2021-03-17T13:29:32.195+09:00",
    };
    jest.spyOn(axios, "request").mockResolvedValue({ data: responseJson });

    const response = await recordingService.remove("unisCustomerCd", "authToken", "001");

    expect(response.id).toBe("123456789-c-v2qvc913");
    expect(response.category).toBe("recording");
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
      recordingService.remove("unisCustomerCd", "authToken", "001")
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
      recordingService.remove("unisCustomerCd", "authToken", "001")
    ).rejects.toThrowError(expoectedError);
  });
});
