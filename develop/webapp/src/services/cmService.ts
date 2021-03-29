import {
  Bgm,
  Convert,
  CreateUserCmRequestItem,
  EndChime,
  Narration,
  StartChime,
} from "@/models/CreateUserCmRequestItem";
import { CreateUserCmResponseItem } from "@/models/CreateUserCmResponseItem";
import { UpdateUserCmRequestItem } from "@/models/UpdateUserCmRequestItem";
import Constants from "@/utils/Constants";
import * as UMesseApi from "umesseapi";
import { Recording, Tts } from "@/models/DisplayCmItem";
import { CmItem } from "umesseapi/models/cm-item";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { FreeCache } from "@/repository/cache/freeCache";

export function useCmService(api: UMesseApi.CmApi, freeCache: FreeCache) {
  const fetch = async (
    authToken: string,
    sceneCd: string,
    sort?: number
  ): Promise<CmItem[]> => {
    return new Promise(function(resolve, reject) {
      api
        .listUserCm(authToken, sort)
        .then((tmp) => {
          const response = tmp.data.filter((v) => {
            if (!v.scene) return false;
            return v.scene.sceneCd == sceneCd;
          });
          console.log("resolve");
          console.log("listUserCm", response);
          resolve(response);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const create = async (
    authToken: string,
    narrations: (Narration | Recording | Tts)[],
    startChime: StartChime | null,
    endChime: EndChime | null,
    bgm: Bgm | null,
    id?: string
  ): Promise<CreateUserCmResponseItem> => {
    return new Promise(function(resolve, reject) {
      const requestModel = getCreateUserCmRequestModel(
        narrations,
        startChime,
        endChime,
        bgm,
        id
      );

      const cacheKey = Convert.createUserCmRequestItemToJson(requestModel);
      const cacheValue = freeCache.get(cacheKey);
      if (cacheValue) return <CreateUserCmResponseItem>cacheValue;

      api
        .createUserCm(authToken, requestModel)
        .then((value) => {
          freeCache.set(cacheKey, <CreateUserCmResponseItem>value.data);
          console.log("resolve");
          console.log("createUserCm", value.data);
          resolve(<CreateUserCmResponseItem>value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const update = async (
    authToken: string,
    id: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ): Promise<CmItem> => {
    return new Promise(function(resolve, reject) {
      const requestModel = getUpdateUserCmRequestModel(
        title,
        description,
        sceneCd,
        uploadSystem
      );
      api
        .updateUserCm(authToken, id, requestModel)
        .then((value) => {
          console.log("resolve");
          console.log("updateUserCm", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  // deleteは予約語なのでremove
  const remove = async (authToken: string, id: string): Promise<CmItem> => {
    return new Promise(function(resolve, reject) {
      api
        .deleteUserCm(id, authToken)
        .then((value) => {
          console.log("resolve");
          console.log("deleteUserCm", value.data);
          resolve(value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const getCreateUserCmRequestModel = (
    narrations: (Narration | Recording | Tts)[],
    startChime: StartChime | null,
    endChime: EndChime | null,
    bgm: Bgm | null,
    id?: string
  ) => {
    const requestModel: CreateUserCmRequestItem = {
      id: id ?? undefined,
      materials: {
        narrations: narrations,
        startChime: startChime ?? undefined,
        endChime: endChime ?? undefined,
        bgm: bgm ?? undefined,
      },
    };
    console.log(Convert.createUserCmRequestItemToJson(requestModel));
    return requestModel;
  };

  const getUpdateUserCmRequestModel = (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    // TODO: startDate, endDate, Industryは何の値を入れる？
    const requestModel: UpdateUserCmRequestItem = {
      title: title,
      description: description ?? undefined,
      startDate: new Date(2019, 9 - 1, 1, 9, 0, 0).toISOString(),
      endDate: new Date(9999, 12 - 1, 31, 23, 59, 59).toISOString(),
      industry: undefined,
      scene: {
        sceneCd: sceneCd,
        sceneName: Constants.SCENES.find((v) => v.cd == sceneCd)?.name,
      },
      uploadSystem: uploadSystem,
    };
    return requestModel;
  };

  return {
    fetch,
    create,
    update,
    remove,
  };
}
