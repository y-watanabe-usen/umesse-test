<template>
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
                <img src="@/assets/recording_start.svg">
              </span>
              <span v-else>
                <img src="@/assets/recording_stop.svg">
              </span>
            </p>
            <div class="right">
              <div class="indicator-area">
                <h5 class="volume-unit">db</h5>
                <div class="volume">
                  <h5>-60</h5>
                  <h5>-50</h5>
                  <h5>-40</h5>
                  <h5>-35</h5>
                  <h5>-30</h5>
                  <h5>-25</h5>
                  <h5>-20</h5>
                  <h5>-15</h5>
                  <h5>-10</h5>
                  <h5>-5</h5>
                  <h5>0</h5>
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
                  <div class="scale"></div>
                </div>
                <meter
                  min="-100"
                  max="0"
                  low="-10"
                  high="-5"
                  class="volume-meter"
                  :value="decibel"
                  optimum="-30"
                ></meter>
                <span id="avg-level-text"> {{ decibel }} </span> dB
                <h5 class="title">録音したデータ１</h5>
                <div class="time" v-if="hasRecordedData">
                  <p>{{ playbackTimeHms }}</p>
                  <p>{{ durationHms }}</p>
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
                  <button class="btn-play" :disabled="!hasRecordedData" @click="play">
                    <img src="@/assets/icon_play.svg">再生
                  </button>
                  <button class="btn-delete" :disabled="!hasRecordedData" @click="deleteRecordedData">
                    <img src="@/assets/icon_delete.svg">削除
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
    <ModalDialog
      v-if="isModalAppear"
      size="large"
      :closeDisabled="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADING"
      @close="closeModal"
    >
      <template #header>
        <ModalHeader
          title="保存しますか？"
          :closeDisabled="
            uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADING
          "
          @close="closeModal"
        />
      </template>
      <template #contents>
        <form>
          <FormGroup title="タイトル" :required="true">
            <TextBox
              v-model:value="file.title"
              :isDisabled="
                uploadRecoridngState !== UPLOAD_RECORDING_STATE.NONE &&
                uploadRecoridngState !== UPLOAD_RECORDING_STATE.ERROR
              "
            />
          </FormGroup>
          <FormGroup title="説明">
            <TextArea
              v-model:value="file.description"
              :isDisabled="
                uploadRecoridngState !== UPLOAD_RECORDING_STATE.NONE &&
                uploadRecoridngState !== UPLOAD_RECORDING_STATE.ERROR
              "
            />
          </FormGroup>
        </form>
        <!-- 保存中 -->
        <span v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADING">
          <div class="col-form-label">クルクルインジケーターとか</div>
        </span>
        <!-- 保存完了 -->
        <span v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADED">
          <div class="col-form-label">保存が完了しました。</div>
        </span>
        <!-- 保存失敗 -->
        <span v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.ERROR">
          <div class="failed">保存に失敗しました。再度お試しください。</div>
        </span>
      </template>
      <template #footer>
        <ModalFooter>
          <div
            class="button-wrapper"
            v-if="
              uploadRecoridngState === UPLOAD_RECORDING_STATE.ERROR ||
              uploadRecoridngState === UPLOAD_RECORDING_STATE.NONE
            "
          >
            <Button type="secondary" @click="closeModal">キャンセル</Button>
            <Button
              type="primary"
              :isDisabled="file.title === undefined || file.title === ''"
              @click="uploadRecordingFile"
            >
              保存して作成を続ける
            </Button>
          </div>
          <div
            class="button-wrapper"
            v-if="uploadRecoridngState === UPLOAD_RECORDING_STATE.UPLOADED"
          >
            <Button type="primary" @click="closeModal">OK</Button>
          </div>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, provide } from "vue";
import AudioRecorder from "@/utils/AudioRecorder";
import AudioPlayer from "@/utils/AudioPlayer";
import {
  RecordingFile,
  useUploadRecordingService,
  UPLOAD_RECORDING_STATE,
} from "@/services/uploadRecordingService";
import * as UMesseApi from "umesseapi";
import provideRecordingStore from "@/store/recording";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/molecules/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import FormGroup from "@/components/molecules/FormGroup.vue";
import TextBox from "@/components/atoms/TextBox.vue";
import TextArea from "@/components/atoms/TextArea.vue";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    FormGroup,
    TextBox,
    TextArea,
  },
  name: "RecordingStart",
  setup() {
    const recordingStore = provideRecordingStore(); //FIXME: provide name.
    const audioRecorder = AudioRecorder();
    const audioPlayer = AudioPlayer();
    const state = reactive({
      file: <RecordingFile>{},
      uploadRecoridngState: computed(() => recordingStore.getStatus()),
      isRecording: computed(() => audioRecorder.isRecording()),
      hasRecordedData: computed(() => audioRecorder.hasRecording()),
      decibel: computed(() => {
        if (audioPlayer.getPowerDecibels() === -Infinity) return -100;
        return audioPlayer.getPowerDecibels();
      }),
      playbackTime: computed(() => audioPlayer.getPlaybackTime()),
      playbackTimeHms: computed(() =>
        Common.sToHms(Math.floor(audioPlayer.getPlaybackTime()))
      ),
      duration: computed(() => audioPlayer.getDuration()),
      durationHms: computed(() =>
        Common.sToHms(Math.floor(audioPlayer.getDuration()))
      ),
      isModalAppear: false,
    });

    // toggle voice recorder.
    const toggleVoiceRecorder = async () => {
      if (audioRecorder.isRecording()) {
        audioRecorder.stop();
      } else {
        audioRecorder.start();
      }
    };

    // playback a recorded data.
    const play = async () => {
      const audioBuffer = await audioRecorder.getAudioBuffer();
      audioPlayer.start(audioBuffer!!);
    };
    const deleteRecordedData = () => audioRecorder.reset();

    const uploadRecordingFile = async () => {
      /// check state.file.
      // state.file.blob = await audioRecorder.getWaveBlob();
      state.file.blob = await audioRecorder.getMp3Blob();
      recordingStore.uploadRecordingData(state.file);
      closeModal();
    };

    const openModal = () => {
      state.isModalAppear = true;
    };
    const closeModal = () => {
      state.isModalAppear = false;
    };

    return {
      ...toRefs(state),
      toggleVoiceRecorder,
      play,
      deleteRecordedData,
      uploadRecordingFile,
      UPLOAD_RECORDING_STATE,
      openModal,
      closeModal,
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
  .contents {
    @include flex_center;
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
      width: 600px;
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
          width: 50px;
          font-size: 17px;
          margin-bottom: 10px;
          flex-grow: 0;
          flex-shrink: 0;
          position: relative;
          left: -3px;
          &:nth-child(n + 7) {
            width: 74px;
          }
        }
      }
      .scales {
        @include flex_start;
        width: 600px;
        .scale {
          width: 2px;
          height: 8px;
          background-color: black;
          margin-right: 48px;
          flex-grow: 0;
          flex-shrink: 0;
          &:nth-child(n + 7) {
            margin-right: 72px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      meter {
        width: 600px;
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
.failed {
  color: #ed6267;
  font-weight: 400;
  font-size: 17px;
  text-align: center;
}
</style>
