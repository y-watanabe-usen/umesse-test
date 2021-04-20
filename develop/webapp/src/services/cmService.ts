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
import Constants, { Scene } from "@/utils/Constants";
import * as UMesseApi from "umesseapi";
import { Recording, Tts } from "@/models/DisplayCmItem";
import { CmItem } from "umesseapi/models/cm-item";
import { UMesseError, UMesseErrorFromApiFactory } from "@/models/UMesseError";
import { CmCache } from "@/repository/cache/cmCache";
import { CmListItemInner } from "umesseapi/models";

export function useCmService(api: UMesseApi.CmApi, cmCache: CmCache) {
  let timer: number | undefined;

  const fetch = async (
    authToken: string,
    sort?: number
  ): Promise<[Scene[], CmItem[]]> => {
    return new Promise(function (resolve, reject) {
      api
        .listUserCm(authToken, sort)
        .then((response) => {
          const scenes: Scene[] = [];
          const cms: CmItem[] = [];
          response.data.forEach((scene: CmListItemInner) => {
            scenes.push({ cd: scene.sceneCd, name: scene.sceneName });
            scene.details.forEach((cm: CmItem) => {
              cms.push(cm);
            });
          });
          resolve([scenes, cms]);
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
    const requestModel = getCreateUserCmRequestModel(
      narrations,
      startChime,
      endChime,
      bgm,
      id
    );

    const tmp = JSON.parse(JSON.stringify(requestModel));
    delete tmp.id;
    const cacheKey = Convert.createUserCmRequestItemToJson(tmp);
    cmCache.removeOther(cacheKey);
    const cacheValue = cmCache.get<CreateUserCmResponseItem | undefined>(cacheKey);
    if (cacheValue) return cacheValue;

    try {
      console.log("requestModel", JSON.stringify(requestModel));
      const createUserCmResponse = await api.createUserCm(authToken, requestModel);
      console.log("createUserCmResponse", JSON.stringify(createUserCmResponse.data));
      const waitForCreateCompletedResponse = await waitForCreateCompleted(authToken, createUserCmResponse.data.id);
      console.log(JSON.stringify(waitForCreateCompletedResponse));
      cmCache.set<CreateUserCmResponseItem>(cacheKey, waitForCreateCompletedResponse);
      return waitForCreateCompletedResponse;
    } catch (e) {
      if (e instanceof UMesseError) {
        throw e;
      }
      throw UMesseErrorFromApiFactory(e);
    }

  };

  const update = async (
    authToken: string,
    id: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string,
    manuscript: string,
  ): Promise<CmItem> => {
    return new Promise(function (resolve, reject) {
      const requestModel = getUpdateUserCmRequestModel(
        title,
        description,
        sceneCd,
        uploadSystem,
        manuscript
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
    return new Promise(function (resolve, reject) {
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

  const waitForCreateCompleted = async (authToken: string, id: string): Promise<CmItem> => {
    return new Promise(function (resolve, reject) {
      _getUserCm(authToken, id)
        .then((response) => {
          if (response.status !== Constants.CM_STATUS_CREATING) {
            const e = {
              response: {
                status: 408,
              },
            };
            console.log("timeout", response);
            reject(UMesseErrorFromApiFactory(e));
          }
          console.log("resolve");
          console.log("_getUserCm", response);
          resolve(response);
        })
        .catch((e) => {
          clearInterval(timer);
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
    console.log("createUserCmRequestModel", Convert.createUserCmRequestItemToJson(requestModel));
    return requestModel;
  };

  const getUpdateUserCmRequestModel = (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string,
    manuscript: string
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
      uploadSystem:
        uploadSystem != Constants.UPLOAD_SYSTEMS[2].cd
          ? uploadSystem
          : undefined,
      manuscript: manuscript != "" ? manuscript : undefined
    };
    return requestModel;
  };

  const _getUserCm = async (authToken: string, id: string): Promise<CmItem> => {
    clearInterval(timer);
    let count = 0;
    return new Promise(function (resolve) {
      timer = setInterval(async () => {
        console.log("getUserCm", id);
        api.getUserCm(id, authToken).then((value) => {
          console.log(count);
          if (
            value.data.status &&
            value.data.status === Constants.CM_STATUS_CREATING
          ) {
            clearInterval(timer);
            console.log("resolve");
            console.log("getUserCm", value.data);
            resolve(value.data);
          }
          if (count++ > Constants.TIMER_COUNT) {
            clearInterval(timer);
            console.log("resolve timeout");
            console.log("getUserCm", value.data);
            resolve(value.data);
          }
        });
      }, Constants.TIMER);
    });
  };

  return {
    fetch,
    create,
    update,
    remove,
  };
}
