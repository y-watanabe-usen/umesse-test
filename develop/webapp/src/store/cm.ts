import * as UMesseApi from "umesseapi";
import {
  RecordingFile,
  useUploadRecordingService,
} from "@/services/uploadRecordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide } from "vue";

// generate cm.
export default function cmStore() {
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

export type CMStore = ReturnType<typeof cmStore>;
export const CMStoreKey: InjectionKey<CMStore> = Symbol("CMStore");
export function useCMStore() {
  const store = inject(CMStoreKey);
  if (!store) {
    throw new Error(`${CMStoreKey} is not provided`);
  }
  return store;
}
export function provideCMStore() {
  const store = cmStore();
  provide(CMStoreKey, store);
  return store;
}
