<template>
  <div class="modal-create-uploading">
    <div class="base">
      <p class="title">CMの長さによっては、処理に数分かかる場合があります。</p>
      <div class="row">
        <progress class="progress" :value="progress" max="100"></progress>
        <p class="title">{{ `${progress}` + "％" }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  components: {},
  name: "ModalCreateLoding",
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.modal-create-uploading {
  @include flex_center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  max-width: initial;
  pointer-events: auto;
  margin: 0;
  z-index: 1;
  .base {
    background-color: white;
    border-radius: 10px;
    box-shadow: $box_shadow_strong;
    width: 1040px;
    position: relative;
    height: 150px;
    border-bottom: 1px solid rgb(229, 229, 229);
    text-align: center;
    display: block;
    .title {
      color: black;
      font-size: 16px;
      font-weight: $font_weight_bold;
      line-height: 80px;
      margin-left: 20px;
    }
    .row {
      @include flex_center;
      height: 35px;
    }
    progress {
      -webkit-appearance: none;
      width: 330px;
      height: 7px;
      border-radius: 15px;
      background-color: rgba(211, 211, 211, 0.85);
    }
    ::-webkit-progress-bar {
      height: 7px;
      border-radius: 15px;
      background-color: rgba(211, 211, 211, 0.85);
    }
    ::-webkit-progress-value {
      height: 7px;
      background-color: #578ed9;
      border-radius: 15px;
    }
  }
}
</style>
