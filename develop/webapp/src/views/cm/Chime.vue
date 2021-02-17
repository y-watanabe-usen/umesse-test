<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>{{ title }}</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <div class="row">
          <div class="col bg-white rounded-right">
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
                v-for="chime in chimes"
                :key="chime.id"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      chime.title
                    }}</strong>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-try"
                        data-toggle="modal"
                        data-target=".bd-try-modal-lg"
                        @click="selectChimeAndOpenPlayModal(chime)"
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
                        class="btn btn-light shadow btn-try ml-2"
                        @click="setChime(chime)"
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
                        選択
                      </button>
                    </div>
                  </div>
                  <span class="d-block pb-2">{{ chime.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
  <!-- modal -->
  <transition>
    <ModalDialog v-if="isPlayModalAppear" @close="closePlayModal">
      <template #header>
        <ModalHeader title="試聴" @close="closePlayModal" />
      </template>
      <template #contents>
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
                  @click="play(selectedChime)"
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
                {{ convertNumberToTime(playbackTime) }}
              </div>
              <div class="col text-right" style="font-size: 17px">
                {{ convertNumberToTime(duration) }}
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
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="stopAndClosePlayModal">終了</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isSaveModalAppear" size="large" @close="closeSaveModal">
      <template #header>
        <ModalHeader title="保存しますか？" @close="closeSaveModal" />
      </template>
      <template #contents>
        <FormGroup title="タイトル" :required="true">
          <TextBox />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea />
        </FormGroup>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeSaveModal">キャンセル</Button>
          <Button type="primary" @click="closeSaveModal">保存する</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isSavedModalAppear" @close="closeSavedModal">
      <template #contents>
        <p class="saved">保存が完了しました。</p>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeSavedModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import axios from "axios";
import AudioStore from "@/store/audio";
import * as UMesseApi from "umesseapi";
import { ChimeItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { config } from "@/utils/UMesseApiConfiguration";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import { convertNumberToTime } from "@/utils/FormatDate";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const api = new UMesseApi.ResourcesApi(config);
    const { cm, base } = useGlobalStore();

    const state = reactive({
      title: route.params.div == "open" ? "Openチャイム" : "Endチャイム",
      menus: [
        {
          id: 1,
          title: "チャイム",
        },
      ],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      chimes: [] as ChimeItem[],
      selectedChime: null as ChimeItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
    });

    const setChime = (chime: ChimeItem) => {
      if (route.params.div == "open") {
        cm.setOpenChime(chime);
      } else {
        cm.setEndChime(chime);
      }
      router.push({ name: "Cm" });
    };

    const selectChime = (chime: ChimeItem) => {
      state.selectedChime = chime;
    };

    const play = async (chime: ChimeItem) => {
      const audioBuffer = await getAudioBuffer(
        chime.contentsId,
        chime.category
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

    const openPlayModal = () => {
      state.isPlayModalAppear = true;
    };
    const closePlayModal = () => {
      state.isPlayModalAppear = false;
    };

    const openSaveModal = () => {
      state.isSaveModalAppear = true;
    };
    const closeSaveModal = () => {
      state.isSaveModalAppear = false;
    };

    const openSavedModal = () => {
      state.isSavedModalAppear = true;
    };
    const closeSavedModal = () => {
      state.isSavedModalAppear = false;
    };

    const selectChimeAndOpenPlayModal = (chime: ChimeItem) => {
      selectChime(chime);
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    onMounted(async () => {
      const response = await api.listChime();
      state.chimes = response.data;
    });
    return {
      ...toRefs(state),
      setChime,
      selectChime,
      play,
      stop,
      openPlayModal,
      closePlayModal,
      openSaveModal,
      closeSaveModal,
      openSavedModal,
      closeSavedModal,
      selectChimeAndOpenPlayModal,
      stopAndClosePlayModal,
      convertNumberToTime,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;

.saved {
  font-size: 20px;
  font-weight: $font_weight_bold;
  text-align: center;
}

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
