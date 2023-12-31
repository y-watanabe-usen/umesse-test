<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>音声合成でナレーションを作成する</template>
          <template #buttons>
            <Button
              :isDisabled="isDisabledConfirm"
              type="emphasis"
              @click="generateTts"
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
              v-if="isVisibleCustomerName"
              title="店名"
              description="※1  カタカナで入力"
              descriptionSub="※2  店名は日本語の原稿のみに反映"
              class="name"
            >
              <TextBox
                v-model="customerName"
                :maxLength="Constants.MAX_LENGTH_CUSTOMER_NAME"
                placeholder="入力してください。"
              />
              <div>
                <p class="errorMessage errorCustomerName">
                  {{ errorMessageCustomerName }}
                </p>
              </div>
            </FormGroup>
            <FormGroup v-if="isVisibleTime" title="時間" class="time">
              <TimeInput v-model="time" @click="openTimeModal" />
              <div>
                <p class="errorMessage errorTime">
                  {{ errorMessageTime }}
                </p>
              </div>
            </FormGroup>
            <FormGroup
              v-if="isVisiblePercentage"
              title="パーセンテージ"
              class="percentage"
            >
              <Percentage v-model="percentage" />
            </FormGroup>
            <FormGroup v-if="isVisibleCount" title="個数" class="count">
              <Count v-model="count" />
            </FormGroup>
            <FormGroup
              v-if="isVisibleEndYearDate"
              title="年末の日付"
              class="end-year-date"
            >
              <EndYearDate v-model="endYearDate" />
            </FormGroup>
            <FormGroup
              v-if="isVisibleNewYearDate"
              title="年始の日付"
              class="new-year-date"
            >
              <NewYearDate v-model="newYearDate" />
            </FormGroup>
            <FormGroup v-if="isVisibleAge" title="年齢" class="age">
              <Age v-model="age" />
            </FormGroup>
            <FormGroup v-if="isVisibleMinutes" title="分" class="minutes">
              <Minutes v-model="minutes" />
            </FormGroup>
            <FormGroup v-if="isVisiblePoint" title="ポイント倍率" class="point">
              <Point v-model="point" />
            </FormGroup>
          </div>
          <div class="maniscript">
            <p v-html="text"></p>
          </div>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalDialog v-if="isModalAppear" @close="stopAndCloseModal">
        <template #header>
          <ModalHeader
            title="音声合成素材の必要情報入力"
            @close="stopAndCloseModal"
          />
        </template>
        <template #contents>
          <FormGroup title="試聴" class="play-form-group">
            <PlayDialogContents
              :isLoading="isGenerating || isDownloading"
              :isPlaying="isPlaying"
              :playbackTime="playbackTime"
              :duration="duration"
              @play="play()"
              @stop="stop"
              @change="changeAudioPlayerSlider"
            />
          </FormGroup>
          <FormGroup title="">
            <SelectBox
              v-model="playLang"
              :options="
                getLangsTitle(langs).map((lang) => {
                  return { title: lang.name, value: lang.cd };
                })
              "
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
              :isDisabled="
                title === undefined ||
                  title === '' ||
                  isCreating ||
                  isGenerating
              "
              @click="createTts"
              >保存して作成を続ける</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalDialog v-if="isTimeModalAppear" @close="closeTimeModal">
        <template #header>
          <ModalHeader title="時間設定" @close="closeTimeModal" />
        </template>
        <template #contents>
          <TimeSelector v-model="tmpTime" />
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeTimeModal">キャンセル</Button>
            <Button type="primary" @click="confirmTime">確定</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <ModalLoading v-if="isLoading" />
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <transition>
      <ModalInvalidTokenDialog
        v-if="isInvalidTokenModalAppear"
        @close="toHome"
        :onClick="toHome"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAudioPlayer from "@/utils/audioPlayer";
