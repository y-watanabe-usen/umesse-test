<template>
  <button :disabled="isDisabled" @click="$emit('click')" :class="[type]"><slot /></button>
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
@import '@/scss/_variables.scss';

button {
  display: inline-block;
  height: 50px;
  color: $color_blue;
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
    font-size: 20px;
    color: white;
    background-color: $color_blue;
  }
  &.secondary {
    font-size: 20px;
    color: black;
    background-color: white;
  }
  &.rectangle {
    border-radius: 4px;
    font-size: 20px;
    color: black;
    background-color: white;
  }
  &:disabled {
    color: white;
    background-color: rgb(173, 173, 173);
  }
}
</style>
