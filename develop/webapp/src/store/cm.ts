import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";
import { CmItem, RecordingItem, TtsItem } from "umesseapi/models";
import DisplayCmItem from "@/models/DisplayCmItem";
import { cmService } from "@/services";
import { UMesseError } from "@/models/UMesseError";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";

export const MAX_NARRATION_COUNT = 4;

export enum UPLOAD_CM_STATE {
  NONE,
  CREATING,
  CREATED,
  UPDATING,
  UPDATED,
  ERROR,
}

export default function cmStore() {
  const service = cmService;

  const state = reactive({
    displayCmItem: new DisplayCmItem(),
    selectedNarrationIndex: null as number | null,
    status: UPLOAD_CM_STATE.NONE as UPLOAD_CM_STATE,
    error: undefined as string | undefined,
  });

  const status = () => state.status;

  const create = async (authToken: string) => {
    if (state.status === UPLOAD_CM_STATE.CREATING) {
      throw new UMesseError(ERROR_CODE.A0001, ERROR_PATTERN.A0001, "");
    }
    // TODO: check arguments here.
    state.status = UPLOAD_CM_STATE.CREATING;
    const response = await service.create(
      authToken,
      state.displayCmItem.narrations,
      state.displayCmItem.openChime,
      state.displayCmItem.endChime,
      state.displayCmItem.bgm,
      state.displayCmItem.id
    );
    console.log(response);
    state.displayCmItem.id = response.id;
    state.displayCmItem.timestamp = response.timestamp;
    state.displayCmItem.seconds = response.seconds;
    state.displayCmItem.url = response.url ?? "";
    state.status = UPLOAD_CM_STATE.CREATED;
  };

  const update = async (
    authToken: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    try {
      state.status = UPLOAD_CM_STATE.UPDATING;
      await service.update(
        authToken,
        state.displayCmItem.id,
        title,
        description,
        sceneCd,
        uploadSystem
      );
      state.status = UPLOAD_CM_STATE.UPDATED;
    } catch (e) {
      state.status = UPLOAD_CM_STATE.ERROR;
      throw e;
    }
  };

  const clearNarration = (index: number) => {
    state.displayCmItem.clearNarraion(index);
  };
  const clearAllNarration = () => {
    state.displayCmItem.clearAllNaraion();
  };
  const clearOpenChime = () => {
    state.displayCmItem.clearOpenChime();
  };
  const clearEndChime = () => {
    state.displayCmItem.clearEndChime();
  };
  const clearBgm = () => {
    state.displayCmItem.clearBgm();
  };
  const reset = () => {
    state.displayCmItem.reset();
    state.status = UPLOAD_CM_STATE.NONE;
  };

  const selectNarrationIndex = (index: number) => {
    state.selectedNarrationIndex = index;
  };
  const unSelectNarrationIndex = () => {
    state.selectedNarrationIndex = null;
  };

  const setNarration = (
    narrationItem: NarrationItem | RecordingItem | TtsItem
  ) => {
    if (
      state.selectedNarrationIndex == null &&
      state.displayCmItem.narrations.length >= MAX_NARRATION_COUNT
    ) {
      // ナレーションがMAX_NARRATION_COUNT数分あるのに、更に末尾に追加しようとしたら何もしない
      return;
    }
    console.log(narrationItem);
    state.displayCmItem.setNarraion(
      state.selectedNarrationIndex,
      narrationItem.category,
      narrationItem.id,
      narrationItem.title,
      narrationItem.description,
      0, //narrationItem.seconds,
      narrationItem.timestamp
    );
    unSelectNarrationIndex();
  };
  const setOpenChime = (chimeItem: ChimeItem) => {
    state.displayCmItem.setOpenChime(
      chimeItem.id,
      chimeItem.title,
      chimeItem.description,
      chimeItem.seconds,
      chimeItem.timestamp
    );
  };
  const setEndChime = (chimeItem: ChimeItem) => {
    state.displayCmItem.setEndChime(
      chimeItem.id,
      chimeItem.title,
      chimeItem.description,
      chimeItem.seconds,
      chimeItem.timestamp
    );
  };
  const setBgm = (bgmItem: BgmItem) => {
    state.displayCmItem.setBgm(
      bgmItem.id,
      bgmItem.title,
      bgmItem.description,
      bgmItem.seconds,
      bgmItem.timestamp
    );
  };
  const setCm = (cmItem: CmItem) => {
    state.displayCmItem.setCm(cmItem);
    state.status = UPLOAD_CM_STATE.NONE;
  };

  const narration = (index: number) => state.displayCmItem.narration(index);

  return {
    ...toRefs(state),
    narration,
    get narrations() {
      return state.displayCmItem.narrations;
    },
    get openChime() {
      return state.displayCmItem.openChime;
    },
    get endChime() {
      return state.displayCmItem.endChime;
    },
    get bgm() {
      return state.displayCmItem.bgm;
    },
    get url() {
      return state.displayCmItem.url;
    },
    get secounds() {
      return state.displayCmItem.seconds;
    },
    get title() {
      return state.displayCmItem.title;
    },
    get description() {
      return state.displayCmItem.description;
    },
    clearNarration,
    clearAllNarration,
    clearOpenChime,
    clearEndChime,
    clearBgm,
    reset,
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
export const CmStoreKey: InjectionKey<CmStore> = Symbol("CmStore");
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
