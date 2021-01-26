<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center h4">
          店内アナウンスの管理
        </div>
      </nav>
      <div class="row">
        <div class="col-2 bg-menu pl-1 pr-1 rounded-left">
          <button
            type="button"
            class="btn btn-menu text-left text-white"
            :class="[
              menu.id == state.activeMenuId ? 'btn-primary' : 'btn-link',
              menu.id == state.activeMenuId ? 'text-white' : 'text-dark',
              menu.id == 1 ? 'mt-2' : '',
            ]"
            v-for="menu in state.menus"
            :key="menu.id"
            @click="state.activeMenuId = menu.id"
          >
            {{ menu.title }}
          </button>
        </div>
        <div class="col-10 bg-white rounded-right">
          <div class="my-3">
            <h6 class="border-bottom border-gray pb-2 mb-0">
              <select class="form-control w-25">
                <option v-for="sort in state.sorts" :key="sort">
                  {{ sort }}
                </option>
              </select>
            </h6>
            <div
              class="media text-muted pt-3"
              v-for="narrationData in state.narrationDatas"
              :key="narrationData.title"
            >
              <div
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100"
                >
                  <strong class="text-dark h5 pt-2 pb-2">{{
                    narrationData.title
                  }}</strong>
                  <div>
                    <button
                      type="button"
                      class="btn btn-light shadow btn-try"
                      data-toggle="modal"
                      data-target=".bd-try-modal-lg"
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
                      試聴
                    </button>
                    <button
                      class="btn btn-link dropdown-toggle btn-lg"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        width="2.5em"
                        height="2.5em"
                        viewBox="0 0 16 16"
                        class="bi bi-three-dots"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                        />
                      </svg>
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#saveModal"
                        >タイトル/説明 編集</a
                      >
                      <a class="dropdown-item" href="#">コンテンツ編集</a>
                      <a class="dropdown-item" href="#"
                        >U MUSICにアップロード</a
                      >
                      <a class="dropdown-item" href="#">削除</a>
                    </div>
                  </div>
                </div>
                <span class="d-block pb-2"
                  >{{ narrationData.description1 }}<br />{{
                    narrationData.description2
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div
      class="modal fade bd-try-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">試聴</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <template v-if="state.isDownloading">
                  <button class="btn btn-play btn-light" type="button" disabled>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Loading...</span>
                  </button>
                </template>
                <template v-else>
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
                </template>
              </div>
              <div class="col-8">
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
            <div class="row pt-5">
              <div class="col-4">
                タブレット音量<br />
                <small>タブレットのスピーカーから音が出ます。</small>
              </div>
              <div class="col-8">
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
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-light btn-close"
              data-dismiss="modal"
              @click="stop"
            >
              終了
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <h5 class="modal-title" id="saveModalLabel">
              タイトルと説明の編集
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">タイトル(必須)</label>
                <input type="text" class="form-control" id="title" />
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">説明</label>
                <textarea class="form-control" id="description"></textarea>
              </div>
            </form>
          </div>
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
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#savedModal"
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="savedModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="savedModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="savedModalLabel">保存完了</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">保存が完了しました。</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              閉じる
            </button>
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
import * as UMesseApi from "umesseapi";
import * as Common from "@/utils/Common";

export default {
  setup() {
    const audioPlayer = AudioPlayer();
    const audioStore = AudioStore();
    const api = new UMesseApi.ResourcesApi(
      new UMesseApi.Configuration({ basePath: process.env.VUE_APP_BASE_URL })
    );

    const state = reactive({
      menus: [
        {
          id: 1,
          title: "開店",
        },
        {
          id: 2,
          title: "閉店",
        },
        {
          id: 3,
          title: "エスカレーター",
        },
        {
          id: 4,
          title: "案内",
        },
        {
          id: 5,
          title: "年末年始告知",
        },
        {
          id: 6,
          title: "年末営業告知",
        },
        {
          id: 7,
          title: "年中行事販促",
        },
      ],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      narrationDatas: [
        {
          title: "18時30分閉店",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "アルバイト募集",
          description1:
            "お客様にご案内申し上げます。当店ではアルバイトを募集いたしており…",
          description2: "00:15 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "チャイルドチェア",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "デリバリー",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
      ],
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => {
        return audioPlayer.getPlaybackTime();
      }),
      playbackTimeHms: computed(() => {
        return Common.sToHms(Math.floor(audioPlayer.getPlaybackTime()));
      }),
      duration: computed(() => {
        return audioPlayer.getDuration();
      }),
      durationHms: computed(() => {
        return Common.sToHms(Math.floor(audioPlayer.getDuration()));
      }),
    });

    const play = async () => {
      if (state.isPlaying) return;
      const response = await api.getSignedUrl("ID", "CATEGORY");
      console.log(response.data.url);
      await audioStore.download(response.data.url);
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
  background: #d9d9d9;
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
  width: 200px;
}
.btn-link {
  color: #333;
}
.dropdown-toggle::after {
  content: none;
}
</style>
