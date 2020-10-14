<template>
  <div class="bg-umesse mb-3">
    <p class="text-white">custCd: {{ user != null ? user.custCd : ''}}</p>
    <p class="text-white">token: {{ user != null ? user.token: '' }}</p>
  </div>
</template>

<script>
// TODO: 実際には使わないので後で消す
import { computed, inject, reactive } from "vue";
import UserKey from "@/components/user-key";

export default {
  setup() {
    const userStore = inject(UserKey);
    if (!userStore) {
      throw new Error(`${userStore} is not provided`);
    }
    const user = computed(() => userStore.user);
    return {
      user,
    };
  },
};
</script>
