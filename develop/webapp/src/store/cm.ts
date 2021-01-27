import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";

export default function cmStore() {
  const state = reactive({
    openChimeItem: null as ChimeItem | null,
    narrationItems: [] as NarrationItem[],
    bgmItem: null as BgmItem | null,
    endChimeItem: null as ChimeItem | null,
    error: undefined as string | undefined,
  });

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
    clearOpenChime,
    clearEndChime,
    clearBgm,
    setOpenChime,
    setEndChime,
    setBgm,
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
