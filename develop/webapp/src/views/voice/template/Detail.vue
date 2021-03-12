<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>合成音声でナレーションを作成する</template>
          <template #buttons>
            <Button :isDisabled="isDisabledConfirm" @click="openModal"
              >確定</Button
            >
          </template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <div class="row">
            <FormGroup title="話者" class="speaker">
              <SelectBox
                v-model="speaker"
                :options="
                  ttsSpeakers.map((ttsSpeaker) => {
                    return { title: ttsSpeaker.name, value: ttsSpeaker.cd };
                  })
                "
              />
            </FormGroup>
            <FormGroup title="言語設定" class="lang">
              <div class="lang-check" v-for="(ttsLang, i) in ttsLangs" :key="i">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'inlineCheckbox' + `${i + 1}`"
                  :value="ttsLang"
                  v-model="langs"
                  @change="isCheckedLanguege"
                />
                <label
                  :class="[ttsLang]"
                  :for="'inlineCheckbox' + `${i + 1}`"
                />
              </div>
            </FormGroup>
          </div>
          <div class="row border">
            <FormGroup
              title="1:店名"
              description="※カタカナで入力"
              class="name"
            >
              <TextBox
                v-model="customerName"
                :onChangeInput="isCheckedStoreName"
              />
            </FormGroup>
            <FormGroup
              title="2:閉店時間"
              :description="errorMessageEndTime"
              :isErrorColor="isErrorEndTime"
              class="time"
            >
              <TimeInput v-model="endTime" :onChangeInput="isCheckedEndTime" />
            </FormGroup>
          </div>
          <div class="maniscript">
            {{ text }}
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
            <SelectBox
              v-model="playLang"
              :options="
                langs.map((lang) => {
                  return { title: lang, value: lang };
                })
              "
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
    <ModalLoading v-if="isLoading" title="音源の合成中" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
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
import TimeInput from "@/components/atoms/TimeInput.vue";
import { useGlobalStore } from "@/store";
import { TemplateItem } from "umesseapi/models";
import Constants from "@/utils/Constants";
import UMesseService from "@/services/UMesseService";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import UMesseCache from "@/repository/UMesseCache";
import { lang, speaker, TemplateDetailItem } from "@/models/TemplateDetailItem";
import * as Common from "@/utils/Common";
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
    TimeInput,
    ModalLoading,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = AudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const { cm } = useGlobalStore();

    const template = <TemplateItem>UMesseCache.freeCache.get("voice/template");
    let templateDetails: TemplateDetailItem[] = [];
    let ttsLangs: string[] = [];
    template.details.forEach(
      (element: { text: string; lang: lang; speaker: speaker }) => {
        templateDetails.push({
          text: element.text,
          lang: element.lang,
          speaker: element.speaker,
        });
        if (ttsLangs.find((v) => v == element.lang) == undefined)
          ttsLangs.push(element.lang);
      }
    );

    const state = reactive({
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isGenerating: computed(() => ttsStore.isGenerating()),
      isCreating: computed(() => ttsStore.isCreating()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      customerName: "",
      endTime: "21:00",
      isModalAppear: false,
      text: computed(() => {
        const text: string = template.manuscript
          .replace("{customerName}", state.customerName)
          .replace("{endTime}", state.endTime);
        return text;
      }),
      speaker: "1", // 女性
      langs: ["ja"],
      playLang: "ja",
      title: template.title,
      description: template.description,
      isLoading: false,
      errorMessageStoreName: "※カタカナで入力",
      isErrorStoreName: false,
      errorMessageEndTime: "",
      isErrorEndTime: false,
      errorMessageLanguage: "",
      isErrorLanguage: false,
      isDisabledConfirm: true,
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
      openModalLoading();
      const response = await ttsStore.createTtsData(
        state.title,
        state.description,
        state.langs
      );
      response?.forEach((element) => {
        cm.setNarration(element);
      });
      router.push({ name: "Cm" });
      closeModalLoading();
    };

    const openModal = async () => {
      state.isModalAppear = true;
      await ttsStore.generateTtsDataFromTemplate(
        templateDetails,
        state.customerName,
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
    const openModalLoading = () => {
      state.isLoading = true;
    };
    const closeModalLoading = () => {
      state.isLoading = false;
    };
    const isCheckedStoreName = () => {
      var res = true;
      if (!state.customerName || Common.isSpace(state.customerName) || !Common.isFullWidthKana(state.customerName)) {
        state.errorMessageStoreName = "全角カタカナで入力してください";
        state.isErrorStoreName = true;
        res = true;
      } else {
        state.errorMessageStoreName = "";
        state.isErrorStoreName = false;
        res = false;
      }
      state.isDisabledConfirm = isDisabledButtonConfirm();
      return res;
    };
    const isCheckedEndTime = () => {
      var res = true;
      if (!state.endTime || checkTime()) {
        state.errorMessageEndTime = "閉店時間を入力してください";
        state.isErrorEndTime = true;
        res = true;
      } else {
        state.errorMessageEndTime = "";
        state.isErrorEndTime = false;
        res = false;
      }
      state.isDisabledConfirm = isDisabledButtonConfirm();
      return res;
    };
    const checkTime = () => {
      var re = /^(?:--:(?:--|00)|00:--)$/;
      return re.test(state.endTime);
    };
    const isCheckedLanguege = () => {
      var res = true;
      if (!state.langs.length) {
        state.errorMessageLanguage = "言語設定を選択してください";
        state.isErrorLanguage = true;
        res = true;
      } else {
        state.errorMessageLanguage = "";
        state.isErrorLanguage = false;
        res = false;
      }
      state.isDisabledConfirm = isDisabledButtonConfirm();
      return res;
    };
    const isDisabledButtonConfirm = () => {
      if (
        !state.isErrorLanguage &&
        !state.isErrorStoreName &&
        !state.isErrorEndTime
      ) {
        return false;
      } else {
        return true;
      }
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
      template,
      templateDetails,
      isCheckedStoreName,
      isCheckedEndTime,
      isCheckedLanguege,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
.row {
  @include flex_start;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 36px;
  &.border {
    padding-top: 24px;
    margin-top: 54px;
    border-top: 2px solid rgb(198, 198, 198);
  }
  .form-group {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    &.speaker {
      ::v-deep {
        .title {
          width: 96px;
        }
        .input-wrapper {
          width: 180px;
          margin-right: 310px;
        }
      }
    }
    &.name {
      ::v-deep {
        .title {
          width: 96px;
        }
        .input-wrapper {
          width: 370px;
          margin-right: 120px;
        }
      }
    }
    &.time {
      ::v-deep {
        .title {
          width: 140px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.lang {
      ::v-deep {
        .title {
          width: 140px;
        }
      }
    }
  }
}
.maniscript {
  border: 1px solid rgb(190, 190, 190);
  border-radius: 6px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 54px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 14px;
  padding-bottom: 14px;
  font-size: 19px;
  font-weight: $font_weight_bold;
  line-height: 2em;
  height: 302px;
}
.lang-check {
  position: relative;
  width: 100px;
  height: 68px;
  border: 1px solid rgb(175, 175, 175);
  border-radius: 6px;
  margin-left: 26px;
  &:first-child {
    margin-left: 0;
  }
  input[type="checkbox"] {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -6px;
    right: -5px;
    outline: none;
    border: none;
    appearance: none;
    vertical-align: middle;
    margin: 0;
    background-color: white;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 26px;
      height: 26px;
      border: 2px solid rgb(192, 192, 191);
      border-radius: 3px;
      box-sizing: content-box;
    }
    &:checked {
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 30px;
        height: 30px;
        border: none;
        background-image: url("~@/assets/icon_checked.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  label {
    display: block;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.ja {
      background-image: url("~@/assets/lang_ja.svg");
    }
    &.en {
      background-image: url("~@/assets/lang_en.svg");
    }
    &.zh {
      background-image: url("~@/assets/lang_zh.svg");
    }
    &.ko {
      background-image: url("~@/assets/lang_ko.svg");
    }
  }
}
</style>
