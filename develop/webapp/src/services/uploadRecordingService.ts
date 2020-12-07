import { reactive } from 'vue';

export interface RecordingFile {
    title: string | undefined;
    description: string | undefined;
    blob: Blob | undefined;
}

export enum UPLOAD_RECORDING_STATE {
    NONE,
    UPLOADING,
    UPLOADED,
    ERROR,
}

interface FunctionInterface {
    createUserRecording(s: string, s2: string): Promise<any>;
}
export function useUploadRecordingService(api: FunctionInterface) {
    const state = reactive({
        status: UPLOAD_RECORDING_STATE.NONE as UPLOAD_RECORDING_STATE,
    });

    const getStatus = () => (state.status);

    const upload = async (file: RecordingFile) => {
        if (state.status === UPLOAD_RECORDING_STATE.UPLOADING) { throw new Error(`state is uploading`); }
        // TODO: check arguments here.

        state.status = UPLOAD_RECORDING_STATE.UPLOADING;

        const url = URL.createObjectURL(file.blob);
        api
            .createUserRecording(file.title!, url)
            .then((value) => (state.status = UPLOAD_RECORDING_STATE.UPLOADED))
            .catch((error) => (state.status = UPLOAD_RECORDING_STATE.ERROR))
            .finally(() => URL.revokeObjectURL(url));
    };
    const reset = () => (state.status = UPLOAD_RECORDING_STATE.NONE);
    return {
        upload,
        reset,
        getStatus,
    };
}
