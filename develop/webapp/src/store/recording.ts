import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadRecordingService,
} from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide } from "vue";

// recording.
export default function recordingStore() {
  const umesseApi = new UMesseApi.RecordingApi();
  const uploadRecordingService = useUploadRecordingService(umesseApi);
  const { auth } = useGlobalStore();

  const uploadRecordingData = (recordingFile: RecordingFile) => {
    const token = auth.getToken() || "123456789";
    uploadRecordingService.upload(token, recordingFile);
  };

  return {
    uploadRecordingData,
    ...uploadRecordingService,
  };
}

export type RecordingStore = ReturnType<typeof recordingStore>;
export const RecordingStoreKey: InjectionKey<RecordingStore> = Symbol("RecordingStore");
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
