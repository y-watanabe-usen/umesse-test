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
            <div class="row" style="padding: 0 20px">
              <div class="col-5">
                <div class="row" style="height: 100px">
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
              <div class="col-7">
                <div class="row" style="height: 100px">
                  <div class="col-2 m-auto">言語設定</div>
                  <div class="col-10 m-auto">
                    <div
                      class="form-check form-check-inline"
                      v-for="(ttsLang, i) in ttsLangs"
                      :key="i"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="'inlineCheckbox' + `${i + 1}`"
                        :value="ttsLang"
                        v-model="langs"
                      />
                      <label
                        class="form-check-label"
                        :for="'inlineCheckbox' + `${i + 1}`"
                        >{{ ttsLang }}</label
                      >
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
              :isLoading="isGenerating"
              :isPlaying="isPlaying"
              :playbackTime="playbackTime"
              :duration="duration"
              @play="play(selectedBgm)"
              @stop="stop"
            />
          </FormGroup>
          <FormGroup title="">
            <select class="form-control w-25" v-model="playLang">
              <option
                v-for="ttsLang in ttsLangs"
                :key="ttsLang"
                :value="ttsLang"
              >
                {{ ttsLang }}
              </option>
            </select>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import AudioPlayer from "@/utils/AudioPlayer";
import AudioStore from "@/store/audio";
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
import Constants from "@/utils/Constants";
import UMesseService from "@/services/UMesseService";
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
    const audioStore = AudioStore();
    const audioPlayer = AudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const ttsLangs = Constants.TTS_LANGS;
    // TODO: 本当はAPIから取得
    const sourceText = {
      ja:
        "本日は{storeName}へご来店いただきまして、誠にありがとうございます。お客様にご連絡申し上げます。当店の営業時間は、{endTime}までとなっております。本日はご利用、ありがとうございます。どうぞ、ごゆっくりお過ごしくださいませ。",
      en:
        "Thank you for visiting {storeName} today. We will contact you. Our store is open until {endTime}. Thank you for using today. Please spend your time slowly.",
      zh:
        "感谢您今天访问{storeName}。 我们将与您联系。 我们的商店营业至{endTime}。 感谢您今天使用。 请慢慢来。",
      ko:
        "오늘은 {storeName}에 내점 해 주셔서 대단히 감사합니다. 고객에게 알려드립니다. 당점의 영업 시간은 {endTime}까지로되어 있습니다. 오늘은 이용해 주셔서 감사합니다. 자, 천천히 보내시기 바랍니다.",
    };
    const { cm } = useGlobalStore();
    const state = reactive({
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isGenerating: computed(() => ttsStore.isGenerating()),
      isCreating: computed(() => ttsStore.isCreating()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      storeName: "",
      endTime: "21:00",
      isModalAppear: false,
      text: computed(() => {
        const source = sourceText.ja;
        const text: string = source
          .replace("{storeName}", state.storeName)
          .replace("{endTime}", state.endTime);
        return text;
      }),
      speaker: "1", // 女性
      langs: ["ja"],
      playLang: "ja",
      title: "",
      description: "",
    });
    const play = async () => {
      console.log("play");
      const data = await ttsStore.getTtsData(state.playLang);
      const audioBuffer = await UMesseService.resourcesService.getAudioBufferByUrl(
        <string>data?.url
      );
      audioPlayer.start(audioBuffer);
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };
    const createTts = async () => {
      const response = await ttsStore.createTtsData(
        state.title,
        state.description,
        state.langs
      );
      response?.forEach((element) => {
        cm.setNarration(element);
      });
      router.push({ name: "Cm" });
    };

    const openModal = async () => {
      state.isModalAppear = true;
      console.log(
        "openModal",
        state.storeName,
        state.endTime,
        state.speaker,
        state.langs
      );
      await ttsStore.generateTtsDataFromTemplate(
        sourceText,
        state.storeName,
        state.endTime,
        state.speaker,
        state.langs
      );
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
      ttsSpeakers,
      ttsLangs,
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

input[type="checkbox"] {
  -webkit-appearance: checkbox;
}
</style>