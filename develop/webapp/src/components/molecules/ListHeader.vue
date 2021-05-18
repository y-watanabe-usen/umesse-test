<template>
  <div class="list-header">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "ListHeader",
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-header {
  padding-left: 34px;
  padding-right: 34px;
  border-bottom: 1px solid rgb(240, 240, 240);
}
</style>
