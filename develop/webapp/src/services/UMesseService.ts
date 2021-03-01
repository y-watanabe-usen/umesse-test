import UMesseApi from "@/repository/UMesseApi";
import UMesseCache from "@/repository/UMesseCache";
import { useResourcesService } from "./resourcesService";

class UMesseService {
  private static _instance: UMesseService;

  private constructor() { }

  get resourcesService() {
    return useResourcesService(UMesseApi.resourcesApi, UMesseApi.recordingApi)
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export default UMesseService.instance;