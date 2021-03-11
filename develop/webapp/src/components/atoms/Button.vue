<template>
  <button :disabled="isDisabled" :class="[type]"><slot /></button>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "normal",
    },
    isDisabled: {
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
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

button {
  @include flex_center;
  height: 50px;
  color: black;
  font-size: 16px;
  font-weight: $font_weight_bold;
  line-height: 50px;
  padding-left: 36px;
  padding-right: 36px;
  border-radius: 25px;
  background-color: white;
  box-shadow: $box_shadow_weak;
  cursor: pointer;
  &.primary {
    font-size: 19px;
    color: white;
    background-color: $color_blue;
  }
  &.secondary {
    font-size: 19px;
    color: black;
    background-color: white;
  }
  &.rectangle {
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
    font-size: 19px;
    color: black;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
  }
  &:disabled {
    color: white;
    background-color: rgb(173, 173, 173);
  }
}
</style>
