import UMesseApi from "@/repository/UMesseApi";
import { resourcesService } from "@/services/resourcesService";
import { cmService } from "@/services/cmService";
import { recordingService } from "@/services/recordingService";
import { ttsService } from "@/services/ttsService";

class UMesseService {
  private static _instance: UMesseService;

  get resourcesService() {
    return resourcesService(UMesseApi.resourcesApi, UMesseApi.recordingApi, UMesseApi.ttsApi);
  }

  get cmService() {
    return cmService(UMesseApi.cmApi);
  }

  get recordingService() {
    return recordingService(UMesseApi.recordingApi);
  }

  get ttsService() {
    return ttsService(UMesseApi.ttsApi);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export default UMesseService.instance;