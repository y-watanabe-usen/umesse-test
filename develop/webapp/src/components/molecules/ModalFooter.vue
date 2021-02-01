<template>
  <div class="modal-footer">
    <slot />
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "ModalFooter",
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-footer {
  height: 100px;
  border-top: 1px solid rgb(229, 229, 229);
}
</style>
