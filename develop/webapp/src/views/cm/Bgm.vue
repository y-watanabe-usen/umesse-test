<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>BGM</template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <template #sub-menu>
            <SubMenu>
              <SubMenuItem
                v-for="industry in industries"
                :key="industry.cd"
                :isSelected="industry.cd == activeIndustryCd"
                @click="clickIndustry(industry.cd)"
              >
                {{ industry.name }}
              </SubMenuItem>
            </SubMenu>
          </template>
          <List>
            <template #header>
              <ListHeader>
                <Sort
                  v-model="sort"
                  @update:modelValue="fetchBgm"
                  :options="
                    sortList.map((v) => {
                      return { title: v.name, value: v.cd };
                    })
                  "
                />
              </ListHeader>
            </template>
            <ListItem v-for="bgm in bgms" :key="bgm.id">
              <template #title>
                <h2>{{ bgm.title }}</h2>
              </template>
              <template #line1>
                <p>{{ bgm.description }}</p>
              </template>
              <template #operations>
                <Button
                  class="btn-play"
                  @click="selectBgmAndOpenPlayModal(bgm)"
                >
                  <img src="@/assets/icon_sound.svg" />試聴
                </Button>
                <Button class="btn-select" @click="setBgm(bgm)">
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
import { BgmItem } from "umesseapi/models";
import { useRouter } from "vue-router";
import * as common from "@/utils/common";
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
    SubMenu,
    SubMenuItem,
    List,
    ListHeader,
    ListItem,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    PlayDialogContents,
    ModalErrorDialog,
    ModalLoading,
  },
  setup() {
    const router = useRouter();
    const audioPlayer = useAudioPlayer();
    const cm = useCmStore();
    const sortList = common.getSort();
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
      activeIndustryCd: "10",
      sort: 1,
      bgms: [] as BgmItem[],
      industries: computed(() => common.getBgmIndustries()),
      selectedBgm: null as BgmItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      url: "",
    });

    const setBgm = (bgm: BgmItem) => {
      cm.setBgm(bgm);
      analytics.selectBgm(bgm.id);
      router.push({ name: "Cm" });
    };

    const selectBgm = (bgm: BgmItem) => {
      state.selectedBgm = bgm;
    };

    const clickIndustry = (industryCd: string) => {
      if (state.activeIndustryCd !== industryCd) {
        state.activeIndustryCd = industryCd;
        fetchBgm();
      }
    };

    const fetchBgm = async () => {
      try {
        openLoadingModal();
        const response = await resourcesService.fetchBgm(
          state.activeIndustryCd,
          state.sort
        );
        state.bgms = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };

    const play = async () => {
      if (state.isPlaying) return;
      await audioPlayer.start(state.url);
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const selectBgmAndOpenPlayModal = async (bgm: BgmItem) => {
      try {
        selectBgm(bgm);
        state.isDownloading = true;
        openPlayModal();
        InitializeUrl();
        state.url = await audioService.getUrlById(bgm.id, bgm.category);
        analytics.pressButtonPlayTrial(
          bgm.id,
          Constants.CATEGORY.BGM,
          Constants.SCREEN.BGM
        );
      } catch (e) {
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
      analytics.screenView(Constants.SCREEN.BGM);
      fetchBgm();
    });

    const InitializeUrl = () => {
      state.url = "";
    };

    return {
      ...toRefs(state),
      sortList,
      setBgm,
      selectBgm,
      clickIndustry,
      play,
      stop,
      selectBgmAndOpenPlayModal,
      stopAndClosePlayModal,
      fetchBgm,
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
