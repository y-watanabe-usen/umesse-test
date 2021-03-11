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
          <div class="spinner">
            <loading
              color="#fff"
              :active="true"
              :can-cancel="false"
              :is-full-page="true"
              :height="23"
              :widht="23"
              :background-color="transparent"
              :opacity="0"
            ></loading>
          </div>
          再生
        </Button>
      </template>
      <template v-else>
        <Button v-show="!isPlaying" class="btn-play" type="secondary" @click="$emit('play')">
          <img src="@/assets/icon_sound.svg" />再生
        </Button>
        <Button v-show="isPlaying" class="btn-stop" type="secondary" @click="$emit('stop')">
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
        <meter min="0" :max="duration" :value="playbackTime"></meter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { convertNumberToTime } from "@/utils/FormatDate";
import Button from "@/components/atoms/Button.vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

export default {
  name: "PlayDialogContents",
  components: {
    Button,
    Loading,
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
@import "@/scss/_variables.scss";

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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
    img,
    .spinner {
      margin-right: 10px;
    }
  }
  .btn-play {
    img,
    .spinner {
      width: 34px;
      height: 26px;
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
  .meter-wrapper {
    width: 430px;
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
