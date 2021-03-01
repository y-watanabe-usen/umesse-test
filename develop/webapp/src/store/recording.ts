import {
  RecordingFile,
  useUploadRecordingService,
} from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { RecordingItem } from "umesseapi/models/recording-item";
import UMesseApi from "@/repository/UMesseApi";

// recording.
export default function recordingStore() {
  const uploadRecordingService = useUploadRecordingService(UMesseApi.recordingApi);
  const { auth, cm } = useGlobalStore();
  const state = reactive({
    recordingItems: [] as RecordingItem[],
    error: undefined as string | undefined,
  });

  const token = () => auth.getToken() || "123456789";

  const fetchRecordingData = async () => {
    try {
      const response = await UMesseApi.recordingApi.listUserRecording(token());
      state.recordingItems = response.data;
      console.log("response.data", response.data)
    } catch (err) {
      state.error = err.message;
    }
  };

  const getUserRecording = (id: string) => {
    const item = state.recordingItems.find((element) => element.recordingId === id);
    return item;
    //    const item = await umesseApi.getUserRecording(
    //      state.recordingItems[0].id,
    //      token()
    //    );
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
    const response = await uploadRecordingService.upload(token(), recordingFile);
    fetchRecordingData();
    return response;
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
