<template>
  <div class="cm-layout">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="center">
      <div class="top">
        <slot name="top" />
      </div>
      <div class="bottom">
        <slot name="bottom" />
      </div>
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "CmLayout",
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

.cm-layout {
  @include flex_between;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 40px;
  .left, .right {
    @include flex_center;
    width: 208px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .center {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    .top, .bottom {
      @include flex_between;
      height: 310px;
    }
  }
}
</style>
