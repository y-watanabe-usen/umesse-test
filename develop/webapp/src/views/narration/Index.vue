<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>ナレーション選択</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <template #sub-menu>
          <SubMenu>
            <SubMenuItem
              v-for="narrationIndustry in narrationIndustries"
              :key="narrationIndustry.cd"
              :isSelected="narrationIndustry.cd == activeNarrationIndustryCd"
              @click="clickNarrationIndustry(narrationIndustry.cd)"
            >
              {{ narrationIndustry.name }}
            </SubMenuItem>
          </SubMenu>
        </template>
        <div class="row">
          <div class="col-9 bg-white rounded-right">
            <div class="my-3">
              <h6 class="border-bottom border-gray pb-2 mb-0">
                <select class="form-control w-25">
                  <option v-for="sort in sorts" :key="sort">
                    {{ sort }}
                  </option>
                </select>
              </h6>
              <div
                class="media text-muted pt-3"
                v-for="narration in narrations"
                :key="narration.contentsId"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      narration.title
                    }}</strong>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-manuscript"
                        data-toggle="modal"
                        data-target=".bd-try-manuscript"
                        @click="selectNarration(narration)"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-file-earmark-text-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                          />
                        </svg>
                        原稿
                      </button>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-try"
                        data-toggle="modal"
                        data-target=".bd-try-modal-lg"
                        @click="selectNarration(narration)"
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
                        type="button"
                        class="btn btn-light shadow btn-edit"
                        @click="setNarration(narration)"
                      >
                        選択
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-chevron-right"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span class="d-block pb-2"
                    >{{ narration.description }}<br />{{
                      convertNumberToTime(narration.seconds)
                    }}
                    <!-- TODO: 仮の数値(放送開始日、有効期限) -->
                    放送開始日{{
                      convertDatestringToDateJp(narration.timestamp)
                    }}
                    有効期限{{
                      convertDatestringToDateJp(narration.timestamp)
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
  <!-- modal -->
  <div
    class="modal fade bd-try-manuscript"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">原稿</h5>
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
          {{ selectedNarration?.manuscript }}
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-light btn-close"
            data-dismiss="modal"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </div>

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
              <template v-if="isDownloading">
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
                <template v-if="!isPlaying">
                  <button
                    type="button"
                    class="btn btn-light shadow btn-play"
                    @click="play(selectedNarration)"
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
          >
            終了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  reactive,
  toRefs,
} from "vue";
import AudioStore from "@/store/audio";
import AudioPlayer from "@/utils/AudioPlayer";
import * as UMesseApi from "umesseapi";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import Header from "@/components/organisms/Header.vue";
import { config } from "@/utils/UMesseApiConfiguration";
import { NarrationItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import router from "@/router";
import { useRoute } from "vue-router";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/FormatDate";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    SubMenu,
    SubMenuItem,
    Header,
  },
  setup() {
    const route = useRoute();
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const api = new UMesseApi.ResourcesApi(config);
    const { cm, base } = useGlobalStore();
    const state = reactive({
      narrationIndustries: Common.getNarrationIndustries(),
      sorts: ["名前順", "作成日順", "更新日順"],
      activeNarrationIndustryCd: "01",
      narrations: [] as NarrationItem[],
      selectedNarration: null as NarrationItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      playbackTimeHms: computed(() =>
        convertNumberToTime(audioPlayer.getPlaybackTime())
      ),
      duration: computed(() => audioPlayer.getDuration()),
      durationHms: computed(() =>
        convertNumberToTime(audioPlayer.getDuration())
      ),
    });

    const setNarration = (narration: NarrationItem) => {
      cm.setNarration(narration);
      router.push({ name: "Cm" });
    };

    const selectNarration = (narration: NarrationItem) => {
      state.selectedNarration = narration;
    };

    const clickNarrationIndustry = (narrationIndustryCd: string) => {
      state.activeNarrationIndustryCd = narrationIndustryCd;
      fetchNarration();
    };

    const fetchNarration = async () => {
      const response = await api.listNarration(state.activeNarrationIndustryCd);
      state.narrations = response.data;
    };

    const play = async (narration: NarrationItem) => {
      const audioBuffer = await getAudioBuffer(
        narration.contentsId,
        narration.category
      );
      audioPlayer.start(audioBuffer);
    };

    const getAudioBuffer = async (contentsId: string, category: string) => {
      const cacheKey = `${category}/${contentsId}`;
      if (base.cache.has(cacheKey)) {
        return <AudioBuffer>base.cache.get(cacheKey);
      }
      const response = await api.getSignedUrl(contentsId, category);
      await audioStore.download(response.data.url);
      base.cache.set(cacheKey, <AudioBuffer>audioStore.audioBuffer);
      return <AudioBuffer>audioStore.audioBuffer;
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    onMounted(async () => {
      fetchNarration();
    });

    return {
      ...toRefs(state),
      play,
      stop,
      setNarration,
      selectNarration,
      clickNarrationIndustry,
      convertDatestringToDateJp,
      convertNumberToTime,
    };
  },
});
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
.btn-manuscript,
.btn-try,
.btn-edit {
  width: 100px;
  height: 40px;
}
.btn-try,
.btn-edit {
  margin-left: 20px;
}
.btn-play,
.btn-close {
  width: 200px;
}
</style>
