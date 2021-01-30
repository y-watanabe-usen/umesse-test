<template>
  <div class="contents-base">
    <slot />
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
@import '@/scss/_variables.scss';

.contents-base {
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
  height: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow: $box_shadow;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
