<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center text-white h4"
        >
          録音する
        </div>
        <button
          type="button"
          class="btn btn-link navbar-brand text-white"
          data-toggle="modal"
          data-target="#saveModal"
        >
          確定
        </button>
      </nav>
      <div class="row">
        <div class="m-5">
          <p class="recording" @click="toggleVoiceRecorder">
            <span v-if="isRecording === false">
              <img class="card-img-top" src="../assets/_rec@2x.png" />
            </span>
            <span v-else>
              <img class="card-img-top" src="../assets/_stop@2x.png" />
            </span>
          </p>
        </div>
        <div class="d-flex align-items-center">
          <div class="border-top border-bottom lead" style="padding: 20px">
            Recording Timestamp：00:00:00:00.00
            <div v-if="hasRecordedData">
              <div>
                <button class="btn btn-light mr-2 w-25" @click="play">
                  再生
                </button>
                <button class="btn btn-light w-25" @click="deleteRecordedData">
                  削除
                </button>
              </div>
              <meter
                min="-100"
                max="10"
                class="w-100"
                :value="decibel"
              ></meter>
              <span id="avg-level-text"> {{ decibel }} </span> dB
              <div class="row">
                <div class="col text-left">{{ playbackTimeHms }}</div>
                <div class="col text-right">{{ durationHms }}</div>
              </div>
              <meter
                min="0"
                :max="duration"
                class="w-100"
                :value="playbackTime"
              ></meter>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div
      class="modal fade"
      id="saveModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="saveModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="saveModalLabel">保存しますか？</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">タイトル(必須)</label>
                <input type="text" class="form-control" id="title" />
              </div>
              <div class="form-group">
                <label for="description" class="col-form-label">説明</label>
                <textarea class="form-control" id="description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              キャンセル
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#savedModal"
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="savedModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="savedModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="savedModalLabel">保存完了</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">保存が完了しました。</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import AudioRecorder from "@/mixin/AudioRecorder";
import AudioPlayer from "@/mixin/AudioPlayer";

export default defineComponent({
  setup() {
    const audioRecorder = AudioRecorder();
    const audioPlayer = AudioPlayer();
    const state = reactive({
      isRecording: computed(() => (audioRecorder.isRecording() ? true : false)),
      hasRecordedData: computed(() => {
        if (audioRecorder.getBlob() !== undefined) return true;
        return false;
      }),
      decibel: computed(() => {
        return audioPlayer.getPowerDecibels();
      }),
      playbackTime: computed(() => {
        return audioPlayer.getPlaybackTime();
      }),
      playbackTimeHms: computed(() => {
        return sToHms(Math.floor(audioPlayer.getPlaybackTime()));
      }),
      duration: computed(() => {
        return audioPlayer.getDuration();
      }),
      durationHms: computed(() => {
        return sToHms(Math.floor(audioPlayer.getDuration()));
      }),
    });

    // 秒を時分秒に変換
    const sToHms = (second: number) => {
      const h = "" + ((second / 36000) | 0) + ((second / 3600) % 10 | 0);
      const m =
        "" + (((second % 3600) / 600) | 0) + (((second % 3600) / 60) % 10 | 0);
      const s = "" + (((second % 60) / 10) | 0) + ((second % 60) % 10);
      return h + ":" + m + ":" + s;
    };

    // toggle voice recorder.
    const toggleVoiceRecorder = async () => {
      if (audioRecorder.isRecording()) {
        audioRecorder.stop();
        const audioBuffer = await audioRecorder.getAudioBuffer();
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

    return {
      ...toRefs(state),
      toggleVoiceRecorder,
      play,
      deleteRecordedData,
    };
  },
});
</script>
<style scoped>
.recording {
  cursor: pointer;
  margin-left: 95px;
  width: 429px;
  height: 429px;
}
</style>