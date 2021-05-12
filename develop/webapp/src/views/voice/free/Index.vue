<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header :clickBack="clickBack">
          <template #title>音声合成でナレーションを作成する</template>
          <template #buttons>
            <Button :disabled="!text" @click="generateTts"> 確定 </Button>
          </template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <div class="rounded bg-white">
            <div class="row">
              <FormGroup title="話者">
                <SelectBox
                  v-model="speaker"
                  :options="
                    ttsSpeakers.map((ttsSpeaker) => {
                      return { title: ttsSpeaker.name, value: ttsSpeaker.cd };
                    })
                  "
                />
              </FormGroup>
              <div class="form-center">
                <div class="text-length">
                  {{inputTextCount}} / {{Constants.MAX_LENGTH_TTS_FREE}}
                </div>
              </div>
              <Button
                class="btn-document"
                type="rectangle"
                @click="toVoiceFreeSelectTemplate"
              >
                原稿をコピーする
              </Button>
            </div>
            <TextArea
              class="document-text"
              v-model="text"
              placeholder="アナウンスの文言を入力してください。"
              :maxLength="Constants.MAX_LENGTH_TTS_FREE"
            />
          </div>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <transition>
      <ModalDialog v-if="isModalAppear" @close="stopAndCloseModal">
        <template #header>
          <ModalHeader title="保存しますか？" @close="stopAndCloseModal" />
        </template>
        <template #contents>
          <FormGroup title="試聴" class="play-form-group">
            <PlayDialogContents
              :isLoading="isGenerating || isDownloading"
              :isPlaying="isPlaying"
              :playbackTime="playbackTime"
              :duration="duration"
              @play="play(selectedBgm)"
              @stop="stop"
              :oninput="seekAudioPlayerProgressBar"
            />
          </FormGroup>
          <FormGroup title="タイトル" :required="true">
            <TextBox v-model="title" :maxLength="Constants.MAX_LENGTH_TITLE" />
          </FormGroup>
          <FormGroup title="説明">
            <TextArea
              v-model="description"
              :maxLength="Constants.MAX_LENGTH_DESCRIPTION"
            />
          </FormGroup>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="stopAndCloseModal"
              >キャンセル</Button
            >
            <Button
              type="primary"
              :isDisabled="title === undefined || title === '' || isCreating"
              @click="createTts"
              >保存して作成を続ける</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <ModalLoading v-if="isLoading" title="音源の合成中" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAudioPlayer from "@/utils/audioPlayer";
import provideTtsStore from "@/store/tts";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import Constants from "@/utils/constants";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { displayCache } from "@/repository/cache";
import analytics from "@/utils/firebaseAnalytics";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";
import { useCmStore } from "@/store/cm";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    ModalErrorDialog,
    PlayDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    ModalLoading,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = useAudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const lang = "ja";
    const cm = useCmStore();
    const {
      isApper: isModalAppear,
      open: openModal,
      close: closeModal,
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
      isGenerating: computed(() => ttsStore.isGenerating()),
      isCreating: computed(() => ttsStore.isCreating()),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      text:
        displayCache.get<string | undefined>(
          DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_TEXT
        ) ?? "",
      speaker:
        displayCache.get<string | undefined>(
          DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_SPEAKER
        ) ?? "1", // 女性
      title: "",
      description: "",
      inputTextCount: computed(() => {
        const inputText: number = state.text.length;
        return inputText;
      }),      
    });

    const play = async () => {
      try {
      state.isDownloading = true;
      console.log("play");
      const data = await ttsStore.getTtsData(lang);
      analytics.pressButtonPlayTrial(
        <string>data?.url,
        Constants.CATEGORY.FREE,
        Constants.SCREEN.VOICE_FREE
      );
      await audioPlayer.load(<string>data?.url);
      await audioPlayer.start();
      } catch (e) {
        openErrorModal(e);
      } finally {
        state.isDownloading = false;
      }
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const createTts = async () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_TEXT);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_SPEAKER);
      stop();
      openLoadingModal();
      const response = await ttsStore.createTtsData(
        state.title,
        state.description,
        [lang],
        [state.text]
      );

      var idString = "";
      response?.forEach((element) => {
        cm.setNarration(element);
        idString += element.id + ",";
      });
      analytics.setTts(idString);
      router.push({ name: "Cm" });
      closeLoadingModal();
    };

    const generateTts = async () => {
      try {
        openModal();
        await ttsStore.generateTtsDataFromFree(state.text, state.speaker);
      } catch (e) {
        closeModal();
        openErrorModal(e);
      }
    };
    const stopAndCloseModal = () => {
      stop();
      closeModal();
    };

    const toVoiceFreeSelectTemplate = () => {
      displayCache.set<string>(
        DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_SPEAKER,
        state.speaker
      );
      router.push({ name: "VoiceFreeSelectTemplate" });
    };

    const clickBack = () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_TEXT);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_SPEAKER);
      router.go(-1);
    };

    onMounted(() => {
      analytics.screenView(Constants.SCREEN.VOICE_FREE);
    });
    const seekAudioPlayerProgressBar = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        audioPlayer.changePlaybackTime(+e.target.value);
      }
    };
    return {
      ttsSpeakers,
      ...toRefs(state),
      play,
      stop,
      generateTts,
      createTts,
      stopAndCloseModal,
      seekAudioPlayerProgressBar,
      isModalAppear,
      openModal,
      closeModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      Constants,
      toVoiceFreeSelectTemplate,
      clickBack,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
.row {
  @include flex_between;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 36px;
  .form-group {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    ::v-deep {
      .title {
        width: 96px;
      }
      .input-wrapper {
        width: 180px;
      }
    }
  }
  .form-center {
    width: 55%;
    .text-length {
      font-size: 20px;
      font-weight: $font_weight_bold;
      text-align: right;
      margin-top: 20px;
    }
  }
  .btn-document {
    color: rgb(97, 97, 97);
  }
}
.document-title {
  color: rgb(42, 44, 45);
  font-size: 20px;
  font-weight: $font_weight_bold;
  background-color: rgb(196, 199, 201);
  height: 44px;
  width: 222px;
  border-radius: 22px;
  line-height: 44px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  margin-bottom: 24px;
}
.document-text {
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 24px;
  width: calc(100% - 130px);
  height: 454px;
  line-height: 2em;
}
.play-form-group {
  margin-bottom: 60px;
}
</style>
