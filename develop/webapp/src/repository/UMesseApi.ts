import * as api from "umesseapi";
import { config } from "@/repository/UMesseApiConfiguration";

class UMesseApi {
  private static _instance: UMesseApi;

  private _pingApi: api.PingApi
  private _authApi: api.AuthApi
  private _userApi: api.UserApi
  private _cmApi: api.CmApi
  private _recordingApi: api.RecordingApi
  private _ttsApi: api.TtsApi
  private _uploadApi: api.UploadApi
  private _shareApi: api.ShareApi
  private _resourcesApi: api.ResourcesApi
  private _externalApi: api.ExternalApi

  private constructor() {
    this._pingApi = new api.PingApi(config);
    this._authApi = new api.AuthApi(config);
    this._userApi = new api.UserApi(config);
    this._cmApi = new api.CmApi(config);
    this._recordingApi = new api.RecordingApi(config);
    this._ttsApi = new api.TtsApi(config);
    this._uploadApi = new api.UploadApi(config);
    this._shareApi = new api.ShareApi(config);
    this._resourcesApi = new api.ResourcesApi(config);
    this._externalApi = new api.ExternalApi(config);
  }

  get pingApi() {
    return this._pingApi;
  }
  get authApi() {
    return this._authApi;
  }
  get userApi() {
    return this._userApi;
  }
  get cmApi() {
    return this._cmApi;
  }
  get recordingApi() {
    return this._recordingApi;
  }
  get ttsApi() {
    return this._ttsApi;
  }
  get uploadApi() {
    return this._uploadApi;
  }
  get shareApi() {
    return this._shareApi;
  }
  get resourcesApi() {
    return this._resourcesApi;
  }
  get externalApi() {
    return this._externalApi;
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export default UMesseApi.instance;