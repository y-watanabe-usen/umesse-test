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
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >保存</router-link
        >
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
              <button @click="play">再生</button>
              <button @click="deleteRecordedData">削除</button>
              <meter min="-100" max="10" :value="decibel"></meter>
              <span id="avg-level-text"> {{ decibel }} </span> dB
            </div>
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
    });

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