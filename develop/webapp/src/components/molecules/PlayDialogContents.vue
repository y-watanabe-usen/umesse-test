<template>
  <div class="play-dialog-contents">
    <div class="row">
      <div class="col-4">
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
            <button
              type="button"
              class="btn btn-light shadow btn-play"
              @click="$emit('play')"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-play-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
              再生
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="btn btn-light shadow btn-play"
              @click="$emit('stop')"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-stop-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
                />
              </svg>
              停止
            </button>
          </template>
        </template>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col text-left" style="font-size: 17px">
            {{ convertNumberToTime(playbackTime) }}
          </div>
          <div class="col text-right" style="font-size: 17px">
            {{ convertNumberToTime(duration) }}
          </div>
        </div>
        <meter
          min="0"
          :max="duration"
          class="w-100"
          :value="playbackTime"
        ></meter>
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-4">
        タブレット音量<br />
        <small>タブレットのスピーカーから音が出ます。</small>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col text-left">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-volume-down-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8.717 3.55A.5.5 0 0 1 9 4v8a.5.5 0 0 1-.812.39L5.825 10.5H3.5A.5.5 0 0 1 3 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
              />
              <path
                d="M10.707 11.182A4.486 4.486 0 0 0 12.025 8a4.486 4.486 0 0 0-1.318-3.182L10 5.525A3.489 3.489 0 0 1 11.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"
              />
            </svg>
          </div>
          <div class="col text-center">volume 32</div>
          <div class="col text-right">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-volume-up-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
              />
              <path
                d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
              />
              <path
                d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"
              />
              <path
                fill-rule="evenodd"
                d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
              />
            </svg>
          </div>
        </div>
        <meter min="0" max="15" class="w-100" value="1"></meter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { convertNumberToTime } from "@/utils/FormatDate";

export default {
  name: "PlayDialogContents",
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
</style>
