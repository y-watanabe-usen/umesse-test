<template>
  <li class="sub-menu-item">
    <div class="base" :class="{ selected: isSelected }">
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "SubMenuItem",
  props: {
    isSelected: {
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

.sub-menu-item {
  height: 82px;
  padding: 5px;
  .base {
    @include flex_start;
    align-items: center;
    height: 82px;
    border-radius: 12px;
    color: rgb(112, 112, 112);
    font-size: 19px;
    font-weight: $font_weight_bold;
    padding-left: 20px;
    padding-right: 20px;
    &.selected {
      color: $color_blue;
      background-color: white;
      box-shadow: $box_shadow_weak;
    }
  }
}
</style>
