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
.navbar {
  padding: .5rem 0;
}
.bg-umesse-home {
  background: -moz-linear-gradient(top, #177dd1, #489fdf);
  background: -webkit-linear-gradient(top, #177dd1, #489fdf);
  background: linear-gradient(to bottom, #177dd1, #489fdf);
}
.bg-umesse {
  background: #ebebeb;
}
</style>
