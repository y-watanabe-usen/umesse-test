<template>
  <div class="play-dialog-contents">
    <div class="row">
      <template v-if="isLoading">
        <Button
          class="btn-play"
          :isDisabled="true"
          type="primary"
          @click="$emit('play')"
        >
          <img src="@/assets/icon_audio_loading.svg" /> 再生
        </Button>
      </template>
      <template v-else>
        <Button
          v-show="isDownload"
          class="btn-download"
          type="secondary"
          @click="$emit('download')"
        >
          ダウンロード
        </Button>
        <Button
          v-show="!isPlaying"
          class="btn-play"
          type="secondary"
          @click="$emit('play')"
        >
          <img src="@/assets/icon_sound.svg" />再生
        </Button>
        <Button
          v-show="isPlaying"
          class="btn-stop"
          type="secondary"
          @click="$emit('stop')"
        >
          <img src="@/assets/icon_stop.svg" />停止
        </Button>
      </template>
      <div class="meter-wrapper">
        <div class="row">
          <div class="time">
            {{ convertNumberToTime(playbackTime) }}
          </div>
          <div class="time">
            {{ convertNumberToTime(duration) }}
          </div>
        </div>
        <AudioPlayerSlider
          v-model="state.playbackTime"
          :duration="duration"
          @change="onChange"
          :disabled="!isPlaying"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { convertNumberToTime } from "@/utils/formatDate";
import Button from "@/components/atoms/Button.vue";
import AudioPlayerSlider from "@/components/molecules/AudioPlayerSlider.vue";

export default defineComponent({
  name: "PlayDialogContents",
  components: {
    Button,
    AudioPlayerSlider,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
    playbackTime: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDownload: {
      type: Boolean,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      playbackTime: computed(() => props.playbackTime),
    });
    return {
      state,
      convertNumberToTime,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.play-dialog-contents {
  @include flex_center;
  caret-color: transparent;
  .row {
    @include flex_between;
    margin-left: 0;
    margin-right: 0;
  }
  .btn-play,
  .btn-stop {
    width: 88px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
    img,
    .spinner {
      margin-right: 10px;
      margin-bottom: 3px;
    }
  }
  .btn-play {
    img,
    .spinner {
      width: 34px;
      height: 26px;
      margin-top: 2px;
    }
    .vld-overlay {
      width: 100%;
      height: 100%;
      position: static;
    }
  }
  .btn-stop {
    img {
      width: 34px;
      height: 26px;
    }
  }
  .btn-download {
    width: 114px;
    margin-right: 8px;
  }
  .meter-wrapper {
    width: 430px;
    margin-left: 50px;
    .time {
      font-size: 16px;
      color: rgb(88, 88, 88);
    }
  }
}
</style>
