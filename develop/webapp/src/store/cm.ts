import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";
import { config } from "@/utils/UMesseApiConfiguration";
import * as UMesseApi from "umesseapi";
import { useUploadCmService } from "@/services/uploadCmService";
import { CreateUserCmResponseItem } from "@/models/CreateUserCmResponseItem";
import { RecordingItem, TtsItem } from "umesseapi/models";

export function isNarrationItem(arg: any): arg is NarrationItem {
  return arg.contentsId !== undefined;
}
export function isRecordingItem(arg: any): arg is RecordingItem {
  return arg.recordingId !== undefined;
}
export function isTtsItem(arg: any): arg is TtsItem {
  return arg.ttsId !== undefined;
}

export const MAX_NARRATION_COUNT = 4;

export default function cmStore() {
  const cmApi = new UMesseApi.CmApi(config);
  const uploadCmService = useUploadCmService(cmApi);
  const state = reactive({
    // TODO: ここにあるべきじゃない気がするので、あとで移動
    openChimeItem: null as ChimeItem | null,
    narrationItems: [] as (NarrationItem | RecordingItem | TtsItem)[],
    bgmItem: null as BgmItem | null,
    endChimeItem: null as ChimeItem | null,
    selectedNarrationIndex: null as number | null,

    createUserCmResponseItem: null as CreateUserCmResponseItem | null,
    error: undefined as string | undefined,
  });

  const token = "123456789";
  const status = () => uploadCmService.getStatus()

  const create = async () => {
    let narrationContentsIds: string[] = []
    state.narrationItems.forEach((v) => {
      if (isNarrationItem(v)) {
        narrationContentsIds.push(v.contentsId)
      } else if (isRecordingItem(v)) {
        narrationContentsIds.push(v.recordingId)
      } else if (isTtsItem(v)) {
        narrationContentsIds.push(v.ttsId)
      }
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

  const clearNarration = (index: number) => {
    state.narrationItems.splice(index, 1)
  }
  const clearAllNarration = () => {
    state.narrationItems = []
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

  const selectNarrationIndex = (index: number) => {
    state.selectedNarrationIndex = index
  }
  const unSelectNarrationIndex = () => {
    state.selectedNarrationIndex = null
  }

  const setNarration = (narrationItem: NarrationItem | RecordingItem | TtsItem) => {
    if (state.selectedNarrationIndex == null && state.narrationItems.length >= MAX_NARRATION_COUNT) {
      // ナレーションがMAX_NARRATION_COUNT数分あるのに、更に末尾に追加しようとしたら何もしない
      return
    }
    if (state.selectedNarrationIndex != null) {
      state.narrationItems[state.selectedNarrationIndex] = narrationItem
    } else {
      state.narrationItems.push(narrationItem)
    }
    unSelectNarrationIndex();
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

  const narration = (index: number) => {
    return state.narrationItems[index]
  }

  return {
    ...toRefs(state),
    get openChime() {
      return state.openChimeItem
    },
    get endChime() {
      return state.endChimeItem
    },
    narration,
    get narrations() {
      return state.narrationItems
    },
    get bgm() {
      return state.bgmItem
    },
    get createCmData() {
      return state.createUserCmResponseItem
    },
    clearNarration,
    clearAllNarration,
    clearOpenChime,
    clearEndChime,
    clearBgm,
    selectNarrationIndex,
    unSelectNarrationIndex,
    setNarration,
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
