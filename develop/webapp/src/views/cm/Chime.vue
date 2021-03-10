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
                  type="rectangle"
                  class="btn-play"
                  @click="selectChimeAndOpenPlayModal(chime)"
                >
                  <img src="@/assets/icon_play.svg" />試聴
                </Button>
                <Button
                  type="rectangle"
                  class="btn-select"
                  @click="setChime(chime)"
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
          <ModalFooter :noBorder="true">
            <Button type="rectangle" @click="stopAndClosePlayModal"
              >終了</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog
        v-if="isSaveModalAppear"
        size="large"
        @close="closeSaveModal"
      >
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
          <MessageDialogContents> 保存が完了しました。 </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter :noBorder="true">
            <Button type="rectangle" @click="closeSavedModal">閉じる</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalError
        v-if="isError"
        @close="closeErrorModal"
        title="エラー"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      ></ModalError>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
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
import ModalError from "@/components/molecules/ModalError.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import UMesseService from "@/services/UMesseService";

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
    ModalError,
    PlayDialogContents,
    MessageDialogContents,
    FormGroup,
    TextBox,
    TextArea,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const audioStore = AudioStore();
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
      isDownloading: computed(() => audioStore.isDownloading),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isPlayModalAppear: false,
      isSaveModalAppear: false,
      isSavedModalAppear: false,
      isError: false,
      errorCode: "",
      errorMessage: "",
    });

    const setChime = (chime: ChimeItem) => {
      if (isOpenChime) {
        cm.setOpenChime(chime);
      } else {
        cm.setEndChime(chime);
      }
      router.push({ name: "Cm" });
    };

    const selectChime = (chime: ChimeItem) => {
      state.selectedChime = chime;
    };

    const fetchChime = async () => {
      try {
        const response = await UMesseService.resourcesService.fetchChime(
          state.sort
        );
        state.chimes = response;
      } catch (e) {
        state.errorCode = e.errorCode;
        state.errorMessage = e.message;
        state.isError = true;
      }
    };

    const play = async (chime: ChimeItem) => {
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByContentsId(
        chime.id,
        chime.category
      );
      audioPlayer.start(audioBuffer);
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
      fetchChime();
    });

    const closeErrorModal = () => {
      state.isError = false;
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
      openSaveModal,
      closeSaveModal,
      openSavedModal,
      closeSavedModal,
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
