<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center h4">
          録音する
        </div>
        <span v-if="hasRecordedData === true">
          <button
            type="button"
            class="btn btn-link navbar-brand"
            data-toggle="modal"
            data-target="#saveModal"
          >
            確定
          </button>
        </span>
      </nav>
      <div class="row">
        <div class="m-5">
          <p class="recording" @click="toggleVoiceRecorder">
            <span v-if="isRecording === false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="390"
                height="390"
                viewBox="0 0 390 390"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#0090ea" />
                    <stop offset="1" stop-color="#00baff" />
                    <stop offset="1" stop-color="#3f3f3f" />
                  </linearGradient>
                </defs>
                <g
                  id="グループ_71"
                  data-name="グループ 71"
                  transform="translate(-154 -193)"
                >
                  <circle
                    id="楕円形_6"
                    data-name="楕円形 6"
                    cx="195"
                    cy="195"
                    r="195"
                    transform="translate(154 193)"
                    fill="url(#linear-gradient)"
                  />
                  <circle
                    id="楕円形_7"
                    data-name="楕円形 7"
                    cx="181"
                    cy="181"
                    r="181"
                    transform="translate(168 207)"
                    fill="#fff"
                  />
                  <g
                    id="グループ_70"
                    data-name="グループ 70"
                    transform="translate(127.721 27.37)"
                  >
                    <path
                      id="パス_45"
                      data-name="パス 45"
                      d="M199.961,349.812a26.263,26.263,0,0,0,26.182-26.182V253.812a26.182,26.182,0,0,0-52.364,0V323.63A26.263,26.263,0,0,0,199.961,349.812Z"
                      transform="translate(21.682)"
                      fill="url(#linear-gradient)"
                    />
                    <path
                      id="パス_46"
                      data-name="パス 46"
                      d="M274.006,269.874V247.514a8.727,8.727,0,1,0-17.454,0v22.359a34.909,34.909,0,1,1-69.818,0V247.514a8.727,8.727,0,0,0-17.455,0v22.359a52.4,52.4,0,0,0,43.794,51.6c-.023.268-.157.495-.157.768v26.182h-21.76a8.727,8.727,0,1,0,0,17.455H252.13a8.727,8.727,0,0,0,0-17.455H230.37V322.237c0-.274-.128-.5-.151-.768A52.4,52.4,0,0,0,274.006,269.874Z"
                      transform="translate(0 53.757)"
                      fill="url(#linear-gradient)"
                    />
                  </g>
                  <text
                    id="録音開始"
                    transform="translate(349 504)"
                    fill="#555"
                    font-size="30"
                    font-family="YuGothicUI-Regular, Yu Gothic UI"
                  >
                    <tspan x="-60" y="0">録音開始</tspan>
                  </text>
                </g>
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="390"
                height="390"
                viewBox="0 0 390 390"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#e04242" />
                    <stop offset="1" stop-color="#ff7157" />
                    <stop offset="1" stop-color="#3f3f3f" />
                  </linearGradient>
                  <linearGradient
                    id="linear-gradient-2"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#e04242" />
                    <stop offset="1" stop-color="#e26548" />
                    <stop offset="1" stop-color="#3f3f3f" />
                  </linearGradient>
                </defs>
                <g
                  id="グループ_71"
                  data-name="グループ 71"
                  transform="translate(-154 -193)"
                >
                  <circle
                    id="楕円形_6"
                    data-name="楕円形 6"
                    cx="195"
                    cy="195"
                    r="195"
                    transform="translate(154 193)"
                    fill="url(#linear-gradient)"
                  />
                  <circle
                    id="楕円形_7"
                    data-name="楕円形 7"
                    cx="181"
                    cy="181"
                    r="181"
                    transform="translate(168 207)"
                    fill="#fff"
                  />
                  <text
                    id="録音停止"
                    transform="translate(349 504)"
                    fill="#555"
                    font-size="30"
                    font-family="YuGothicUI-Regular, Yu Gothic UI"
                  >
                    <tspan x="-60" y="0">録音停止</tspan>
                  </text>
                  <rect
                    id="長方形_270"
                    data-name="長方形 270"
                    width="98"
                    height="98"
                    rx="4"
                    transform="translate(300 323)"
                    fill="url(#linear-gradient-2)"
                  />
                </g>
              </svg>
            </span>
          </p>
        </div>
        <div class="d-flex align-items-center">
          <div class="lead" style="padding: 20px; width: 600px">
            <div v-if="hasRecordedData">
              <h5 class="m-0 text-right">db</h5>
              <div class="d-flex">
                <h5>-60</h5>
                <h5>-50</h5>
                <h5>-40</h5>
                <h5>-30</h5>
                <h5>-25</h5>
                <h5>-20</h5>
                <h5 class="ml-4">-15</h5>
                <h5 class="ml-4">-10</h5>
                <h5 class="ml-4">-5</h5>
                <h5 class="ml-4">0</h5>
              </div>
              <div class="d-flex" style="width: 800px">
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
                <div class="scale"></div>
              </div>
              <meter
                min="-100"
                max="0"
                class="w-100"
                :value="decibel"
                style="height: 40px"
              ></meter>
              <span id="avg-level-text"> {{ decibel }} </span> dB
              <h5 class="mt-4">録音したデータ１</h5>
              <div class="row">
                <div class="col text-left" style="font-size: 17px">
                  {{ playbackTimeHms }}
                </div>
                <div class="col text-right" style="font-size: 17px">
                  {{ durationHms }}
                </div>
              </div>
              <meter
                min="0"
                :max="duration"
                class="w-100"
                :value="playbackTime"
              ></meter>
              <div class="d-flex justify-content-center mt-4 mb-4">
                <button class="btn btn-light mr-3 btn-play" @click="play">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="23"
                    viewBox="0 0 30 23"
                  >
                    <path
                      d="M10.1,3.654a1.5,1.5,0,0,1,2.8,0l9.319,24.309A1.5,1.5,0,0,1,20.819,30H2.181a1.5,1.5,0,0,1-1.4-2.037Z"
                      transform="translate(30) rotate(90)"
                      fill="#578ed9"
                    /></svg
                  >再生
                </button>
                <button
                  class="btn btn-light btn-delete"
                  @click="deleteRecordedData"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                  >
                    <g transform="translate(-860 -178)">
                      <circle
                        cx="11"
                        cy="11"
                        r="11"
                        transform="translate(860 178)"
                        fill="#982e2e"
                      />
                      <path
                        d="M1,0H11a1,1,0,0,1,0,2H1C.448,2,0,1,0,1S.448,0,1,0Z"
                        transform="translate(865 188)"
                        fill="#fff"
                      />
                    </g></svg
                  >削除
                </button>
              </div>
              <p style="font-size: 14px; font-weight: bold; text-align: center">
                録音し直したい場合は、録音開始ボタンを押して再収録してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div
      class="modal fade"
      id="saveModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="saveModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="saveModalLabel">保存しますか？</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              v-bind:disabled="
                uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADING
              "
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">タイトル(必須)</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="file.title"
                  v-bind:disabled="
                    uploadRecoridngState !== UPLOAD_RECORDING_STATE.NONE &&
                    uploadRecoridngState !== UPLOAD_RECORDING_STATE.ERROR
                  "
                />
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">説明</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-bind:disabled="
                    uploadRecoridngState !== UPLOAD_RECORDING_STATE.NONE &&
                    uploadRecoridngState !== UPLOAD_RECORDING_STATE.ERROR
                  "
                ></textarea>
              </div>
            </form>
            <!-- 保存中 -->
            <span
              v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADING"
            >
              <div class="col-form-label">クルクルインジケーターとか</div>
            </span>
            <!-- 保存完了 -->
            <span
              v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADED"
            >
              <div class="col-form-label">保存が完了しました。</div>
            </span>
            <!-- 保存失敗 -->
            <span v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.ERROR">
              <div class="failed">保存に失敗しました。再度お試しください。</div>
            </span>
          </div>
          <span
            v-if="
              uploadRecoridngState === UPLOAD_RECORDING_STATE.ERROR ||
              uploadRecoridngState === UPLOAD_RECORDING_STATE.NONE
            "
          >
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                キャンセル
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-bind:disabled="file.title === undefined || file.title === ''"
                @click="uploadRecordingFile"
              >
                保存する
              </button>
            </div>
          </span>
          <!-- 保存完了 -->
          <span v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADED">
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import AudioRecorder from "@/utils/AudioRecorder";
import AudioPlayer from "@/utils/AudioPlayer";
import {
  RecordingFile,
  useUploadRecordingService,
  UPLOAD_RECORDING_STATE,
} from "@/services/uploadRecordingService";
import * as UMesseApi from "umesseapi";

