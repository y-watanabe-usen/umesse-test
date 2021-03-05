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
            <div class="row p-4">
              <div class="col">
                <div class="row">
                  <div class="col-2 m-auto">話者</div>
                  <div class="col-10 m-auto">
                    <select class="form-control w-25" v-model="speaker">
                      <option
                        v-for="ttsSpeaker in ttsSpeakers"
                        :key="ttsSpeaker.cd"
                        :value="ttsSpeaker.cd"
                      >
                        {{ ttsSpeaker.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col text-right">
                <router-link
                  class="btn btn-light shadow my-auto"
                  :to="{ name: 'VoiceFreeSelectTemplate' }"
                >
                  原稿をコピーする
                </router-link>
              </div>
            </div>
            <div class="row p-4">
              <div
                class="alert alert-dark alert-maniscript mx-auto my-3"
                role="alert"
              >
                原稿
              </div>
              <textarea
                class="col-12 p-3 rounded"
                style="height: 500px"
                placeholder="アナウンスの文言を入力してください。"
                v-model="text"
              ></textarea>
            </div>
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
import { defineComponent, reactive, computed, toRefs, provide } from "vue";
import { useRouter } from "vue-router";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
import { UPLOAD_TTS_STATE } from "@/services/uploadTtsService";
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
    ModalUploading,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioStore = AudioStore();
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
      UPLOAD_TTS_STATE,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
.play-form-group {
  margin-bottom: 60px;
}
.alert-maniscript {
  text-align: center;
  padding: 5px;
  width: 150px;
  border-radius: 2em;
}
</style>
