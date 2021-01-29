import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";
import { config } from "@/utils/UMesseApiConfiguration";
import * as UMesseApi from "umesseapi";
import { useUploadCmService } from "@/services/uploadCmService";
import { CreateUserCmResponseItem } from "@/models/CreateUserCmResponseItem";

export default function cmStore() {
  const cmApi = new UMesseApi.CmApi(config);
  cmApi.createUserCm
  const uploadCmService = useUploadCmService(cmApi);
  const state = reactive({
    // TODO: ここにあるべきじゃない気がするので、あとで移動
    openChimeItem: null as ChimeItem | null,
    narrationItems: [] as NarrationItem[],
    bgmItem: null as BgmItem | null,
    endChimeItem: null as ChimeItem | null,

    createUserCmResponseItem: null as CreateUserCmResponseItem | null,
    error: undefined as string | undefined,
  });

  const token = "123456789";
  const status = () => uploadCmService.getStatus()

  const create = async () => {
    let narrationContentsIds: string[] = []
    state.narrationItems.forEach((v) => {
      narrationContentsIds.push(v.contentsId)
    })
    const response = await uploadCmService.create(
      token,
      narrationContentsIds,
      state.openChimeItem?.contentsId,
      state.endChimeItem?.contentsId,
      state.bgmItem?.contentsId
    )
    state.createUserCmResponseItem = <CreateUserCmResponseItem>response
    console.log(response)
  }

  const update = async (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    if (state.createUserCmResponseItem == null) return
    const response = await uploadCmService.update(
      token,
      state.createUserCmResponseItem.cmId,
      title,
      description,
      sceneCd,
      uploadSystem
    )
  }

  const clearOpenChime = () => {
    state.openChimeItem = null
  }
  const clearEndChime = () => {
    state.endChimeItem = null
  }
  const clearBgm = () => {
    state.bgmItem = null
  }
  const setOpenChime = (chimeItem: ChimeItem) => {
    state.openChimeItem = chimeItem
  }
  const setEndChime = (chimeItem: ChimeItem) => {
    state.endChimeItem = chimeItem
  }
  const setBgm = (bgmItem: BgmItem) => {
    state.bgmItem = bgmItem
  }

  return {
    ...toRefs(state),
    get openChime() {
      return state.openChimeItem
    },
    get endChime() {
      return state.endChimeItem
    },
    get narrations() {
      return state.narrationItems
    },
    get bgm() {
      return state.bgmItem
    },
    get createCmData() {
      return state.createUserCmResponseItem
    },
    clearOpenChime,
    clearEndChime,
    clearBgm,
    setOpenChime,
    setEndChime,
    setBgm,
    create,
    update,
    status,
  };
}

export type CmStore = ReturnType<typeof cmStore>;
export const CmStoreKey: InjectionKey<CmStore> = Symbol(
  "CmStore"
);
export function useCmStore() {
  const store = inject(CmStoreKey);
  if (!store) {
    throw new Error(`${CmStoreKey} is not provided`);
  }
  return store;
}
export function provideRecordingStore() {
  const store = cmStore();
  provide(CmStoreKey, store);
  return store;
}
