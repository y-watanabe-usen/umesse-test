<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
          <template #title>録音する</template>
          <template #buttons v-if="hasRecordedData === true">
            <Button @click="openModal">確定</Button>
          </template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <div class="center">
            <div class="contents">
              <p class="recording" @click="toggleVoiceRecorder">
                <span v-if="isRecording === false">
                  <img src="@/assets/recording_start.svg" />
                </span>
                <span v-else>
                  <img src="@/assets/recording_stop.svg" />
                </span>
              </p>
              <div class="right">
                <div class="indicator-area">
                  <h5 class="volume-unit">db</h5>
                  <div class="volume">
                    <h5>-60</h5>
                    <h5>-50</h5>
                    <h5>-40</h5>
                    <h5>-30</h5>
                    <h5>-20</h5>
                    <h5></h5>
                    <h5>-10</h5>
                    <h5></h5>
                    <h5>0</h5>
                    <h5>3</h5>
                  </div>
                  <div class="scales">
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                    <div class="scale"></div>
                  </div>
                  <meter
                    min="-60"
                    max="3"
                    low="-10"
                    high="-5"
                    class="volume-meter"
                    :value="decibel"
                    optimum="-30"
                  ></meter>
                  <span id="avg-level-text"> {{ decibel }} </span> dB
                  <h5 class="title">録音したデータ１</h5>
                  <div class="time" v-if="hasRecordedData">
                    <p>{{ convertNumberToTime(playbackTime) }}</p>
                    <p>{{ convertNumberToTime(duration) }}</p>
                  </div>
                  <div class="time" v-else>
                    <p>— : — : —</p>
                    <p>— : — : —</p>
                  </div>
                  <meter
                    min="0"
                    :max="duration"
                    class="progress-meter"
                    :value="playbackTime"
                  ></meter>
                  <div class="buttons">
                    <button
                      class="btn-play"
                      :class="{ 'btn-stop': isPlaying }"
                      :disabled="!hasRecordedData"
                      :isPlaying="isPlaying"
                      @click="toggleVoicePlayer"
                    >
                      <span v-if="isPlaying === false">
                        <img src="@/assets/icon_play.svg" />再生
                      </span>
                      <span v-else>
                        <img
                          src="@/assets/icon_stop.svg"
                          class="icon-stop"
                        />停止
                      </span>
                    </button>
                    <button
                      class="btn-delete"
                      :disabled="!hasRecordedData || isPlaying"
                      @click="deleteRecordedData"
                    >
                      <img src="@/assets/icon_delete.svg" />削除
                    </button>
                  </div>
                  <p class="description">
                    録音し直したい場合は、録音開始ボタンを押して再収録してください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalDialog v-if="isModalAppear" size="large" @close="closeModal">
        <template #header>
          <ModalHeader title="保存しますか？" @close="closeModal" />
        </template>
        <template #contents>
          <form>
            <FormGroup title="タイトル" :required="true">
              <TextBox v-model="file.title" />
            </FormGroup>
            <FormGroup title="説明">
              <TextArea v-model="file.description" />
            </FormGroup>
          </form>
        </template>
        <template #footer>
          <ModalFooter>
            <div class="button-wrapper">
              <Button type="secondary" @click="closeModal">キャンセル</Button>
              <Button
                type="primary"
                :isDisabled="file.title === undefined || file.title === ''"
                @click="uploadRecordingFile"
              >
                保存して作成を続ける
              </Button>
            </div>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" title="音源の合成中" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, onUnmounted } from "vue";
