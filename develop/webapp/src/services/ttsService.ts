import * as UMesseApi from "umesseapi";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { GenerateUserTtsRequestItem } from "@/models/GenerateUserTtsRequestItem";
import { CreateUserTtsRequestItem } from "@/models/CreateUserTtsRequestItem";
import { GenerateTtsItem, TtsItem } from "umesseapi/models";

export function ttsService(
  ttsApi: UMesseApi.TtsApi
) {

  const fetchData = async (authToken: string): Promise<TtsItem[]> => {
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
    return new Promise(function (resolve, reject) {
      ttsApi
        .generateUserTts(authToken, requestModel)
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
    fetchData,
    generate,
    create,
    update,
    remove,
  };
}