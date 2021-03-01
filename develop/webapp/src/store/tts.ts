import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadTtsService,
} from "@/services/uploadTtsService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { TtsItem } from "umesseapi/models/tts-item";
import { config } from "@/utils/UMesseApiConfiguration";
import { GenerateUserTtsRequestItem } from "@/models/GenerateUserTtsRequestItem";

interface TtsData {
  url: string,
  lang: string,
}

// tts.
export default function ttsStore() {
  const umesseApi = new UMesseApi.TtsApi(config);
  const uploadTtsService = useUploadTtsService(umesseApi);
  const { auth } = useGlobalStore();
  const state = reactive({
    ttsItems: [] as TtsItem[],
    ttsDatas: [] as TtsData[],
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

  const hasTtsData = () => (state.ttsDatas.length !== 0);
  const resetTtsData = () => state.ttsDatas = [];

  const getTtsData = async (lang: string) => {
    if (!hasTtsData()) {
      return undefined;
    }
    const data = state.ttsDatas.find((element) => element.lang === lang);
    return data;
  };

  const createTtsData = async (text: String, speaker: String) => {
    // if (hasTtsData()) {
    //   resetTtsData();
    // }
    // try {
    //   state.creating = true
    //   const response = await umesseApi.generateUserTts(
    //     token(), [
    //     {
    //       "text": "こんにちは",
    //       "lang": "ja",
    //       "speaker": "0"
    //     },
    //     {
    //       "text": "hello",
    //       "lang": "en",
    //       "speaker": "1"
    //     }
    //   ])
    //   console.log(response.data.tts)
    //   console.log(response.data.tts[0].url)
    //   state.ttsUrl = response.data.tts[0].url
    //   // const binary = atob(response.data.body);
    //   // state.ttsData = Uint8Array.from(binary, c => c.charCodeAt(0));
    // } catch (err) {
    //   console.log(err);
    //   state.error = err.message;
    // } finally {
    //   state.creating = false
    // }
  };

  const generateTtsData = async (
    text: { [key: string]: string },
    storeName: string,
    endTime: string,
    speaker: string,
    langs: string[]
  ) => {
    if (hasTtsData()) {
      resetTtsData();
    }

    try {
      state.creating = true

      // TODO: lang毎の変換処理

      let requestModel: GenerateUserTtsRequestItem[] = []
      langs.forEach((v) => {
        requestModel.push({
          text: text[v]
            .replace("{storeName}", storeName)
            .replace("{endTime}", endTime),
          lang: v,
          speaker: speaker,
        })
      })
      console.log(requestModel)
      const response = await umesseApi.generateUserTts(
        token(), requestModel)
      console.log(response.data.tts)
      state.ttsDatas = response.data.tts
    } catch (err) {
      console.log(err);
      state.error = err.message;
    } finally {
      state.creating = false
    }
  };

  return {
    ...toRefs(state),
    uploadTtsData,
    fetchTtsData,
    getUserTts,
    deleteUserTts,
    updateUserTts,
    getTtsData,
    createTtsData,
    generateTtsData,
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