export default defineComponent({
  name: "RecordingStart",
  setup() {
    const uploaRecordingService = useUploadRecordingService(
      new UMesseApi.RecordingApi()
    );
    const audioRecorder = AudioRecorder();
    const audioPlayer = AudioPlayer();
    const state = reactive({
      file: <RecordingFile>{},
      uploadRecoridngState: computed(() => uploaRecordingService.getStatus()),
      isRecording: computed(() => audioRecorder.isRecording()),
      hasRecordedData: computed(() => audioRecorder.hasRecording()),
      decibel: computed(() => {
        if (audioPlayer.getPowerDecibels() === -Infinity) return -100;
        return audioPlayer.getPowerDecibels();
      }),
      playbackTime: computed(() => {
        return audioPlayer.getPlaybackTime();
      }),
      playbackTimeHms: computed(() => {
        return sToHms(Math.floor(audioPlayer.getPlaybackTime()));
      }),
      duration: computed(() => {
        return audioPlayer.getDuration();
      }),
      durationHms: computed(() => {
        return sToHms(Math.floor(audioPlayer.getDuration()));
      }),
    });

    // 秒を時分秒に変換
    const sToHms = (second: number) => {
      const h = "" + ((second / 36000) | 0) + ((second / 3600) % 10 | 0);
      const m =
        "" + (((second % 3600) / 600) | 0) + (((second % 3600) / 60) % 10 | 0);
      const s = "" + (((second % 60) / 10) | 0) + ((second % 60) % 10);
      return h + ":" + m + ":" + s;
    };

    // toggle voice recorder.
    const toggleVoiceRecorder = async () => {
      if (audioRecorder.isRecording()) {
        audioRecorder.stop();
      } else {
        audioRecorder.start();
      }
    };

    // playback a recorded data.
    const play = async () => {
      const audioBuffer = await audioRecorder.getAudioBuffer();
      audioPlayer.start(audioBuffer!!);
    };
    const deleteRecordedData = () => audioRecorder.reset();

    const uploadRecordingFile = async () => {
      /// check state.file.
      state.file.blob = await audioRecorder.getWaveBlob();
      uploaRecordingService.upload(state.file);
    };

    return {
      ...toRefs(state),
      toggleVoiceRecorder,
      play,
      deleteRecordedData,
      uploadRecordingFile,
      UPLOAD_RECORDING_STATE,
    };
  },
});
</script>
<style scoped>
.recording {
  cursor: pointer;
  width: 350px;
  height: 429px;
}
img.card-img-top {
  margin-top: 30px;
}
svg {
  vertical-align: text-top;
  margin-right: 10px;
}
.btn-primary:disabled {
  background-color: #264b7380;
  border-color: #264b7380;
  /* color: #fff; */
}
.btn-play,
.btn-delete {
  width: 170px;
  height: 50px;
}
.btn-play {
  border: solid 4px #578ed9;
}
.btn-delete {
  border: solid 4px #982e2e;
}
h5 {
  margin-bottom: 0;
  margin-right: 26px;
  /* color: #ffffff; */
  font-weight: 400;
  font-size: 17px;
}
.failed {
  color: #ed6267;
  font-weight: 400;
  font-size: 17px;
}
.scale {
  width: 2px;
  height: 8px;
  background-color: #aaa;
  margin-right: 49px;
}
.scale:first-child {
  margin-right: 65px;
}
.scale:nth-child(n + 6) {
  margin-right: 73px;
}
.scale:nth-child(8) {
  margin-right: 68px;
}
.scale:nth-child(9) {
  margin-right: 64px;
}
.scale:last-child {
  margin-right: 0;
}
</style>
