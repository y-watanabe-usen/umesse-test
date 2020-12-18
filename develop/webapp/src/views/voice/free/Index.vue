<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center h4"
        >
          合成音声でナレーションを作成する
        </div>
        <div
          class="navbar-brand text-white"
          type="button"
          data-toggle="modal"
          data-target="#modal-during"
        >
          確定
        </div>
      </nav>
      <div class="row">
        <div
          class="col-12 rounded"
          style="height: 600px; background-color: #e6e6e6"
        >
          <div class="m-3">
            <div class="btn btn-light shadow px-4 py-2 mb-3" style="">
              テンプレートテキストをコピーする
            </div>
            <textarea
              class="col-12 p-3 rounded"
              style="height: 500px; border: none"
              placeholder="アナウンスの文言を入力してください。"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 確定ボタン押下-->
    <div
      class="modal fade"
      id="modal-during"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            音源の合成中&emsp;およそ15秒
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              data-toggle="modal"
              data-target="#modal-save"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 保存画面-->
    <div
      class="modal fade"
      id="modal-save"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-between">
            <div></div>
            <div class="modal-title" id="exampleModalCenterTitle">
              保存しますか？
            </div>
            <div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body mx-5 my-4">
            <div class="row justify-content-between">
              <div class="col-2 mt-2 ml-3">試聴</div>
              <div class="col-3">
                <template v-if="!state.isPlaying">
                  <button
                    type="button"
                    class="btn btn-light shadow btn-play"
                    @click="play"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-play-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                      />
                    </svg>
                    再生
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-light shadow btn-play"
                    @click="stop"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-stop-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
                      />
                    </svg>
                    停止
                  </button>
                </template>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col text-left" style="font-size: 17px">
                    {{ state.playbackTimeHms }}
                  </div>
                  <div class="col text-right" style="font-size: 17px">
                    {{ state.durationHms }}
                  </div>
                </div>
                <meter
                  min="0"
                  :max="state.duration"
                  class="w-100"
                  :value="state.playbackTime"
                ></meter>
              </div>
            </div>
            <div class="row pt-4 justify-content-between">
              <div class="col-2 ml-3"></div>
              <div class="col-3">
                タブレット音量<br />
                <small>タブレットのスピーカーから音が出ます。</small>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col text-left">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-volume-down-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.717 3.55A.5.5 0 0 1 9 4v8a.5.5 0 0 1-.812.39L5.825 10.5H3.5A.5.5 0 0 1 3 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                      />
                      <path
                        d="M10.707 11.182A4.486 4.486 0 0 0 12.025 8a4.486 4.486 0 0 0-1.318-3.182L10 5.525A3.489 3.489 0 0 1 11.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"
                      />
                    </svg>
                  </div>
                  <div class="col text-center">volume 32</div>
                  <div class="col text-right">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-volume-up-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                      />
                      <path
                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                      />
                      <path
                        d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                      />
                    </svg>
                  </div>
                </div>
                <meter min="0" max="15" class="w-100" value="1"></meter>
              </div>
            </div>
            <div class="row justify-content-between mt-5 mb-3">
              <div class="col-2 ml-3">
                <div>タイトル</div>
                <small class="text-primary">※必須</small>
              </div>
              <input
                type="text"
                class="col-9"
                style="height: 45px; margin: 0 10px"
              />
            </div>
            <div class="row justify-content-between">
              <div class="col-2 ml-3">
                <div>説明</div>
              </div>
              <textarea
                type="text"
                class="col-9"
                style="height: 100px; margin: 0 10px"
              >
              </textarea>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-light w-25 mr-3"
              data-dismiss="modal"
            >
              キャンセル
            </button>
            <button
              type="button"
              class="btn btn-secondary w-25"
              data-toggle="modal"
              data-target="#modal-saved"
              data-dismiss="modal"
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 保存が完了しました-->
    <div
      class="modal fade"
      id="modal-saved"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content px-3">
          <div class="modal-body row justify-content-between">
            <div></div>
            <div>保存が完了しました</div>
            <div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import axios from "axios";
import AudioStore from "@/store/audio";

export default {
  setup() {
    const audioPlayer = AudioPlayer();
    const audioStore = AudioStore();
    const state = reactive({
      isPlaying: computed(() => audioPlayer.isPlaying()),
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
    const play = async () => {
      if (state.isPlaying) return;
      // TODO: umesse apiから取得
      const signedUrl = "/audio/asahi/music/myuu/wave/hana.mp3";

      await audioStore.download(signedUrl);
      audioPlayer.start(<AudioBuffer>audioStore.audioBuffer);
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    return {
      state,
      play,
      stop,
    };
  },
};
</script>

<style scoped>
.bg-menu {
  background: -moz-linear-gradient(top, #89929e, #a4a8ad);
  background: -webkit-linear-gradient(top, #89929e, #a4a8ad);
  background: linear-gradient(to bottom, #89929e, #a4a8ad);
}
.btn-menu {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  text-decoration: none;
}
.btn-try,
.btn-edit {
  width: 100px;
  height: 40px;
}
.btn-edit {
  margin-left: 20px;
}
.btn:focus {
  box-shadow: none;
}
.btn-play,
.btn-close {
  width: 120px;
}
.btn-link {
  color: #333;
}
.dropdown-toggle::after {
  content: none;
}
::placeholder {
  color: #cccccc;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 830px;
  }
}
</style>