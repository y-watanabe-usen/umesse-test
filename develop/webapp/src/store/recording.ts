import { RecordingFile } from "@/services/recordingService";
import { useGlobalStore } from "@/store";
import { inject, InjectionKey, provide, reactive, toRefs } from "vue";
import { RecordingItem } from "umesseapi/models/recording-item";
import { recordingService } from "@/services";
import { UMesseError } from "@/models/UMesseError";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants";

export enum UPLOAD_RECORDING_STATE {
  NONE,
  UPLOADING,
  UPLOADED,
  UPDATING,
  UPDATED,
  ERROR,
}

export default function recordingStore() {
  const { auth } = useGlobalStore();
  const state = reactive({
    recordingItems: [] as RecordingItem[],
    status: UPLOAD_RECORDING_STATE.NONE as UPLOAD_RECORDING_STATE,
    error: undefined as string | undefined,
  });

  const token = () => <string>auth.getToken();

  const fetchRecordingData = async () => {
    return await recordingService.fetch(token());
  };

  const getUserRecording = (id: string) => {
    const item = state.recordingItems.find((element) => element.id === id);
    return item;
  };

  const deleteUserRecording = async (id: string) => {
    try {
      const response = await recordingService.remove(token(), id);
      state.status = UPLOAD_RECORDING_STATE.NONE;
      return response;
    } catch (e) {
      state.status = UPLOAD_RECORDING_STATE.ERROR;
      throw e;
    }
  };

  const uploadRecordingData = async (recordingFile: RecordingFile) => {
    try {
      if (state.status === UPLOAD_RECORDING_STATE.UPLOADING) {
        throw new UMesseError(ERROR_CODE.A0001, ERROR_PATTERN.A0001, "");
      }
      // TODO: check arguments here.
      state.status = UPLOAD_RECORDING_STATE.UPLOADING;

      const response = await recordingService.upload(
        token(),
        recordingFile
      );
      fetchRecordingData();
      state.status = UPLOAD_RECORDING_STATE.UPLOADED;
      return response;
    } catch (e) {
      console.log("error", e);
      state.status = UPLOAD_RECORDING_STATE.ERROR;
      throw e;
    }
  };

  const updateUserRecording = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      state.status = UPLOAD_RECORDING_STATE.UPDATING;
      return await recordingService.update(token(), id, title, description);
    } catch (e) {
      state.status = UPLOAD_RECORDING_STATE.UPDATED;
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
