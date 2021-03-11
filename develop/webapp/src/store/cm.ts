import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";
import { CmItem, RecordingItem, TtsItem } from "umesseapi/models";
import DisplayCmItem from "@/models/DisplayCmItem";
import UMesseService from "@/services/UMesseService";

export const MAX_NARRATION_COUNT = 4;

export default function cmStore() {
  const service = UMesseService.uploadCmService;
  const state = reactive({
    displayCmItem: new DisplayCmItem(),
    selectedNarrationIndex: null as number | null,
    error: undefined as string | undefined,
  });

  const status = () => service.getStatus();

  const create = async (authToken: string) => {
    const response = await service.create(
      authToken,
      state.displayCmItem.narrations,
      state.displayCmItem.openChime?.id ?? null,
      state.displayCmItem.endChime?.id ?? null,
      state.displayCmItem.bgm?.id ?? null
    );
    console.log(response);
    state.displayCmItem.id = response.id;
    state.displayCmItem.timestamp = response.timestamp;
    state.displayCmItem.seconds = response.seconds;
    state.displayCmItem.url = response.url ?? "";
  };

  const update = async (
    authToken: string,
    title: string,
    description: string | null,
    sceneCd: string,
    uploadSystem: string
  ) => {
    await service.update(
      authToken,
      state.displayCmItem.id,
      title,
      description,
      sceneCd,
      uploadSystem
    );
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
  const clearAll = () => {
    state.displayCmItem.reset();
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