import AudioRecorder from "@/utils/AudioRecorder";
import AudioPlayer from "@/utils/AudioPlayer";
import { RecordingFile } from "@/services/recordingService";
import provideRecordingStore from "@/store/recording";
import { convertNumberToTime } from "@/utils/FormatDate";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import { useGlobalStore } from "@/store";
import router from "@/router";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { UMesseError } from "../../models/UMesseError";
import { UPLOAD_RECORDING_STATE } from "@/store/recording";
import analytics from "@/utils/firebaseAnalytics";

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
    FormGroup,
    TextBox,
    TextArea,
    ModalLoading,
  },
  name: "RecordingStart",
  setup() {
    const recordingStore = provideRecordingStore(); //FIXME: provide name.
    const audioRecorder = AudioRecorder();
    const audioPlayer = AudioPlayer();
    const { cm } = useGlobalStore();
    const state = reactive({
      file: <RecordingFile>{},
      isRecording: computed(() => audioRecorder.isRecording()),
      hasRecordedData: computed(() => audioRecorder.hasRecording()),
      decibel: computed(() => {
        if( audioRecorder.isRecording()){
          if (audioRecorder.getPowerDecibels() === -Infinity) return -60;
          return audioRecorder.getPowerDecibels();
        }else if ( audioPlayer.isPlaying()){
          if (audioPlayer.getPowerDecibels() === -Infinity) return -60;
          return audioPlayer.getPowerDecibels();
        }
        return -60;
      }),
      isPlaying: computed(() => audioPlayer.isPlaying()),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      duration: computed(() => audioPlayer.getDuration()),
      isModalAppear: false,
      isLoading: false,
      isErrorModalApper: false,
      errorCode: "",
      errorMessage: "",
    });

    onUnmounted(()=>{
      if (audioRecorder.isRecording()) {
        audioRecorder.stop();
      }
      if ( audioPlayer.isPlaying()) {
        audioPlayer.stop();
      }
    });

    // toggle voice recorder.
    const toggleVoiceRecorder = async () => {
      if( audioPlayer.isPlaying())
        audioPlayer.stop();
      if (audioRecorder.isRecording()) {
        audioRecorder.stop();
      } else {
        audioRecorder.start();
      }
    };

    // toggle voice player.
    const toggleVoicePlayer = async () => {
      if (state.isPlaying) {
        audioPlayer.stop();
      } else {
        const audioBuffer = await audioRecorder.getAudioBuffer();
        if (audioBuffer) audioPlayer.start(audioBuffer);
      }
    };

    const deleteRecordedData = () => audioRecorder.reset();
    const uploadRecordingFile = async () => {
      /// check state.file.
      // state.file.blob = await audioRecorder.getWaveBlob();
      try {
        openModalLoading();
        state.file.blob = await audioRecorder.getMp3Blob();
        const response = await recordingStore.uploadRecordingData(state.file);
        cm.setNarration(response);
        analytics.setRecording(response.id);
        router.push({ name: "Cm" });
        closeModalLoading();
        closeModal();
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };
    const openModal = () => {
      stop();
      state.isModalAppear = true;
    };
    const closeModal = () => {
      state.isModalAppear = false;
    };
    const openModalLoading = () => {
      state.isLoading = true;
    };
    const closeModalLoading = () => {
      state.isLoading = false;
    };
    const closeErrorModal = () => {
      state.isErrorModalApper = false;
    };
    const openErrorModal = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isErrorModalApper = true;
    };
    return {
      ...toRefs(state),
      toggleVoiceRecorder,
      toggleVoicePlayer,
      deleteRecordedData,
      uploadRecordingFile,
      UPLOAD_RECORDING_STATE,
      openModal,
      closeModal,
      closeErrorModal,
      convertNumberToTime,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
.center {
  @include flex_center;
  height: 100%;
  caret-color: transparent;
  .contents {
    @include flex_center;
    width: 1120px;
  }
  .recording {
    cursor: pointer;
    width: 390px;
    height: 390px;
    box-shadow: $box_shadow;
    border-radius: 195px;
    margin-right: 100px;
    flex-grow: 0;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    .indicator-area {
      width: 630px;
      h5 {
        font-size: 16px;
        font-weight: 500;
      }
      .volume-unit {
        text-align: right;
      }
      .volume {
        @include flex_start;
        h5 {
          width: 100px;
          font-size: 17px;
          margin-bottom: 10px;
          flex-grow: 0;
          flex-shrink: 0;
          position: relative;
          left: -5px;
          &:nth-child(n + 5) {
            width: 50px;
          }
          &:nth-child(n + 9) {
            width: 30px;
          }
        }
      }
      .scales {
        @include flex_start;
        width: 630px;
        .scale {
          position: relative;
          left: -1px;
          width: 2px;
          height: 8px;
          background-color: black;
          margin-right: 98px;
          flex-grow: 0;
          flex-shrink: 0;
          &:nth-child(n + 5) {
            margin-right: 48px;
          }
          &:nth-child(n + 9) {
            margin-right: 28px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      meter {
        width: 630px;
        margin-top: 8px;
        margin-bottom: 8px;
        &::-webkit-meter-bar {
          background-color: rgba(0, 0, 0, 0.15);
          border: none;
          border-radius: 0;
        }
        &.volume-meter {
          height: 18px;
          &::-webkit-meter-bar {
            height: 18px;
          }
          &::-webkit-meter-optimum-value {
            background-color: rgb(78, 203, 136);
          }
          &::-webkit-meter-suboptimum-value {
            background-color: rgb(204, 209, 79);
          }
          &::-webkit-meter-even-less-good-value {
            background-color: rgb(209, 79, 79);
          }
        }
        &.progress-meter {
          height: 6px;
          &::-webkit-meter-bar {
            height: 6px;
            border-radius: 3px;
          }
          &::-webkit-meter-optimum-value {
            background-color: rgb(0, 206, 255);
          }
        }
      }
      #avg-level-text {
        font-size: 16px;
      }
      .title {
        font-size: 20px;
        font-weight: $font_weight_bold;
        margin-top: 54px;
        margin-bottom: 20px;
      }
      .time {
        @include flex_between;
        p {
          font-size: 16px;
        }
      }
      .buttons {
        @include flex_center;
        margin-top: 32px;
        margin-bottom: 24px;
        button {
          @include flex_center;
          display: block;
          width: 194px;
          height: 54px;
          border-radius: 4px;
          box-shadow: $box_shadow_weak;
          margin-left: 9px;
          margin-right: 9px;
          font-size: 16px;
          font-weight: $font_weight_bold;
          &.btn-play {
            border: 3px solid rgb(87, 142, 217);
          }
          &.btn-delete {
            border: 3px solid rgb(152, 46, 46);
          }
          &.btn-stop {
            border: 3px solid rgb(0, 0, 0);
            .icon-stop {
              width: 33px;
              height: 22px;
            }
          }
          &:disabled {
            opacity: 0.3;
          }
          img {
            margin-right: 16px;
          }
        }
      }
      .description {
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
.button-wrapper {
  @include flex_center;
}
.failed {
  color: #ed6267;
  font-weight: 400;
  font-size: 17px;
  text-align: center;
}
</style>
