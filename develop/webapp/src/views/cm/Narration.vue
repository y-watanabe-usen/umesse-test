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
              <select class="form-control w-25" v-model="sort" @change="sortNarration">
                  <option v-for="narrationSort in narrationSorts" :key="narrationSort.cd" :value="narrationSort.cd">
                    {{ narrationSort.name }}
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
import PlayDialogContents from "@/components/organisms/PlayDialogContents.vue";
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
    PlayDialogContents,
  },
  setup() {
    const route = useRoute();
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const api = new UMesseApi.ResourcesApi(config);
    const { cm, base } = useGlobalStore();
    const state = reactive({
      narrationIndustries: Common.getNarrationIndustries(),
      sort: 1,
      narrationSorts: computed(() => Common.getSort()),
      activeNarrationIndustryCd: "01",
      narrations: [] as NarrationItem[],
      selectedNarration: null as NarrationItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
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

    const sortNarration = async () => {
      const response = await api.listNarration(state.activeNarrationIndustryCd, undefined, state.sort);
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
      sortNarration,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
