import { reactive } from "vue";
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

export enum UPLOAD_CM_STATE {
  NONE,
  CREATING,
  CREATED,
  UPDATING,
  UPDATED,
  ERROR,
}

export function useUploadCmService(api: UMesseApi.CmApi) {
  const state = reactive({
    status: UPLOAD_CM_STATE.NONE as UPLOAD_CM_STATE,
  });

  const getStatus = () => state.status;

  const fetchCm = async (
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
    bgm: Bgm | null
  ): Promise<CreateUserCmResponseItem> => {
    return new Promise(function(resolve, reject) {
      if (state.status === UPLOAD_CM_STATE.CREATING) {
        return reject(new Error(`state is creating`));
      }
      // TODO: check arguments here.
      state.status = UPLOAD_CM_STATE.CREATING;

      const requestModel = getCreateUserCmRequestModel(
        narrations,
        startChime,
        endChime,
        bgm
      );
      api
        .createUserCm(authToken, requestModel)
        .then((value) => {
          console.log("resolve");
          console.log("createUserCm", value.data);
          state.status = UPLOAD_CM_STATE.CREATED;
          resolve(<CreateUserCmResponseItem>value.data);
        })
        .catch((e) => {
          console.log("reject", e);
          (state.status = UPLOAD_CM_STATE.ERROR);
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
  ) => {
    return new Promise(function(resolve, reject) {
      // if (state.status !== UPLOAD_CM_STATE.CREATED) {
      //   return reject(new Error(`state is not created`));
      // }
      // TODO: check arguments here.
      state.status = UPLOAD_CM_STATE.UPDATING;

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
          resolve(state.status = UPLOAD_CM_STATE.UPDATED);
        })
        .catch((e) => {
          console.log("reject", e);
          (state.status = UPLOAD_CM_STATE.ERROR);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  // deleteは予約語なのでremove
  const remove = async (authToken: string, id: string) => {
    return new Promise(function(resolve, reject) {
      api
        .deleteUserCm(id, authToken)
        .then((value) => {
          console.log("resolve");
          console.log("deleteUserCm", value.data);
          resolve(state.status = UPLOAD_CM_STATE.NONE);
        })
        .catch((e) => {
          console.log("reject", e);
          (state.status = UPLOAD_CM_STATE.ERROR);
          reject(UMesseErrorFromApiFactory(e));
        });
    });
  };

  const getCreateUserCmRequestModel = (
    narrations: (Narration | Recording | Tts)[],
    startChime: StartChime | null,
    endChime: EndChime | null,
    bgm: Bgm | null
  ) => {
    const requestModel: CreateUserCmRequestItem = {
      materials: {
        narrations: narrations,
        startChime: startChime,
        endChime: endChime,
        bgm: bgm,
      },
    };

    startChime ? null : delete requestModel.materials?.startChime;
    endChime ? null : delete requestModel.materials?.endChime;
    bgm ? null : delete requestModel.materials?.bgm;

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
    fetchCm,
    create,
    update,
    remove,
    getStatus,
  };
}
