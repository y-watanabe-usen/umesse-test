import { RecordingFile } from "@/services/recordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { RecordingItem } from "umesseapi/models/recording-item";
import { recordingService } from "@/services";

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
      return await recordingService.fetch(token());
    } catch (e) {
      // console.log("error", e);
    }
  };

  const getUserRecording = (id: string) => {
    const item = state.recordingItems.find((element) => element.id === id);
    return item;
  };

  const deleteUserRecording = async (id: string) => {
    try {
      return await recordingService.remove(token(), id);
    } catch (e) {
      // console.log("error", e);
    }
  };
  const updateUserRecording = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      return await recordingService.update(token(), id, title, description);
    } catch (e) {
      // console.log("error", e);
    }
  };

  const uploadRecordingData = async (recordingFile: RecordingFile) => {
    try {
      const response = await recordingService.upload(
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
