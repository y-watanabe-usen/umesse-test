<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>音声合成でナレーションを作成する</template>
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
                />
                <label
                  :class="[ttsLang]"
                  :for="'inlineCheckbox' + `${i + 1}`"
                />
              </div>
              <div>
                <p class="errorMessage errorLangs">
                  {{ errorMessageLangs }}
                </p>
              </div>
            </FormGroup>
          </div>
          <div class="row border">
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.customerName)"
              title="店名"
              description="※カタカナで入力"
              class="name"
            >
              <TextBox v-model="customerName" />
              <div>
                <p class="errorMessage errorCustomerName">
                  {{ errorMessageCustomerName }}
                </p>
              </div>
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.time)"
              title="時間"
              class="time"
            >
              <TimeInput v-model="time" />
              <div>
                <p class="errorMessage errorEndTime">
                  {{ errorMessageEndTime }}
                </p>
              </div>
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.percentage)"
              title="パーセンテージ"
              class="percentage"
            >
              <Percentage v-model="percentage" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.count)"
              title="個数"
              class="count"
            >
              <Count v-model="count" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.endYearDate)"
              title="年末の日付"
              class="end-year-date"
            >
              <EndYearDate v-model="endYearDate" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.newYearDate)"
              title="年始の日付"
              class="new-year-date"
            >
              <NewYearDate v-model="newYearDate" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.age)"
              title="年齢"
              class="age"
            >
              <Age v-model="age" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.minutes)"
              title="分"
              class="minutes"
            >
              <Minutes v-model="minutes" />
            </FormGroup>
            <FormGroup
              v-if="ttsComponents.find((v) => v == TtsComponents.point)"
              title="ポイント倍率"
              class="point"
            >
              <Point v-model="point" />
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
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { lang, speaker, TemplateDetailItem } from "@/models/TemplateDetailItem";
import validator from "@/utils/validator";
import { audioService } from "@/services";
import { freeCache } from "@/repository/cache";
import Percentage from "@/components/molecules/Percentage.vue";
import Count from "@/components/molecules/Count.vue";
import EndYearDate from "@/components/molecules/EndYearDate.vue";
import NewYearDate from "@/components/molecules/NewYearDate.vue";
import Age from "@/components/molecules/Age.vue";
import Minutes from "@/components/molecules/Minutes.vue";
import Point from "@/components/molecules/Point.vue";

