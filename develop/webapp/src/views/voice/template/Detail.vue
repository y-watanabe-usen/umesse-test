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
          <div class="row" style="padding: 0 20px">
            <div class="col-5">
              <div class="row" style="height: 100px">
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
            <div class="col-7">
              <div class="row" style="height: 100px">
                <div class="col-2 m-auto">言語設定</div>
                <div class="col-10 m-auto">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                      style="position: fixed"
                    />
                    <label class="form-check-label" for="inlineCheckbox1"
                      ><img class="country m-1" src="../../../assets/japan.svg"
                    /></label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                      style="position: fixed"
                    />
                    <label class="form-check-label" for="inlineCheckbox2"
                      ><img
                        class="country m-1"
                        src="../../../assets/america.svg"
                    /></label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option3"
                      style="position: fixed"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                      ><img class="country m-1" src="../../../assets/china.svg"
                    /></label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="option4"
                      style="position: fixed"
                    />
                    <label class="form-check-label" for="inlineCheckbox4"
                      ><img class="country m-1" src="../../../assets/korea.svg"
                    /></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="padding: 0 20px">
            <div class="col-5">
              <div class="row" style="height: 100px">
                <div class="col-2 m-auto">1:店名</div>
                <div class="col-10 m-auto">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="カタカナで入力"
                    v-model="storeName"
                  />
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row" style="height: 100px">
                <div class="col-2 m-auto">2:閉店時間</div>
                <div class="col-10 m-auto">
                  <input class="form-control" type="time" v-model="endTime" />
                </div>
              </div>
            </div>
          </div>
          <div class="rounded maniscript">
            <div
              class="alert alert-dark alert-maniscript mx-auto my-3"
              role="alert"
            >
              原稿
            </div>
            <div class="maniscript-body">
              {{ text }}
            </div>
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
            :isLoading="isCreating"
            :isPlaying="isPlaying"
            :playbackTime="playbackTime"
            :duration="duration"
            @play="play(selectedBgm)"
            @stop="stop"
          />
        </FormGroup>
        <FormGroup title="タイトル" :required="true">
          <TextBox v-model:value="file.title" />
        </FormGroup>
        <FormGroup title="説明">
          <TextArea v-model:value="file.description" />
        </FormGroup>
      </template>
      <template #footer>
        <ModalFooter>
          <Button type="secondary" @click="stopAndCloseModal">キャンセル</Button>
          <Button
            type="primary"
            :isDisabled="file.title === undefined || file.title === ''"
            @click="uploadTtsFile"
            >保存して作成を続ける</Button
          >
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import AudioPlayer from "@/utils/AudioPlayer";
import { RecordingFile, UPLOAD_TTS_STATE } from "@/services/uploadTtsService";
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
    PlayDialogContents,
    FormGroup,
    TextBox,
    TextArea,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = AudioPlayer();
    const speakers = ["risa", "takeru"];
    const { cm, base } = useGlobalStore();

    const state = reactive({
      file: <RecordingFile>{},
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isCreating: computed(() => ttsStore.isCreating()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      storeName: "",
      endTime: "21:00",
      isModalAppear: false,
      text: computed(() => {
        const source =
          "本日は{storeName}へご来店いただきまして、誠にありがとうございます。お客様にご連絡申し上げます。当店の営業時間は、{endTime}までとなっております。本日はご利用、ありがとうございます。どうぞ、ごゆっくりお過ごしくださいませ。";
        const text: string = source
          .replace("{storeName}", state.storeName)
          .replace("{endTime}", state.endTime);
        return text;
      }),
      speaker: "risa",
    });

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
      const uploadedData: any = await ttsStore.uploadTtsData(state.file);
      // TODO: 本来はttsidが返ってくるはずだけどidで返ってきてる
      uploadedData.ttsId = uploadedData.id;
      console.log("uploadedData", uploadedData);
      cm.setNarration(<TtsItem>uploadedData);
      router.push({ name: "Cm" });
    };

    const openModal = () => {
      state.isModalAppear = true;
      console.log("openModal");
      createTtsData(state.text, state.speaker);
    };

    const closeModal = () => {
      state.isModalAppear = false;
    };

    const stopAndCloseModal = () => {
      stop();
      closeModal();
    };

    return {
      ...toRefs(state),
      speakers,
      play,
      stop,
      createTtsData,
      uploadTtsFile,
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

.play-form-group {
  margin-bottom: 60px;
}
.info1 {
  border-bottom: 1px solid #ccc;
}
.country {
  width: 100px;
  border: 1px solid #ccc;
}
.maniscript {
  margin: 30px;
  border: 1px solid #ccc;
}
.alert-maniscript {
  text-align: center;
  padding: 5px;
  width: 150px;
  border-radius: 2em;
}
.maniscript-body {
  margin: 20px;
  font-size: 20px;
  line-height: 2em;
}
</style>
