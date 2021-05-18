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
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "BasicLayout",
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

.basic-layout {
  @include flex_col_start;
  .header {
    width: 100%;
    height: 90px;
  }
  .contents {
    width: 100%;
    height: calc(100vh - 90px);
  }
}
</style>
