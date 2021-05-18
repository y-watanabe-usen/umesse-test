<template>
  <ul class="sub-menu">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "SubMenu",
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.sub-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
