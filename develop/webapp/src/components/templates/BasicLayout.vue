<template>
  <div class="basic-layout">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="contents">
      <slot name="contents" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "BasicLayout",
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

.basic-layout {
  @include flex_col_start;
  .header {
    width: 100%;
    height: 90px;
  }
  .contents {
    background-color: white;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
    height: calc(100vh - 90px);
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    box-shadow: $box_shadow;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>
