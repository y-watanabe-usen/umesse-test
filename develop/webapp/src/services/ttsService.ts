import * as UMesseApi from "umesseapi";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { GenerateUserTtsRequestItem, Convert } from "@/models/GenerateUserTtsRequestItem";
import { CreateUserTtsRequestItem } from "@/models/CreateUserTtsRequestItem";
import { GenerateTtsItem, TtsItem } from "umesseapi/models";
import { TtsCache } from "@/repository/cache/ttsCache";

export function useTtsService(
  ttsApi: UMesseApi.TtsApi,
  ttsCache: TtsCache
) {

  const fetch = async (authToken: string): Promise<TtsItem[]> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .listUserTts(authToken)
        .then((value) => {
          console.log("resolve");
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const generate = async (authToken: string, requestModel: GenerateUserTtsRequestItem): Promise<GenerateTtsItem> => {
    const cacheKey = Convert.generateUserTtsRequestItemToJson(requestModel);
    const cacheValue = ttsCache.get<GenerateTtsItem | undefined>(cacheKey);
    if (cacheValue) return cacheValue;

    return new Promise(function (resolve, reject) {
      ttsApi
        .generateUserTts(authToken, requestModel)
        .then((value) => {
          console.log("resolve");
          ttsCache.set<GenerateTtsItem>(cacheKey, value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const create = async (authToken: string, requestModel: CreateUserTtsRequestItem): Promise<TtsItem[]> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .createUserTts(authToken, requestModel)
        .then((value) => {
          console.log("resolve");
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const update = async (authToken: string, id: string, title: string, description: string): Promise<TtsItem> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .updateUserTts(authToken, id, {
          title: title,
          description: description,
        })
        .then((value) => {
          console.log("resolve");
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const remove = async (authToken: string, id: string): Promise<TtsItem> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .deleteUserTts(id, authToken)
        .then((value) => {
          console.log("resolve");
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  return {
    fetch,
    generate,
    create,
    update,
    remove,
  };
}