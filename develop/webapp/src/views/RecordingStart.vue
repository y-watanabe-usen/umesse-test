<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center text-white h4"
        >
          録音する
        </div>
        <span v-if="hasRecordedData === true">
          <button
            type="button"
            class="btn btn-link navbar-brand text-white"
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
              <img class="card-img-top" src="../assets/_rec@2x.png" />
            </span>
            <span v-else>
              <img class="card-img-top" src="../assets/_stop@2x.png" />
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
              <h5 class="text-white mt-4">録音したデータ１</h5>
              <div class="row">
                <div class="col text-left text-white" style="font-size: 17px">
                  {{ playbackTimeHms }}
                </div>
                <div class="col text-right text-white" style="font-size: 17px">
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
              <p
                style="
                  font-size: 14px;
                  font-weight: bold;
                  color: #ffffff;
                  text-align: center;
                "
              >
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
              v-bind:disabled="saveResult === 0"
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
                  v-bind:disabled="saveResult !== 3 && saveResult !== 2"
                />
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">説明</label>
                <textarea 
                  class="form-control"
                  id="description"
                  v-bind:disabled="saveResult !== 3 && saveResult !== 2"
                ></textarea>
              </div>
            </form>
            <!-- 保存中 -->
            <span v-if="saveResult === 0">
              <div class="col-form-label">
                クルクルインジケーターとか
              </div>
            </span>
            <!-- 保存完了 -->
            <span v-if="saveResult === 1">
              <div class="col-form-label">
                保存が完了しました。
              </div>
            </span>
            <!-- 保存失敗 -->
            <span v-if="saveResult === 2">
              <div class="failed">保存に失敗しました。再度お試しください。</div>
            </span>
          </div>
          <span v-if="saveResult === 3 || saveResult === 2">
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
                @click="postData"
              >
                保存する
              </button>
            </div>
          </span>
          <!-- 保存完了 -->
          <span v-if="saveResult === 1">
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
import * as UMesseApi from "umesseapi";

//FIXME: types等に移動.
interface RecordingFile {
  title: string | undefined;
  description: string | undefined;
}

enum SaveRecordingFileState {
  saving,
  success,
  failed,
  ready
}

export default defineComponent({
  enums: {
    SaveRecordingFileState,
  },
  setup() {
    const audioRecorder = AudioRecorder();
    const audioPlayer = AudioPlayer();
    const state = reactive({
      file: <RecordingFile>{},
      saveResult: SaveRecordingFileState.ready,
      isRecording: computed(() => (audioRecorder.isRecording() ? true : false)),
      hasRecordedData: computed(() => {
        if (audioRecorder.getBlob() !== undefined) return true;
        return false;
      }),
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
        const audioBuffer = await audioRecorder.getAudioBuffer();
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

    const postData = async () => {
      state.saveResult = SaveRecordingFileState.saving;

      var api = new UMesseApi.RecordingApi();

      const audioFile = await audioRecorder.getAudioFile();
      if (audioFile != null) {
        api.createUserRecording("xUnisCustomerCd", state.file.title, audioFile).then((value) => {
          state.saveResult = SaveRecordingFileState.success;
        }).catch((error) => {
          state.saveResult = SaveRecordingFileState.failed;
        });
      }
    };

    return {
      ...toRefs(state),
      toggleVoiceRecorder,
      play,
      deleteRecordedData,
      postData,
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
  color: #fff;
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
  color: #ffffff;
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
  background-color: #ffffff;
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
