<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>{{ title }}</template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <List>
            <template #header>
              <ListHeader>
                <Sort
                  v-model="sort"
                  @update:modelValue="fetchChime"
                  :options="
                    sortList.map((v) => {
                      return { title: v.name, value: v.cd };
                    })
                  "
                />
              </ListHeader>
            </template>
            <ListItem v-for="chime in chimes" :key="chime.id">
              <template #title>
                <h2>{{ chime.title }}</h2>
              </template>
              <template #line1>
                <p>{{ chime.description }}</p>
              </template>
              <template #operations>
                <Button
                  class="btn-play"
                  @click="selectChimeAndOpenPlayModal(chime)"
                >
                  <img src="@/assets/icon_sound.svg" />試聴
                </Button>
                <Button class="btn-select" @click="setChime(chime)">
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
            @play="play"
            @stop="stop"
            :oninput="seekAudioPlayerProgressBar"
          />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndClosePlayModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" title="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import useAudioPlayer from "@/utils/audioPlayer";
import { ChimeItem } from "umesseapi/models";
import { useRoute, useRouter } from "vue-router";
import * as common from "@/utils/common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import Sort from "@/components/molecules/Sort.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { audioService, resourcesService } from "@/services";
import analytics from "@/utils/firebaseAnalytics";
import Constants from "@/utils/constants";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { useCmStore } from "@/store/cm";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    Sort,
    List,
    ListHeader,
    ListItem,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    ModalErrorDialog,
    PlayDialogContents,
    ModalLoading,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const audioPlayer = useAudioPlayer();
    const cm = useCmStore();
    const sortList = common.getSort();
    const isStartChime = route.params.div == "start";
    const title = isStartChime ? "開始チャイム" : "終了チャイム";
    const {
      isApper: isPlayModalAppear,
      open: openPlayModal,
      close: closePlayModal,
    } = useModalController();
    const {
      isApper: isLoading,
      loadingMessage,
      open: openLoadingModal,
      close: closeLoadingModal,
    } = useLoadingModalController();
    const {
      isApper: isErrorModalApper,
      errorCode,
      errorMessage,
      open: openErrorModal,
      close: closeErrorModal,
    } = useErrorModalController();

    const state = reactive({
      sort: 1,
      chimes: [] as ChimeItem[],
      selectedChime: null as ChimeItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
    });

    const setChime = (chime: ChimeItem) => {
      if (isStartChime) {
        analytics.selectStartChime(chime.id);
        cm.setStartChime(chime);
      } else {
        analytics.selectEndChime(chime.id);
        cm.setEndChime(chime);
      }
      router.push({ name: "Cm" });
    };

    const selectChime = (chime: ChimeItem) => {
      state.selectedChime = chime;
    };

    const fetchChime = async () => {
      try {
        openLoadingModal();
        const response = await resourcesService.fetchChime(state.sort);
        state.chimes = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };

    const play = async () => {
      if (state.isPlaying) return;
      analytics.pressButtonPlayTrial(
        state.selectedChime?.id ?? "undefind",
        Constants.CATEGORY.CHIME,
        Constants.SCREEN.CHIME
      );
      await audioPlayer.start();
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const selectChimeAndOpenPlayModal = async (chime: ChimeItem) => {
      try {
        selectChime(chime);
        state.isDownloading = true;
        openPlayModal();
        const url = await audioService.getUrlById(chime.id, chime.category);
        await audioPlayer.load(url);
      } catch (e) {
        closePlayModal();
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    const seekAudioPlayerProgressBar = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        audioPlayer.changePlaybackTime(+e.target.value);
      }
    };

    onMounted(async () => {
      analytics.screenView(Constants.SCREEN.CHIME);
      fetchChime();
    });

    return {
      ...toRefs(state),
      sortList,
      title,
      setChime,
      selectChime,
      play,
      stop,
      selectChimeAndOpenPlayModal,
      stopAndClosePlayModal,
      fetchChime,
      seekAudioPlayerProgressBar,
      isPlayModalAppear,
      openPlayModal,
      closePlayModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
