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
        <List>
          <template #header>
            <ListHeader>
              <select class="form-control w-25">
                <option v-for="sort in sorts" :key="sort">
                  {{ sort }}
                </option>
              </select>
            </ListHeader>
          </template>
          <ListItem v-for="narration in narrations" :key="narration.contentsId">
            <template #title>
              <h2>{{ narration.title }}</h2>
            </template>
            <template #line1>
              <p>{{ narration.description }}</p>
            </template>
            <template #line2>
              <p>
                <span class="duration">{{ convertNumberToTime(narration.seconds) }}</span>
                <span class="start">放送開始日{{ convertDatestringToDateJp(narration.timestamp) }}</span>
                <span class="end">有効期限{{ convertDatestringToDateJp(narration.timestamp) }}</span>
              </p>
            </template>
            <template #operations>
              <Button
                type="rectangle"
                class="btn-document"
                @click="selectNarrationAndOpenDocumentModal(narration)"
              >
                <img src="@/assets/icon_document.svg" />原稿
              </Button>
              <Button
                type="rectangle"
                class="btn-play"
                @click="selectNarrationAndOpenPlayModal(narration)"
              >
                <img src="@/assets/icon_play.svg" />試聴
              </Button>
              <Button
                type="rectangle"
                class="btn-select"
                @click="setNarration(narration)"
              >
                選択<img src="@/assets/icon_select.svg" />
              </Button>
            </template>
          </ListItem>
        </List>
      </ContentsBase>
    </template>
  </BasicLayout>
  <!-- modal -->
  <transition>
    <ModalDialog v-if="isDocumentModalAppear" @close="closeDocumentModal">
      <template #header>
        <ModalHeader title="原稿" @close="closeDocumentModal" />
      </template>
      <template #contents>
        {{ selectedNarration?.manuscript }}
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeDocumentModal">終了</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
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
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="stopAndClosePlayModal">終了</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
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
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
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
    Header,
    Button,
    SubMenu,
    SubMenuItem,
    List,
    ListHeader,
    ListItem,
    ModalDialog,
    ModalHeader,
    ModalFooter,
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
      isDocumentModalAppear: false,
      isPlayModalAppear: false,
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

    const openDocumentModal = () => {
      state.isDocumentModalAppear = true;
    };
    const closeDocumentModal = () => {
      state.isDocumentModalAppear = false;
    };

    const openPlayModal = () => {
      state.isPlayModalAppear = true;
    };
    const closePlayModal = () => {
      state.isPlayModalAppear = false;
    };

    const selectNarrationAndOpenDocumentModal = (narration: NarrationItem) => {
      selectNarration(narration);
      openDocumentModal();
    }
    const selectNarrationAndOpenPlayModal = (narration: NarrationItem) => {
      selectNarration(narration);
      openPlayModal();
    }
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
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
      openDocumentModal,
      closeDocumentModal,
      openPlayModal,
      closePlayModal,
      selectNarrationAndOpenDocumentModal,
      selectNarrationAndOpenPlayModal,
      stopAndClosePlayModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
