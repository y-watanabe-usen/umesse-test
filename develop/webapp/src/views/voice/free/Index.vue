<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>合成音声でナレーションを作成する</template>
          <template #buttons>
            <Button @click="openModal">確定</Button>
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
              <Button
                class="btn-document"
                type="rectangle"
                @click="$router.push({ name: 'VoiceFreeSelectTemplate' })"
              >
                原稿をコピーする
              </Button>
            </div>
            <TextArea
              class="document-text"
              v-model="text"
              placeholder="アナウンスの文言を入力してください。"
            />
          </div>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalDialog v-if="isModalAppear" @close="stopAndCloseModal">
        <template #header>
          <ModalHeader title="保存しますか？" @close="stopAndCloseModal" />
        </template>
        <template #contents>
          <FormGroup title="試聴" class="play-form-group">
            <PlayDialogContents
              :isLoading="isGenerating"
              :isPlaying="isPlaying"
              :playbackTime="playbackTime"
              :duration="duration"
              @play="play(selectedBgm)"
              @stop="stop"
            />
          </FormGroup>
          <FormGroup title="タイトル" :required="true">
            <TextBox v-model="title" />
          </FormGroup>
          <FormGroup title="説明">
            <TextArea v-model="description" />
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
    <transition>
      <ModalUploading v-if="isModalUploading" title="音源の合成中">
      </ModalUploading>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import AudioPlayer from "@/utils/AudioPlayer";
import provideTtsStore from "@/store/tts";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { useGlobalStore } from "@/store";
import Constants from "@/utils/Constants";
import UMesseCache from "@/repository/UMesseCache";
import UMesseService from "@/services/UMesseService";
import ModalUploading from "@/components/organisms/ModalUploading.vue";
export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    PlayDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    ModalUploading,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = AudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const lang = "ja";
    const { cm } = useGlobalStore();
    const state = reactive({
      isGenerating: computed(() => ttsStore.isGenerating()),
      isCreating: computed(() => ttsStore.isCreating()),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      text: "",
      speaker: "1", // 女性
      isModalAppear: false,
      title: "",
      description: "",
      isModalUploading: false,
    });
    // TODO: キャッシュでいいのか
    const cacheKey = "voice/free/selectTemplate";
    if (UMesseCache.freeCache.has(cacheKey)) {
      state.text = <string>UMesseCache.freeCache.get(cacheKey);
      UMesseCache.freeCache.del(cacheKey);
    } else {
      state.text = "おはよう";
    }
    const play = async () => {
      console.log("play");
      const data = await ttsStore.getTtsData(lang);
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByUrl(
        <string>data?.url
      );
      audioPlayer.start(audioBuffer);
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const createTts = async () => {
      stop();
      openModalUploading();
      const response = await ttsStore.createTtsData(
        state.title,
        state.description,
        [lang]
      );
      response?.forEach((element) => {
        cm.setNarration(element);
      });
      router.push({ name: "Cm" });
      closeModalUploading();
    };

    const openModal = async () => {
      state.isModalAppear = true;
      await ttsStore.generateTtsDataFromFree(state.text, state.speaker);
    };
    const closeModal = () => {
      state.isModalAppear = false;
    };
    const stopAndCloseModal = () => {
      stop();
      closeModal();
    };
    const openModalUploading = () => {
      state.isModalUploading = true;
      closeModal();
    };
    const closeModalUploading = () => {
      state.isModalUploading = false;
    };
    return {
      ttsSpeakers,
      ...toRefs(state),
      play,
      stop,
      createTts,
      openModal,
      closeModal,
      stopAndCloseModal,
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
