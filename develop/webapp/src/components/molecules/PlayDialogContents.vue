<template>
  <div class="play-dialog-contents">
    <div class="row">
      <template v-if="isLoading">
        <button class="btn btn-play btn-light" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Loading...</span>
        </button>
      </template>
      <template v-else>
        <template v-if="!isPlaying">
          <Button class="btn-play" type="primary" @click="$emit('play')">
            <img src="@/assets/icon_play_white.svg" />再生
          </Button>
        </template>
        <template v-else>
          <Button class="btn-stop" type="primary" @click="$emit('stop')">
            <img src="@/assets/icon_stop_white.svg" />停止
          </Button>
        </template>
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
        <meter
          min="0"
          :max="duration"
          :value="playbackTime"
        ></meter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { convertNumberToTime } from "@/utils/FormatDate";
import Button from "@/components/atoms/Button.vue";

export default {
  name: "PlayDialogContents",
  components: {
    Button,
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
  },
  setup() {
    const state = reactive({});
    return {
      state,
      convertNumberToTime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.play-dialog-contents {
  @include flex_center;
  .row {
    @include flex_between;
    margin-left: 0;
    margin-right: 0;
  }
  .btn-play,
  .btn-stop {
    width: 88px;
    img {
      margin-right: 10px;
    }
  }
  .btn-play {
    img {
      width: 30px;
      height: 23px;
    }
  }
  .btn-stop {
    img {
      width: 30px;
      height: 23px;
    }
  }
  .meter-wrapper {
    width: 350px;
    margin-left: 50px;
    meter {
      width: 100%;
      margin-top: 8px;
      margin-bottom: 8px;
      &::-webkit-meter-bar {
        background-color: rgba(0, 0, 0, 0.15);
        border: none;
        border-radius: 3px;
        height: 6px;
      }
      &::-webkit-meter-optimum-value {
        background-color: $color_blue;
      }
    }
    .time {
      font-size: 16px;
      color: rgb(88, 88, 88);
    }
  }
}
</style>
