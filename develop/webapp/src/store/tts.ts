import globalStore, { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { TtsItem } from "umesseapi/models/tts-item";
import { GenerateUserTtsRequestItem } from "@/models/GenerateUserTtsRequestItem";
import { CreateUserTtsRequestItem } from "@/models/CreateUserTtsRequestItem";
import UMesseApi from "@/repository/UMesseApi";

interface TtsData {
  url: string,
  lang: string,
}

// tts.
export default function ttsStore() {
  const { auth } = useGlobalStore();
  const state = reactive({
    ttsItems: [] as TtsItem[],
    ttsDatas: [] as TtsData[],
    generating: false,
    creating: false,
    error: undefined as string | undefined,
  });

  const token = () => auth.getToken() || "123456789";

  const isGenerating = () => state.generating
  const isCreating = () => state.creating

  const fetchTtsData = async () => {
    try {
      const response = await UMesseApi.ttsApi.listUserTts(token());
      state.ttsItems = response.data;
      console.log(response.data)
    } catch (err) {
      state.error = err.message;
    }
  };

  const getUserTts = (id: string) => {
    const item = state.ttsItems.find((element) => element.id === id);
    return item;
  };

  const deleteUserTts = async (id: string) => {
    await UMesseApi.ttsApi.deleteUserTts(id, token());
  };
  const updateUserTts = async (
    id: string,
    title: string,
    description: string
  ) => {
    UMesseApi.ttsApi.updateUserTts(token(), id, {
      title: title,
      description: description,
    });
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

  const generateTtsDataFromTemplate = async (
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
      state.generating = true

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
      const response = await UMesseApi.ttsApi.generateUserTts(
        token(), requestModel)
      console.log(response.data.details)
      state.ttsDatas = response.data.details
    } catch (err) {
      console.log(err);
      state.error = err.message;
    } finally {
      state.generating = false
    }
  };

  const generateTtsDataFromFree = async (
    text: string,
    speaker: string,
  ) => {
    if (hasTtsData()) {
      resetTtsData();
    }

    try {
      state.generating = true
      let requestModel: GenerateUserTtsRequestItem[] = [{
        text: text,
        lang: "ja",
        speaker: speaker,
      }]
      const response = await UMesseApi.ttsApi.generateUserTts(
        token(), requestModel)
      console.log(response.data)
      state.ttsDatas = response.data.details
    } catch (err) {
      console.log(err);
      state.error = err.message;
    } finally {
      state.generating = false
    }
  };

  const createTtsData = async (title: string, description: string, langs: string[]) => {
    try {
      state.creating = true
      let requestModel: CreateUserTtsRequestItem[] = []
      langs.forEach((v) => {
        requestModel.push({
          title: title,
          description: description,
          lang: v,
        })
      })

      const tmp: any = await UMesseApi.ttsApi.createUserTts(token(), requestModel)

      // convert to TtsItem
      let response: TtsItem[] = []
      tmp.data.tts.forEach((element: any) => {
        response.push({
          id: element.id,
          title: element.title,
          description: element.description,
          startDate: element.startDate,
          timestamp: element.timestamp,
        })
      });
      return response;
    } catch (err) {
      console.log(err);
      state.error = err.message;
    } finally {
      state.creating = false
    }
  };

  return {
    ...toRefs(state),
    fetchTtsData,
    getUserTts,
    deleteUserTts,
    updateUserTts,
    getTtsData,
    createTtsData,
    generateTtsDataFromTemplate,
    generateTtsDataFromFree,
    resetTtsData,
    isGenerating,
    isCreating,
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
