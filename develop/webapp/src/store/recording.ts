import { RecordingFile } from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { RecordingItem } from "umesseapi/models/recording-item";
import UMesseApi from "@/repository/UMesseApi";
import UMesseService from "@/services/UMesseService";
import { UMesseErrorFromApiFactory } from "@/models/UMesseError";

// recording.
export default function recordingStore() {
  const { auth } = useGlobalStore();
  const state = reactive({
    recordingItems: [] as RecordingItem[],
    error: undefined as string | undefined,
  });

  const token = () => <string>auth.getToken();

  const fetchRecordingData = async () => {
    try {
      const response = await UMesseApi.recordingApi.listUserRecording(token());
      state.recordingItems = response.data;
      console.log("response.data", response.data);
    } catch (e) {
      state.error = e.message;
      console.log("error", e);
      throw UMesseErrorFromApiFactory(e);
    }
  };

  const getUserRecording = (id: string) => {
    const item = state.recordingItems.find((element) => element.id === id);
    return item;
  };

  const deleteUserRecording = async (id: string) => {
    await UMesseApi.recordingApi.deleteUserRecording(id, token());
  };
  const updateUserRecording = async (
    id: string,
    title: string,
    description: string
  ) => {
    UMesseApi.recordingApi.updateUserRecording(token(), id, {
      title: title,
      description: description,
    });
  };

  const uploadRecordingData = async (recordingFile: RecordingFile) => {
    try {
      const response = await UMesseService.uploadRecordingService.upload(
        token(),
        recordingFile
      );
      fetchRecordingData();
      return response;
    } catch (e) {
      console.log("error", e);
      throw e;
    }
  };

  return {
    ...toRefs(state),
    uploadRecordingData,
    fetchRecordingData,
    getUserRecording,
    deleteUserRecording,
    updateUserRecording,
    // ...UMesseService.uploadRecordingService,
  };
}

export type RecordingStore = ReturnType<typeof recordingStore>;
export const RecordingStoreKey: InjectionKey<RecordingStore> = Symbol(
  "RecordingStore"
);
export function useRecordingStore() {
  const store = inject(RecordingStoreKey);
  if (!store) {
    throw new Error(`${RecordingStoreKey} is not provided`);
  }
  return store;
}
export function provideRecordingStore() {
  const store = recordingStore();
  provide(RecordingStoreKey, store);
  return store;
}
