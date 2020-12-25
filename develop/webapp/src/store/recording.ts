import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadRecordingService,
} from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { RecordingItem } from "umesseapi/models/recording-item";

// recording.
export default function recordingStore() {
  const umesseApi = new UMesseApi.RecordingApi();
  const uploadRecordingService = useUploadRecordingService(umesseApi);
  const { auth } = useGlobalStore();
  const state = reactive({
    recordingItems: [] as RecordingItem[],
    error: undefined as string | undefined,
  });

  const token = () => auth.getToken() || "123456789";

  const fetchRecordingData = async () => {
    try {
      const response = await umesseApi.listUserRecording(token());
      state.recordingItems = response.data;
    } catch (err) {
      state.error = err.message;
    }
  };

  const getUserRecording = async (id: string) => {
    const item = state.recordingItems.find((element) => element.id === id);
    return item;
    //    const item = await umesseApi.getUserRecording(
    //      state.recordingItems[0].id,
    //      token()
    //    );
  };

  const deleteUserRecording = async (id: string) => {
    await umesseApi.deleteUserRecording(id, token());
  };
  const updateUserRecording = async (title: string, description: string) => {
    const lastId = state.recordingItems[state.recordingItems.length - 1].id;
    umesseApi.updateUserRecording(token(), lastId, {
      title: title,
      description: description,
    });
  };

  const uploadRecordingData = async (recordingFile: RecordingFile) => {
    await uploadRecordingService.upload(token(), recordingFile);
    fetchRecordingData();
  };

  return {
    ...toRefs(state),
    uploadRecordingData,
    fetchRecordingData,
    getUserRecording,
    deleteUserRecording,
    updateUserRecording,
    ...uploadRecordingService,
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