import { useGlobalStore } from "@/store";
import provideTtsStore from "@/store/tts";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import ModalInvalidTokenDialog from "@/components/organisms/ModalInvalidTokenDialog.vue";
import PlayDialogContents from "@/components/molecules/PlayDialogContents.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import TimeInput from "@/components/atoms/TimeInput.vue";
import TimeSelector from "@/components/molecules/TimeSelector.vue";
import { TemplateItem } from "umesseapi/models";
import Constants, { ERROR_CODE } from "@/utils/constants";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { lang, speaker, TemplateDetailItem } from "@/models/templateDetailItem";
import validator from "@/utils/validator";
import { displayCache } from "@/repository/cache";
import Percentage from "@/components/molecules/Percentage.vue";
import Count from "@/components/molecules/Count.vue";
import EndYearDate from "@/components/molecules/EndYearDate.vue";
import NewYearDate from "@/components/molecules/NewYearDate.vue";
import Age from "@/components/molecules/Age.vue";
import Minutes from "@/components/molecules/Minutes.vue";
import Point from "@/components/molecules/Point.vue";
import ttsTextConverter, { ConverterType } from "@/utils/ttsTextConverter";
import * as common from "@/utils/common";
import { NarrationItem } from "umesseapi/models";
import { MAX_NARRATION_COUNT, useCmStore } from "@/store/cm";
import analytics from "@/utils/firebaseAnalytics";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";

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
    ModalInvalidTokenDialog,
    PlayDialogContents,
    FormGroup,
    TextBox,
    TextArea,
    SelectBox,
    TimeInput,
    TimeSelector,
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
    const audioPlayer = useAudioPlayer();
    const ttsSpeakers = Constants.TTS_GENDERS;
    const cm = useCmStore();
    const { auth } = useGlobalStore();
    const template = displayCache.get<TemplateItem>(
      DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SELECT_TEMPLATE
    );
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

    const isVisibleCustomerName =
      template.manuscript.indexOf(ConverterType.customerName) != -1;
    const isVisibleTime = template.manuscript.indexOf(ConverterType.time) != -1;
    const isVisiblePercentage =
      template.manuscript.indexOf(ConverterType.percentage) != -1;
    const isVisibleCount =
      template.manuscript.indexOf(ConverterType.count) != -1;
    const isVisibleEndYearDate =
      template.manuscript.indexOf(ConverterType.endYearDate) != -1;
    const isVisibleNewYearDate =
      template.manuscript.indexOf(ConverterType.newYearDate) != -1;
    const isVisibleAge = template.manuscript.indexOf(ConverterType.age) != -1;
    const isVisibleMinutes =
      template.manuscript.indexOf(ConverterType.minutes) != -1;
    const isVisiblePoint =
      template.manuscript.indexOf(ConverterType.point) != -1;

    const {
      isApper: isModalAppear,
      // open: openModal,
      close: closeModal,
    } = useModalController();
    const {
      isApper: isTimeModalAppear,
      // open: openTimeModal,
      close: closeTimeModal,
    } = useModalController();
    const {
      isApper: isInvalidTokenModalAppear,
      open: openInvalidTokenModal,
      close: closeInvalidTokenModal,
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
      isPlaying: computed(() => audioPlayer.isPlaying()),
      isGenerating: computed(() => ttsStore.isGenerating()),
      isCreating: computed(() => ttsStore.isCreating()),
      isDownloading: false,
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      narrations: computed(() => cm.narrations),
      customerName: "",
      tmpTime: "21:00",
      time: "21:00",
      percentage: 10,
      count: 3,
      endYearDate: "12/30",
      newYearDate: "1/3",
      age: 18,
      minutes: 10,
      point: 3,
      text: computed(() => {
        const text: string = ttsTextConverter.convertTemplateManuscript(
          template.manuscript,
          "ja",
          state.customerName,
          state.time,
          state.percentage,
          state.count,
          state.endYearDate,
          state.newYearDate,
          state.age,
          state.minutes,
          state.point
        );
        return text;
      }),
      speaker: "1", // 女性
      langs: ["ja"],
      playLang: "ja",
      title: template.title,
      description: template.description,
      errorMessageCustomerName: computed(() => {
        const customerName: string = state.customerName;
        return selectErrorMessageCustomerName(customerName);
      }),
      isErrorCustomerName: false,
      errorMessageTime: computed(() => {
        const time: string = state.time;
        return selectErrorMessageTime(time);
      }),
      isErrorTime: false,
      errorMessageLangs: computed(() => {
        const langs: string[] = state.langs;
        const narrations: NarrationItem[] = state.narrations;
        return selectErrorMessageLangs(langs, narrations);
      }),
      isErrorLangs: false,
      isDisabledConfirm: computed(() => {
        const customerName: string = state.customerName;
        return isDisabledButtonConfirm(customerName);
      }),
    });
    const openModal = () => {
      const selectLang = common.getLangs(state.langs);
      let index = 0;
      selectLang.forEach((v) => {
        state.langs.splice(index, 1, v.cd);
        index++;
      });
      state.playLang = selectLang[0].cd;
      isModalAppear.value = true;
    };
    const openTimeModal = () => {
      state.tmpTime = state.time;
      isTimeModalAppear.value = true;
    };
    const play = async () => {
      try {
        state.isDownloading = true;
        const data = await ttsStore.getTtsData(state.playLang);
        analytics.pressButtonPlayTrial(
          <string>data?.url,
          Constants.CATEGORY.TEMPLATE,
          Constants.SCREEN.VOICE_TEMPLATE_DETAIL
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
      try {
        stop();
        openLoadingModal();

        let manuscripts: string[] = [];
        state.langs.forEach((lang) => {
          templateDetails.forEach((templateDetail) => {
            if (
              templateDetail.lang == lang &&
              templateDetail.speaker == state.speaker
            ) {
              const manuscript = ttsTextConverter.convertManuscript(
                templateDetail.text,
                lang,
                state.customerName,
                state.time,
                state.percentage,
                state.count,
                state.endYearDate,
                state.newYearDate,
                state.age,
                state.minutes,
                state.point
              );
              manuscripts.push(manuscript);
            }
          });
        });

        const response = await ttsStore.createTtsData(
          state.title,
          state.description,
          state.langs,
          manuscripts
        );

        var idString = "";
        response?.forEach((element) => {
          cm.setNarration(element);
          idString += element.id + ",";
        });
        analytics.setTts(idString);
        router.push({ name: "Cm" });
      } catch (e) {
        if (e.errorCode == ERROR_CODE.A3001) {
          auth.resetToken();
          openInvalidTokenModal();
        } else {
          openErrorModal(e);
        }
      } finally {
        closeLoadingModal();
      }
    };

    const generateTts = async () => {
      try {
        openModal();
        await ttsStore.generateTtsDataFromTemplate(
          templateDetails,
          state.langs,
          state.speaker,
          state.customerName,
          state.time,
          state.percentage,
          state.count,
          state.endYearDate,
          state.newYearDate,
          state.age,
          state.minutes,
          state.point
        );
      } catch (e) {
        closeModal();
        if (e.errorCode == ERROR_CODE.A3001) {
          auth.resetToken();
          openInvalidTokenModal();
        } else {
          openErrorModal(e);
        }
      }
    };
    const stopAndCloseModal = () => {
      stop();
      closeModal();
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
    const selectErrorMessageTime = (time: string) => {
      if (!time) {
        state.isErrorTime = true;
        return "閉店時間を入力してください";
      } else {
        state.isErrorTime = false;
        return "";
      }
    };
    const selectErrorMessageLangs = (
      langs: string[],
      narrations: NarrationItem[]
    ) => {
      if (narrations.length === MAX_NARRATION_COUNT && langs.length === 1) {
        state.isErrorLangs = false;
        return "";
      }

      if (!langs.length) {
        state.isErrorLangs = true;
        return "言語設定を選択してください";
      }

      if (langs.length + narrations.length > MAX_NARRATION_COUNT) {
        state.isErrorLangs = true;
        return "選択可能なナレーション数を超えています。";
      } else {
        state.isErrorLangs = false;
        return "";
      }
    };

    const isDisabledButtonConfirm = (customerName: string) => {
      if (isVisibleCustomerName) {
        if (!customerName || validator.isEmpty(customerName)) {
          state.isErrorCustomerName = true;
          return true;
        }
      }

      if (isVisibleTime) {
        if (!state.time) return true;
      }

      if (isVisiblePercentage) {
        if (!state.percentage) return true;
      }

      if (isVisibleCount) {
        if (!state.count) return true;
      }

      if (isVisibleEndYearDate) {
        if (!state.endYearDate) return true;
      }

      if (isVisibleNewYearDate) {
        if (!state.newYearDate) return true;
      }

      if (isVisibleAge) {
        if (!state.age) return true;
      }

      if (isVisibleMinutes) {
        if (!state.minutes) return true;
      }

      if (isVisiblePoint) {
        if (!state.point) return true;
      }

      if (!state.isErrorLangs && !state.isErrorCustomerName) {
        return false;
      } else {
        return true;
      }
    };
    const getLangsTitle = (langs: string[]) => {
      return common.getLangs(langs);
    };

    onMounted(() => {
      analytics.screenView(Constants.SCREEN.VOICE_TEMPLATE_DETAIL);
    });

    const changeAudioPlayerSlider = (value: number) => {
      audioPlayer.changePlaybackTime(value);
    };

    const confirmTime = () => {
      state.time = state.tmpTime;
      closeTimeModal();
    };

    const toHome = () => {
      if (isInvalidTokenModalAppear.value) closeInvalidTokenModal();
      router.go(1 - history.length); // gohome.
    };

    return {
      ...toRefs(state),
      ttsSpeakers,
      ttsLangs,
      play,
      stop,
      generateTts,
      createTts,
      stopAndCloseModal,
      template,
      templateDetails,
      ConverterType,
      isVisibleCustomerName,
      isVisibleTime,
      isVisiblePercentage,
      isVisibleCount,
      isVisibleEndYearDate,
      isVisibleNewYearDate,
      isVisibleAge,
      isVisibleMinutes,
      isVisiblePoint,
      getLangsTitle,
      changeAudioPlayerSlider,
      isModalAppear,
      openModal,
      closeModal,
      isTimeModalAppear,
      openTimeModal,
      closeTimeModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      confirmTime,
      Constants,
      toHome,
      isInvalidTokenModalAppear,
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
    margin-top: 26px;
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
          margin-right: 260px;
        }
      }
    }
    &.name {
      ::v-deep {
        .title {
          width: 96px;
          color: $color_green;
        }
        .input-wrapper {
          width: 370px;
          margin-right: 70px;
        }
      }
    }
    &.time {
      ::v-deep {
        .title {
          width: 96px;
          color: $color_yellow;
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
          color: $color_purple;
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
          color: $color_purple;
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
          color: $color_red;
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
          color: $color_red;
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
          color: $color_purple;
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
          color: $color_yellow;
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
          color: $color_purple;
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
  height: 302px;
  caret-color: transparent;
  p {
    font-size: 19px;
    font-weight: $font_weight_bold;
    line-height: 2em;
    color: black;
    ::v-deep .green {
      font-size: 19px;
      font-weight: $font_weight_bold;
      line-height: 2em;
      color: $color_green;
    }
    ::v-deep .yellow {
      font-size: 19px;
      font-weight: $font_weight_bold;
      line-height: 2em;
      color: $color_yellow;
    }
    ::v-deep .purple {
      font-size: 19px;
      font-weight: $font_weight_bold;
      line-height: 2em;
      color: $color_purple;
    }
    ::v-deep .red {
      font-size: 19px;
      font-weight: $font_weight_bold;
      line-height: 2em;
      color: $color_red;
    }
  }
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
    width: 20em;
    left: 0px;
  }
  &.errorCustomerName {
    width: 80%;
  }
  &.errorTime {
    width: 150%;
    left: 0px;
  }
}
</style>
