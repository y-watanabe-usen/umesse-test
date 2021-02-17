<template>
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
                    <option v-for="speaker in speakers" :key="speaker">
                      {{ speaker }}
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
    <ModalDialog v-if="isModalAppear" @close="closeModal">
      <template #header>
        <ModalHeader title="保存しますか？" @close="closeModal" />
      </template>
      <template #contents>
        <div class="row">
          <div class="col-2">試聴</div>
          <div class="col-10">
            <div class="row">
              <div class="col-4">
                <template v-if="isCreating">
                  <button class="btn btn-play btn-light" type="button" disabled>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Loading...</span>
                    作成中
                  </button>
                </template>
                <template v-else>
                  <template v-if="!isPlaying">
                    <button
                      type="button"
                      class="btn btn-light shadow btn-play"
                      @click="play(selectedBgm)"
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
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-2">タイトル</div>
          <div class="col-10">
            <input class="form-control" type="text" v-model="file.title" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-2">説明</div>
          <div class="col-10">
            <textarea class="form-control"></textarea>
          </div>
        </div>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="closeModal">キャンセル</Button>
          <Button type="primary" @click="toCreateCm"
            >保存して作成を続ける</Button
          >
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, provide } from "vue";
import { useRouter } from "vue-router";
import AudioPlayer from "@/utils/AudioPlayer";
import {
  RecordingFile,
  useUploadTtsService,
  UPLOAD_TTS_STATE,
} from "@/services/uploadTtsService";
import provideTtsStore from "@/store/tts";
import * as FormatDate from "@/utils/FormatDate";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/molecules/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import { useGlobalStore } from "@/store";
import { TtsItem } from "umesseapi/models";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = AudioPlayer();
    const speakers = ["risa", "takeru"];
    const { cm, base } = useGlobalStore();
    const state = reactive({
      file: <RecordingFile>{},
      uploadTtsState: computed(() => ttsStore.getStatus()),
      isCreating: computed(() => ttsStore.isCreating()),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      playbackTimeHms: computed(() =>
        FormatDate.convertNumberToTime(audioPlayer.getPlaybackTime())
      ),
      duration: computed(() => audioPlayer.getDuration()),
      durationHms: computed(() =>
        FormatDate.convertNumberToTime(audioPlayer.getDuration())
      ),
      text: "",
      speaker: "risa",
      isModalAppear: false,
    });

    // TODO: キャッシュでいいのか
    const cacheKey = "voice/free/selectTemplate";
    if (base.cache.has(cacheKey)) {
      state.text = <string>base.cache.get(cacheKey);
      base.cache.del(cacheKey);
    } else {
      state.text = "おはよう";
    }

    const play = async () => {
      console.log("play");
      const audioBuffer = await ttsStore.getTtsData();
      audioPlayer.start(audioBuffer!!);
    };

    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };

    const createTtsData = async (text: string, speaker: string) => {
      console.log("create");
      await ttsStore.createTtsData(text, speaker);
    };

    const uploadTtsFile = async () => {
      /// check state.file.
      state.file.blob = await ttsStore.getUploadTtsData();
      ttsStore.uploadTtsData(state.file);
    };

    const toCreateCm = () => {
      const id = "1";
      cm.setNarration(<TtsItem>ttsStore.getUserTts(id));
      router.push({ name: "Cm" });
    };

    const openModal = () => {
      state.isModalAppear = true;
      createTtsData(state.text, state.speaker);
    };

    const closeModal = () => {
      state.isModalAppear = false;
    };

    return {
      speakers,
      ...toRefs(state),
      play,
      stop,
      createTtsData,
      toCreateCm,
      openModal,
      closeModal,
      UPLOAD_TTS_STATE,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;

.btn-play,
.btn-close {
  width: 120px;
}
.alert-maniscript {
  text-align: center;
  padding: 5px;
  width: 150px;
  border-radius: 2em;
}
</style>
