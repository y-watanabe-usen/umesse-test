<template>
  <div class="modal-create-uploading">
    <div class="base">
      <p class="title">CMの長さによっては、処理に数分かかる場合があります。</p>
      <div class="row">
        <vue-slider
          class="slider"
          :width="430"
          :modelValue="progress"
          :dotSize="0"
          :min="0"
          :max="100"
          :interval="1"
          :duration="1"
          tooltip="none"
          :clickable="false"
          :dragOnClick="false"
          :railStyle="{ backgroundColor: 'rgb(186, 186, 186)' }"
          :processStyle="{ backgroundColor: 'rgb(87, 142, 217)' }"
        />
        <p class="percent">{{ progress }}％</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    VueSlider,
  },
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
.slider {
  width: 330px;
}
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
    .percent {
      color: #5c5c5c;
      font-size: 16px;
      line-height: 80px;
      margin-left: 20px;
    }
    .row {
      @include flex_center;
      height: 35px;
    }
  }
}
</style>
