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
            @play="play(selectedChime)"
            @stop="stop"
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
import AudioPlayer from "@/utils/AudioPlayer";
import { ChimeItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import * as Common from "@/utils/Common";
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
// import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";
// import FormGroup from "@/components/molecules/FormGroup.vue";
// import TextBox from "@/components/atoms/TextBox.vue";
// import TextArea from "@/components/atoms/TextArea.vue";
import { UMesseError } from "../../models/UMesseError";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { audioService, resourcesService } from "@/services";
import analytics from "@/utils/firebaseAnalytics";

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
    // MessageDialogContents,
    // FormGroup,
    // TextBox,
    // TextArea,
    ModalLoading,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const audioPlayer = AudioPlayer();
    const { cm } = useGlobalStore();
    const sortList = Common.getSort();
    const isOpenChime = route.params.div == "open";
    const title = isOpenChime ? "Openチャイム" : "Endチャイム";

    const state = reactive({
      sort: 1,
      chimes: [] as ChimeItem[],
      selectedChime: null as ChimeItem | null,
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isPlayModalAppear: false,
      isErrorModalApper: false,
      errorCode: "",
      errorMessage: "",
      isLoading: false,
    });

    const setChime = (chime: ChimeItem) => {
      if (isOpenChime) {
        analytics.selectOpenChime(chime.id);
        cm.setOpenChime(chime);
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
        openModalLoading();
        const response = await resourcesService.fetchChime(state.sort);
        state.chimes = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };

    const play = async (chime: ChimeItem) => {
      try {
        state.isDownloading = true;
        const audioBuffer = await audioService.getById(
          chime.id,
          chime.category
        );
        audioPlayer.start(audioBuffer);
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
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

    const selectChimeAndOpenPlayModal = (chime: ChimeItem) => {
      selectChime(chime);
      openPlayModal();
    };
    const stopAndClosePlayModal = () => {
      stop();
      closePlayModal();
    };

    onMounted(async () => {
      fetchChime();
    });

    const closeErrorModal = () => {
      state.isErrorModalApper = false;
    };

    const openErrorModal = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isErrorModalApper = true;
    };

    const openModalLoading = () => {
      state.isLoading = true;
    };

    const closeModalLoading = () => {
      state.isLoading = false;
    };

    return {
      ...toRefs(state),
      sortList,
      title,
      setChime,
      selectChime,
      play,
      stop,
      openPlayModal,
      closePlayModal,
      selectChimeAndOpenPlayModal,
      stopAndClosePlayModal,
      fetchChime,
      closeErrorModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
