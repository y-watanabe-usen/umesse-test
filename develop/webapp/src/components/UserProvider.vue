<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide } from "vue";
import userStore from "@/store/user";
import UserKey from "@/components/user-key";

export default {
  setup() {
    provide(UserKey, userStore());
    return {};
  },
};
</script>