<template>
  <div class="list">
    <slot name="header" />
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "List",
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

.list {
  @include flex_col_start;
  height: 100%;
  width: 100%;
  ::v-deep .list-header {
    width: calc(100% - 68px);
    height: 75px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  caret-color: transparent;
  ul {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
