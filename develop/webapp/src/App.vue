<template>
  <div :class="isDarkTheme ? 'dark' : ''">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { computed } from "vue";

export default {
  setup() {
    const { base } = useGlobalStore();
    const isDarkTheme = computed(() => base.isDarkTheme);
    return {
      isDarkTheme,
    };
  },
};
</script>
<style>
.bg-umesse {
  background: -moz-linear-gradient(top, #525e72, #7c8389);
  background: -webkit-linear-gradient(top, #525e72, #7c8389);
  background: linear-gradient(to bottom, #525e72, #7c8389);
}
</style>
