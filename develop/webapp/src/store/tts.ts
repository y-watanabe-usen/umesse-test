import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { TtsItem } from "umesseapi/models/tts-item";
import {
  GenerateUserTtsRequestDetailItem,
  GenerateUserTtsRequestItem,
} from "@/models/generateUserTtsRequestItem";
import {
  CreateUserTtsRequestDetailItem,
  CreateUserTtsRequestItem,
} from "@/models/createUserTtsRequestItem";
import { TemplateDetailItem } from "@/models/templateDetailItem";
import { ttsService } from "@/services";
import ttsTextConverter from "@/utils/ttsTextConverter";
import Constants from "@/utils/constants";

interface TtsData {
  url: string;
  lang: string;
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

  const token = () => <string>auth.getToken();

  const isGenerating = () => state.generating;
  const isCreating = () => state.creating;

  const fetchTtsData = async () => {
    try {
      const response = await ttsService.fetch(token());
      state.ttsItems = response;
    } catch (e) {
      // throw new e;
    }
  };

  const getUserTts = (id: string) => {
    const item = state.ttsItems.find((element) => element.id === id);
    return item;
  };

  const deleteUserTts = async (id: string) => {
    try {
      await ttsService.remove(token(), id);
    } catch (e) {
      // throw new e;
    }
  };

  const updateUserTts = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      await ttsService.update(token(), id, title, description);
    } catch (e) {
      // throw new e;
    }
  };

  const hasTtsData = () => state.ttsDatas.length !== 0;
  const resetTtsData = () => (state.ttsDatas = []);

  const getTtsData = async (lang: string) => {
    if (!hasTtsData()) {
      return undefined;
    }
    const data = state.ttsDatas.find((element) => element.lang === lang);
    return data;
  };

  const generateTtsDataFromTemplate = async (
    templateDetails: TemplateDetailItem[],
    langs: string[],
    speaker: string,
    customerName: string,
    endTime: string,
    percentage: number,
    count: number,
    endYearDate: string,
    newYearDate: string,
    age: number,
    minutes: number,
    point: number
  ) => {
    if (hasTtsData()) {
      resetTtsData();
    }

    try {
      state.generating = true;

      const details: GenerateUserTtsRequestDetailItem[] = [];
      langs.forEach((v) => {
        const templateDetail = templateDetails.find(
          (vv) => vv.lang == v && vv.speaker == speaker
        );
        if (!templateDetail) return;
        details.push({
          text: ttsTextConverter.convertManuscript(
            templateDetail.text,
            v,
            customerName,
            endTime,
            percentage,
            count,
            endYearDate,
            newYearDate,
            age,
            minutes,
            point
          ),
          lang: v,
          speaker: speaker,
        });
      });
      const requestModel: GenerateUserTtsRequestItem = {
        // idとcategoryは後々のバージョンアップで使う予定
        id: "dummy",
        category: Constants.CATEGORY.TEMPLATE,
        details: details,
      };

      const response = await ttsService.generate(token(), requestModel);
      state.ttsDatas = response.details;
      // throw new e;
    } catch (err) {
      state.error = err.message;
      throw err;
    } finally {
      state.generating = false;
    }
  };

  const generateTtsDataFromFree = async (text: string, speaker: string) => {
    if (hasTtsData()) {
      resetTtsData();
    }

    try {
      state.generating = true;
      const requestModel: GenerateUserTtsRequestItem = {
        // idとcategoryは後々のバージョンアップで使う予定
        id: "dummy",
        category: Constants.CATEGORY.FREE,
        details: [
          {
            text: text,
            lang: "ja",
            speaker: speaker,
          },
        ],
      };
      const response = await ttsService.generate(token(), requestModel);
      state.ttsDatas = response.details;
      // throw new e;
    } catch (err) {
      state.error = err.message;
      throw err;
    } finally {
      state.generating = false;
    }
  };

  const createTtsData = async (
    title: string,
    description: string,
    langs: string[],
    manuscript: string[]
  ) => {
    try {
      state.creating = true;
      const details: CreateUserTtsRequestDetailItem[] = [];
      langs.forEach((v, index) => {
        details.push({
          title: title,
          description: description,
          lang: v,
          manuscript: manuscript[index]
            .replace(/\r\n/g, "\n")
            .replace(/\n/g, "\r\n"),
        });
      });
      const requestModel: CreateUserTtsRequestItem = {
        // idとcategoryは後々のバージョンアップで使う予定
        id: "dummy",
        category: Constants.CATEGORY.TEMPLATE,
        details: details,
      };

      try {
        const response = await ttsService.create(token(), requestModel);
        return response;
      } catch (e) {
        // throw new e;
      }
    } catch (err) {
      state.error = err.message;
    } finally {
      state.creating = false;
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
export const TtsStoreKey: InjectionKey<TtsStore> = Symbol("RecordingStore");
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
