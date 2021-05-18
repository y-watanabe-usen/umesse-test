<template>
  <div class="modal-uploading">
    <div :class="[title ? 'base' : '']">
      <p class="title">{{ title }}</p>
      <transition>
        <div class="vld-parent">
          <loading
            :active="true"
            :can-cancel="false"
            :is-full-page="true"
            :height="100"
            :widht="100"
            :opacity="0"
          ></loading>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

export default defineComponent({
  components: {
    Loading,
  },
  name: "ModalLoding",
  props: {
    title: {
      type: String,
      required: false,
    },
    closeDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.modal-uploading {
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
    height: 80px;
    border-bottom: 1px solid rgb(229, 229, 229);
    display: block;
    .title {
      color: black;
      font-size: 16px;
      font-weight: $font_weight_bold;
      line-height: 80px;
      text-align: left;
      padding-left: 50px;
    }
    .btn-close {
      cursor: pointer;
      position: absolute;
      top: 25px;
      right: 25px;
      img {
        width: 30px;
        height: 30px;
      }
      &:disabled {
        opacity: 0.3;
      }
    }
    .contents {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
}
</style>
