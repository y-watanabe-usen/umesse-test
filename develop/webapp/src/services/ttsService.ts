import * as UMesseApi from "umesseapi";
import { UMesseErrorFromApiFactory } from "@/models/umesseError";
import { GenerateUserTtsRequestItem, Convert } from "@/models/generateUserTtsRequestItem";
import { CreateUserTtsRequestItem } from "@/models/createUserTtsRequestItem";
import { GenerateTtsItem, TtsItem } from "umesseapi/models";
import { TtsCache } from "@/repository/cache/ttsCache";

export function useTtsService(
  ttsApi: UMesseApi.TtsApi,
  ttsCache: TtsCache
) {

  const fetch = async (unisCustomerCd: string, authToken: string): Promise<TtsItem[]> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .listUserTts(unisCustomerCd, authToken)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const generate = async (unisCustomerCd: string, authToken: string, requestModel: GenerateUserTtsRequestItem): Promise<GenerateTtsItem> => {
    const cacheKey = Convert.generateUserTtsRequestItemToJson(requestModel);
    const cacheValue = ttsCache.get<GenerateTtsItem | undefined>(cacheKey);
    if (cacheValue) return cacheValue;

    return new Promise(function (resolve, reject) {
      ttsApi
        .generateUserTts(unisCustomerCd, authToken, requestModel)
        .then((value) => {
          ttsCache.set<GenerateTtsItem>(cacheKey, value.data);
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const create = async (unisCustomerCd: string, authToken: string, requestModel: CreateUserTtsRequestItem): Promise<TtsItem[]> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .createUserTts(unisCustomerCd, authToken, requestModel)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const update = async (unisCustomerCd: string, authToken: string, id: string, title: string, description: string): Promise<TtsItem> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .updateUserTts(unisCustomerCd, authToken, id, {
          title: title,
          description: description,
        })
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const remove = async (unisCustomerCd: string, authToken: string, id: string): Promise<TtsItem> => {
    return new Promise(function (resolve, reject) {
      ttsApi
        .deleteUserTts(id, unisCustomerCd, authToken)
        .then((value) => {
          resolve(value.data);
        })
        .catch((e) => {
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