const TtsComponents = {
  customerName: "${customerName}",
  time: "${time}",
  percentage: "${percentage}",
  count: "${number}",
  endYearDate: "${date1}",
  newYearDate: "${date2}",
  age: "${age}",
  minutes: "${minutes}",
  point: "${points}",
} as const;
// type ComponentList = typeof ComponentList[keyof typeof ComponentList];

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
    Percentage,
    Count,
    EndYearDate,
    NewYearDate,
    Age,
    Minutes,
    Point,
  },
  setup() {
    const router = useRouter();
    const ttsStore = provideTtsStore(); //FIXME: provide name.
    const audioPlayer = AudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const { cm } = useGlobalStore();

    const template = <TemplateItem>freeCache.get("voice/template");
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
      customerName: "テンポメイ",
      time: "21:00",
      percentage: 10,
      count: 3,
      endYearDate: "12/30",
      newYearDate: "1/3",
      age: 18,
      minutes: 10,
      point: 3,
      isModalAppear: false,
      text: computed(() => {
        const text: string = template.manuscript
          .replaceAll(TtsComponents.customerName, state.customerName)
          .replaceAll(TtsComponents.time, state.time)
          .replaceAll(TtsComponents.percentage, state.percentage)
          .replaceAll(TtsComponents.count, state.count)
          .replaceAll(TtsComponents.endYearDate, state.endYearDate)
          .replaceAll(TtsComponents.newYearDate, state.newYearDate)
          .replaceAll(TtsComponents.age, state.age)
          .replaceAll(TtsComponents.minutes, state.minutes)
          .replaceAll(TtsComponents.point, state.point);
        return text;
      }),
      speaker: "1", // 女性
      langs: ["ja"],
      playLang: "ja",
      title: template.title,
      description: template.description,
      isLoading: false,
      errorMessageCustomerName: computed(() => {
        const customerName: string = state.customerName;
        return selectErrorMessageCustomerName(customerName);
      }),
      isErrorCustomerName: false,
      errorMessageEndTime: computed(() => {
        const time: string = state.time;
        return selectErrorMessageEndTime(time);
      }),
      isErrorEndTime: false,
      errorMessageLangs: computed(() => {
        const langs: string[] = state.langs;
        return selectErrorMessageLangs(langs);
      }),
      isErrorLangs: false,
      isDisabledConfirm: computed(() => {
        const customerName: string = state.customerName;
        return isDisabledButtonConfirm(customerName);
      }),
    });
    const play = async () => {
      console.log("play");
      const data = await ttsStore.getTtsData(state.playLang);
      const audioBuffer = await audioService.getByUrl(<string>data?.url);
      audioPlayer.start(audioBuffer);
    };
    const stop = () => {
      if (state.isPlaying) audioPlayer.stop();
    };
    const createTts = async () => {
      stop();
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
        state.time,
        state.percentage,
        state.count,
        state.endYearDate,
        state.newYearDate,
        state.age,
        state.minutes,
        state.point,
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
    const selectErrorMessageCustomerName = (customerName: string) => {
      if (!validator.isFullWidthKana(customerName)) {
        state.isErrorCustomerName = true;
        return "全角カタカナで入力してください。";
      } else {
        state.isErrorCustomerName = false;
        return "";
      }
    };
    const selectErrorMessageEndTime = (endTime: string) => {
      if (!endTime) {
        state.isErrorEndTime = true;
        return "閉店時間を入力してください";
      } else {
        state.isErrorEndTime = false;
        return "";
      }
    };
    const selectErrorMessageLangs = (langs: string[]) => {
      if (!langs.length) {
        state.isErrorLangs = true;
        return "言語設定を選択してください";
      } else {
        state.isErrorLangs = false;
        return "";
      }
    };
    const isDisabledButtonConfirm = (customerName: string) => {
      console.log(customerName);
      return false;
      // if (!customerName || validator.isEmpty(customerName))
      //   state.isErrorCustomerName = true;

      // if (
      //   !state.isErrorLangs &&
      //   !state.isErrorCustomerName &&
      //   !state.isErrorEndTime
      // ) {
      //   return false;
      // } else {
      //   return true;
      // }
    };

    const findComponents = (text: string) => {
      // TODO: もっと良い方法がありそう
      let ttsComponents: typeof TtsComponents[keyof typeof TtsComponents][] = [];
      if (text.indexOf(TtsComponents.customerName) != -1)
        ttsComponents.push(TtsComponents.customerName);
      if (text.indexOf(TtsComponents.time) != -1)
        ttsComponents.push(TtsComponents.time);
      if (text.indexOf(TtsComponents.percentage) != -1)
        ttsComponents.push(TtsComponents.percentage);
      if (text.indexOf(TtsComponents.count) != -1)
        ttsComponents.push(TtsComponents.count);
      if (text.indexOf(TtsComponents.endYearDate) != -1)
        ttsComponents.push(TtsComponents.endYearDate);
      if (text.indexOf(TtsComponents.newYearDate) != -1)
        ttsComponents.push(TtsComponents.newYearDate);
      if (text.indexOf(TtsComponents.age) != -1)
        ttsComponents.push(TtsComponents.age);
      if (text.indexOf(TtsComponents.minutes) != -1)
        ttsComponents.push(TtsComponents.minutes);
      if (text.indexOf(TtsComponents.point) != -1)
        ttsComponents.push(TtsComponents.point);
      console.log(ttsComponents);
      return ttsComponents;
    };
    const ttsComponents = findComponents(template.manuscript);

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
      TtsComponents,
      ttsComponents,
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
          width: 96px;
        }
        .input-wrapper {
          width: 150px;
          margin-right: 120px;
        }
      }
    }
    &.percentage {
      ::v-deep {
        .title {
          width: 200px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.count {
      ::v-deep {
        .title {
          width: 96px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.end-year-date {
      ::v-deep {
        .title {
          width: 150px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.new-year-date {
      ::v-deep {
        .title {
          width: 150px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.age {
      ::v-deep {
        .title {
          width: 96px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.minutes {
      ::v-deep {
        .title {
          width: 96px;
        }
        .input-wrapper {
          width: 150px;
        }
      }
    }
    &.point {
      ::v-deep {
        .title {
          width: 150px;
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
  caret-color: transparent;
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
.errorMessage {
  color: rgb(255, 0, 0);
  font-size: 16px;
  position: absolute;
  left: 140px;
  bottom: -24px;
  caret-color: transparent;
  &.errorLangs {
    width: 100%;
    left: 0px;
  }
  &.errorCustomerName {
    width: 80%;
  }
  &.errorEndTime {
    width: 150%;
    left: 0px;
  }
}
</style>
