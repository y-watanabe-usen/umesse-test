import { UMesseError } from "@/models/umesseError";
import { AudioRepository } from "@/repository/api/audioRepositry";
import axios from "@/repository/api/axiosInstance";
import { AudioCache } from "@/repository/cache/audioCache";
import { useAudioService } from "@/services/audioService";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import * as umesseapi from "umesseapi";

const audioRepository = new AudioRepository(axios);
const resourcesRepository = new umesseapi.ResourcesApi(undefined, "", axios);
const audioCache = new AudioCache();

const audioService = useAudioService(audioRepository, resourcesRepository, audioCache);

describe("getArrayBufferByIdのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks().resetAllMocks();
    audioCache.removeAll();
  });

  const id = "123456789";
  const category = "bgm";
  const cacheKey = `audioService/getArrayBufferById/${category}/${id}`;

  test(`正常終了の場合、ArrayBufferがキャッシュにセットされ返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedArrayBuffer" });

    const response = await audioService.getArrayBufferById(id, category);

    expect(audioCache.get(cacheKey)).toBe("DownloadedArrayBuffer");
    expect(response).toBe("DownloadedArrayBuffer");
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedArrayBuffer" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audioCache.set(cacheKey, <any>"CacheArrayBuffer");

    const response = await audioService.getArrayBufferById(id, category);

    expect(response).toBe("CacheArrayBuffer");
  });

  test(`想定外の値が返却された場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({});
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "aaaaaaaaaaaaaaaaa" });
    const expoectedError = new UMesseError(ERROR_CODE.A0001, ERROR_PATTERN.A0001, "");

    await expect(audioService.getArrayBufferById(id, category)).rejects.toThrowError(expoectedError);
  });

  test(`404エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 404 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3000, ERROR_PATTERN.A3000, "");

    await expect(audioService.getArrayBufferById(id, category)).rejects.toThrowError(expoectedError);
  });

  test(`500エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 500 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3999, ERROR_PATTERN.A3999, "");

    await expect(audioService.getArrayBufferById(id, category)).rejects.toThrowError(expoectedError);
  });
});

describe("getUrlByIdのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks().resetAllMocks();
    audioCache.removeAll();
  });

  const id = "123456789";
  const category = "bgm";
  const cacheKey = `audioService/getUrlById/${category}/${id}`;

  test(`正常終了の場合、Urlがキャッシュにセットされ返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });

    const response = await audioService.getUrlById(id, category);

    expect(audioCache.get(cacheKey)).toBe("https://example.com");
    expect(response).toBe("https://example.com");
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { url: "https://example.com" } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audioCache.set(cacheKey, <any>"https://example.co.jp");

    const response = await audioService.getUrlById(id, category);

    expect(response).toBe("https://example.co.jp");
  });

  test(`404エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'request').mockRejectedValue({ response: { status: 404 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3000, ERROR_PATTERN.A3000, "");

    await expect(audioService.getUrlById(id, category)).rejects.toThrowError(expoectedError);
  });

  test(`500エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'request').mockRejectedValue({ response: { status: 500 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3999, ERROR_PATTERN.A3999, "");

    await expect(audioService.getUrlById(id, category)).rejects.toThrowError(expoectedError);
  });
});

describe("getArrayBufferByUrlのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks().resetAllMocks();
    audioCache.removeAll();
  });

  const url = "https://example.com";
  const cacheKey = `audioService/getArrayBufferByUrl/${url}`;

  test(`正常終了の場合、ArrayBufferがキャッシュにセットされ返ること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedArrayBuffer" });

    const response = await audioService.getArrayBufferByUrl(url);

    expect(audioCache.get(cacheKey)).toBe("DownloadedArrayBuffer");
    expect(response).toBe("DownloadedArrayBuffer");
  });

  test(`キャッシュがある場合、キャッシュの中身が返ること`, async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "DownloadedArrayBuffer" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audioCache.set(cacheKey, <any>"CacheArrayBuffer");

    const response = await audioService.getArrayBufferByUrl(url);

    expect(response).toBe("CacheArrayBuffer");
  });

  test(`404エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 404 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3000, ERROR_PATTERN.A3000, "");

    await expect(audioService.getArrayBufferByUrl(url)).rejects.toThrowError(expoectedError);
  });

  test(`500エラーの場合、UMesseErrorがthrowされること`, async () => {
    jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 500 } });
    const expoectedError = new UMesseError(ERROR_CODE.A3999, ERROR_PATTERN.A3999, "");

    await expect(audioService.getArrayBufferByUrl(url)).rejects.toThrowError(expoectedError);
  });
});