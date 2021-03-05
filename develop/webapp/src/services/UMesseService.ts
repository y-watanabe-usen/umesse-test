import UMesseApi from "@/repository/UMesseApi";
import { useResourcesService } from "@/services/resourcesService";
import { useUploadCmService } from "@/services/uploadCmService";
import { useUploadRecordingService } from "@/services/uploadRecordingService";

class UMesseService {
  private static _instance: UMesseService;

  get resourcesService() {
    return useResourcesService(UMesseApi.resourcesApi, UMesseApi.recordingApi, UMesseApi.ttsApi);
  }

  get uploadCmService() {
    return useUploadCmService(UMesseApi.cmApi);
  }

  get uploadRecordingService() {
    return useUploadRecordingService(UMesseApi.recordingApi);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export default UMesseService.instance;