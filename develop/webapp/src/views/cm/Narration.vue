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
        <template v-if="!activeNarrationSceneCd">
          <List>
            <ListItem
              v-for="scene in scenes"
              :key="scene.cd"
              @click="clickNarrationScene(scene.cd)"
            >
              <template #title>
                <h2>{{ scene.name }}</h2>
              </template>
            </ListItem>
          </List>
        </template>
        <template v-else>
          <List>
            <template #header>
              <ListHeader>
                <Sort
                  v-model="sort"
                  @update:modelValue="fetchNarration"
                  :options="
                    narrationSorts.map((narrationSort) => {
                      return {
                        title: narrationSort.name,
                        value: narrationSort.cd,
                      };
                    })
                  "
                />
              </ListHeader>
            </template>
            <ListItem
              v-for="narration in narrations"
              :key="narration.contentsId"
            >
              <template #title>
                <h2>{{ narration.title }}</h2>
              </template>
              <template #line1>
                <p>{{ narration.description }}</p>
              </template>
              <template #line2>
                <p>
                  <span class="duration">{{
                    convertNumberToTime(narration.seconds)
                  }}</span>
                  <span class="start"
                    >放送開始日{{
                      convertDatestringToDateJp(narration.timestamp)
                    }}</span
                  >
                  <span class="end"
                    >有効期限{{
                      convertDatestringToDateJp(narration.timestamp)
                    }}</span
                  >
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
        </template>
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
        <TextDialogContents>
          {{ selectedNarration?.manuscript }}
        </TextDialogContents>
      </template>
      <template #footer>
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeDocumentModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
  <transition>
    <ModalDialog v-if="isPlayModalAppear" @close="stopAndClosePlayModal">
      <template #header>
        <ModalHeader title="試聴" @close="stopAndClosePlayModal" />
      </template>
      <template #contents>
        <PlayDialogContents
          :isLoading="isDownloading"
          :isPlaying="isPlaying"
          :playbackTime="playbackTime"
          :duration="duration"
          @play="play(selectedNarration)"
          @stop="stop"
        />
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
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import Sort from "@/components/molecules/Sort.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import { NarrationItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import router from "@/router";
import { useRoute } from "vue-router";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/FormatDate";
import UMesseService from "@/services/UMesseService";
import { Scene } from "@/utils/Constants";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    Sort,
    SubMenu,
    SubMenuItem,
    List,
    ListHeader,
    ListItem,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    PlayDialogContents,
    TextDialogContents,
  },
  setup() {
    const route = useRoute();
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const { cm } = useGlobalStore();
    const state = reactive({
      sort: 1,
      narrationSorts: computed(() => Common.getSort()),
      activeNarrationIndustryCd: "01",
      activeNarrationSceneCd: null as string | null,
      narrations: [] as NarrationItem[],
      scenes: [] as Scene[],
      selectedNarration: null as NarrationItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      narrationIndustries: Common.getNarrationIndustries(),
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
      state.activeNarrationSceneCd = null;
      fetchScene();
    };

    const clickNarrationScene = (narrationSceneCd: string) => {
      state.activeNarrationSceneCd = narrationSceneCd;
      fetchNarration();
    };

    const fetchScene = () => {
      state.scenes = Common.getIndustryScenes(state.activeNarrationIndustryCd);
      state.narrations = [];
    };

    const fetchNarration = async () => {
      if (!state.activeNarrationSceneCd) return;
      const response = await UMesseService.resourcesService.fetchNarration(
        state.activeNarrationIndustryCd,
        state.activeNarrationSceneCd,
        state.sort
      );
      state.scenes = [];
      state.narrations = response;
    };

    const play = async (narration: NarrationItem) => {
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        narration.contentsId,
        narration.category
      );
      audioPlayer.start(audioBuffer);
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
    };
    const selectNarrationAndOpenPlayModal = (narration: NarrationItem) => {
      selectNarration(narration);
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    onMounted(async () => {
      fetchScene();
    });

    return {
      ...toRefs(state),
      play,
      stop,
      setNarration,
      selectNarration,
      clickNarrationIndustry,
      clickNarrationScene,
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
