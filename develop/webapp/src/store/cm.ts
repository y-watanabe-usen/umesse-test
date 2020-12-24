import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadRecordingService,
} from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { ChimeItem } from "umesseapi/models/chime-item";
import { NarrationItem } from "umesseapi/models/narration-item";
import { BgmItem } from "umesseapi/models/bgm-item";

// recording.
export default function cmStore() {
  const umesseApi = new UMesseApi.RecordingApi();
  // const uploadRecordingService = useUploadRecordingService(umesseApi);
  // const { auth } = useGlobalStore();
  const state = reactive({
    openChimeItem: null as ChimeItem | null,
    narrationItems: [] as NarrationItem[],
    bgmItems: [] as BgmItem[],
    endChimeItem: null as ChimeItem | null,
    error: undefined as string | undefined,
  });

  const clearOpenChime = () => {
    state.openChimeItem = null
  }
  const clearEndChime = () => {
    state.endChimeItem = null
  }
  const setOpenChime = (chimeItem: ChimeItem) => {
    state.openChimeItem = chimeItem
  }
  const setEndChime = (chimeItem: ChimeItem) => {
    state.endChimeItem = chimeItem
  }
  // const token = () => auth.getToken() || "123456789";

  // const fetchRecordingData = async () => {
  //   try {
  //     const response = await umesseApi.listUserRecording(token());
  //     state.recordingItems = response.data;
  //   } catch (err) {
  //     state.error = err.message;
  //   }
  // };

  // const uploadRecordingData = async (recordingFile: RecordingFile) => {
  //   await uploadRecordingService.upload(token(), recordingFile);
  //   fetchRecordingData();
  // };

  return {
    ...toRefs(state),
    get openChime() {
      return state.openChimeItem
    },
    get endChime() {
      return state.endChimeItem
    },
    clearOpenChime,
    clearEndChime,
    setOpenChime,
    setEndChime,
    // uploadRecordingData,
    // ...uploadRecordingService,
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
