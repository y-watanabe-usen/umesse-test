<template>
  <div class="contents-base">
    <slot name="sub-menu" />
    <div class="contents">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "ContentsBase",
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

.contents-base {
  @include flex_start;
  background-color: rgba(255, 255, 255, 0.75);
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
  height: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow: $box_shadow;
  overflow: hidden;
  ::v-deep .sub-menu {
    width: 214px;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .contents {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
