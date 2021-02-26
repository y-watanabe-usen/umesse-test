import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";
import { config } from "@/utils/UMesseApiConfiguration";
import * as UMesseApi from "umesseapi";
import { useUploadCmService } from "@/services/uploadCmService";
import { CmItem, RecordingItem, TtsItem } from "umesseapi/models";
import DisplayCmItem, { Narration, Recording, Tts } from "@/models/DisplayCmItem";
import Constants from "@/utils/Constants";

export function isNarration(arg: any): arg is Narration {
  return arg.contentsId !== undefined;
}
export function isRecording(arg: any): arg is Recording {
  return arg.recordingId !== undefined;
}
export function isTts(arg: any): arg is Tts {
  return arg.ttsId !== undefined;
}

export const MAX_NARRATION_COUNT = 4;

export default function cmStore() {
  const cmApi = new UMesseApi.CmApi(config);
  const uploadCmService = useUploadCmService(cmApi);
  const state = reactive({
    displayCmItem: new DisplayCmItem(),
    selectedNarrationIndex: null as number | null,
    error: undefined as string | undefined,
  });

  const token = "123456789";
  const status = () => uploadCmService.getStatus()

  const create = async () => {
    let narrationContentsIds: string[] = []
    state.displayCmItem.narrations.forEach((v) => {
      if (isNarration(v)) {
        narrationContentsIds.push(v.contentsId)
      } else if (isRecording(v)) {
        narrationContentsIds.push(v.recordingId)
      } else if (isTts(v)) {
        narrationContentsIds.push(v.ttsId)
      }
    })
    const response = await uploadCmService.create(
      token,
      narrationContentsIds,
      state.displayCmItem.openChime?.contentsId ?? null,
      state.displayCmItem.endChime?.contentsId ?? null,
      state.displayCmItem.bgm?.contentsId ?? null
    )
    console.log(response)
    state.displayCmItem.cmId = response.cmId
    state.displayCmItem.timestamp = response.timestamp
    state.displayCmItem.seconds = response.seconds
    state.displayCmItem.url = response.url!
  }

  const update = async (
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    const response = await uploadCmService.update(
      token,
      state.displayCmItem.cmId,
      title,
      description,
      sceneCd,
      uploadSystem
    )
  }

  const clearNarration = (index: number) => {
    state.displayCmItem.clearNarraion(index)
  }
  const clearAllNarration = () => {
    state.displayCmItem.clearAllNaraion()
  }
  const clearOpenChime = () => {
    state.displayCmItem.clearOpenChime()
  }
  const clearEndChime = () => {
    state.displayCmItem.clearEndChime()
  }
  const clearBgm = () => {
    state.displayCmItem.clearBgm()
  }
  const clearAll = () => {
    state.displayCmItem.reset()
  }

  const selectNarrationIndex = (index: number) => {
    state.selectedNarrationIndex = index
  }
  const unSelectNarrationIndex = () => {
    state.selectedNarrationIndex = null
  }

  const setNarration = (narrationItem: NarrationItem | RecordingItem | TtsItem) => {
    if (state.selectedNarrationIndex == null && state.displayCmItem.narrations.length >= MAX_NARRATION_COUNT) {
      // ナレーションがMAX_NARRATION_COUNT数分あるのに、更に末尾に追加しようとしたら何もしない
      return
    }
    let id = ""
    let category = ""
    if (isNarration(narrationItem)) {
      id = narrationItem.contentsId
      category = Constants.CATEGORY.NARRATION
    } else if (isRecording(narrationItem)) {
      id = narrationItem.recordingId
      category = Constants.CATEGORY.RECORDING
    } else if (isTts(narrationItem)) {
      id = narrationItem.ttsId
      category = Constants.CATEGORY.TTS
    }
    state.displayCmItem.setNarraion(
      state.selectedNarrationIndex,
      category,
      id,
      narrationItem.title,
      narrationItem.description,
      0, //narrationItem.seconds,
      narrationItem.timestamp,
    )
    unSelectNarrationIndex();
  }
  const setOpenChime = (chimeItem: ChimeItem) => {
    state.displayCmItem.setOpenChime(
      chimeItem.contentsId,
      chimeItem.title,
      chimeItem.description,
      chimeItem.seconds,
      chimeItem.timestamp
    )
  }
  const setEndChime = (chimeItem: ChimeItem) => {
    state.displayCmItem.setEndChime(
      chimeItem.contentsId,
      chimeItem.title,
      chimeItem.description,
      chimeItem.seconds,
      chimeItem.timestamp
    )
  }
  const setBgm = (bgmItem: BgmItem) => {
    state.displayCmItem.setBgm(
      bgmItem.contentsId,
      bgmItem.title,
      bgmItem.description,
      bgmItem.seconds,
      bgmItem.timestamp
    )
  }
  const setCm = (cmItem: CmItem) => {
    state.displayCmItem.setCm(cmItem)
  }

  const narration = (index: number) => state.displayCmItem.narration(index)

  return {
    ...toRefs(state),
    narration,
    get narrations() {
      return state.displayCmItem.narrations
    },
    get openChime() {
      return state.displayCmItem.openChime
    },
    get endChime() {
      return state.displayCmItem.endChime
    },
    get bgm() {
      return state.displayCmItem.bgm
    },
    get url() {
      return state.displayCmItem.url
    },
    clearNarration,
    clearAllNarration,
    clearOpenChime,
    clearEndChime,
    clearBgm,
    clearAll,
    selectNarrationIndex,
    unSelectNarrationIndex,
    setNarration,
    setOpenChime,
    setEndChime,
    setBgm,
    setCm,
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
