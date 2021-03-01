import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadTtsService,
} from "@/services/uploadTtsService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { TtsItem } from "umesseapi/models/tts-item";
import { config } from "@/utils/UMesseApiConfiguration";
import { stringifyQuery } from "vue-router";

// tts.
export default function ttsStore() {
  const umesseApi = new UMesseApi.TtsApi(config);
  const resourcesApi = new UMesseApi.ResourcesApi(config)
  const uploadTtsService = useUploadTtsService(umesseApi);
  const { auth } = useGlobalStore();
  const state = reactive({
    ttsItems: [] as TtsItem[],
    ttsData: new Uint8Array(),
    ttsUrl: null as string | null,
    creating: false,
    error: undefined as string | undefined,
  });

  const token = () => auth.getToken() || "123456789";

  const isCreating = () => state.creating

  const fetchTtsData = async () => {
    try {
      const response = await umesseApi.listUserTts(token());
      state.ttsItems = response.data;
      console.log(response.data)
    } catch (err) {
      state.error = err.message;
    }
  };

  const getUserTts = (id: string) => {
    const item = state.ttsItems.find((element) => element.ttsId === id);
    return item;
  };

  const deleteUserTts = async (id: string) => {
    await umesseApi.deleteUserTts(id, token());
  };
  const updateUserTts = async (
    id: string,
    title: string,
    description: string
  ) => {
    umesseApi.updateUserTts(token(), id, {
      title: title,
      description: description,
    });
  };

  const uploadTtsData = async (recordingFile: RecordingFile) => {
    const response = await uploadTtsService.upload(token(), recordingFile);
    fetchTtsData();
    return response;
  };

  const hasTtsData = () => (state.ttsData.length !== 0);
  const resetTtsData = () => state.ttsData = new Uint8Array();

  const getTtsData = async () => {
    return state.ttsUrl
    if (!hasTtsData()) {
      return undefined;
    }
    const blob = new Blob([state.ttsData]);
    const context = new window.AudioContext();

    return new Promise<AudioBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: Event) => {
        context.decodeAudioData(reader.result as ArrayBuffer, (buffer) => {
          resolve(buffer);
        });
      };
      reader.onerror = (event: Event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const createTtsData = async (text: String, speaker: String) => {
    if (hasTtsData()) {
      resetTtsData();
    }
    try {
      state.creating = true
      const response = await umesseApi.generateUserTts(
        token(), [
        {
          "text": "こんにちは",
          "lang": "ja",
          "speaker": "0"
        },
        {
          "text": "hello",
          "lang": "en",
          "speaker": "1"
        }
      ])
      console.log(response.data.tts)
      console.log(response.data.tts[0].url)
      state.ttsUrl = response.data.tts[0].url
      // const binary = atob(response.data.body);
      // state.ttsData = Uint8Array.from(binary, c => c.charCodeAt(0));
    } catch (err) {
      console.log(err);
      state.error = err.message;
    } finally {
      state.creating = false
    }
  };

  const getUploadTtsData = async () => {
    if (!hasTtsData()) {
      return undefined;
    }
    return new Blob([state.ttsData], { type: 'audio/mpeg' });
  }

  return {
    ...toRefs(state),
    uploadTtsData,
    fetchTtsData,
    getUserTts,
    deleteUserTts,
    updateUserTts,
    getTtsData,
    getUploadTtsData,
    createTtsData,
    resetTtsData,
    isCreating,
    ...uploadTtsService,
  };
}

export type TtsStore = ReturnType<typeof ttsStore>;
export const TtsStoreKey: InjectionKey<TtsStore> = Symbol(
  "RecordingStore"
);
export function useTtsStore() {
  const store = inject(TtsStoreKey);
  if (!store) {
    throw new Error(`${TtsStoreKey} is not provided`);
  }
  return store;
}
export function provideTtsStore() {
  const store = ttsStore();
  provide(TtsStoreKey, store);
  return store;
}
