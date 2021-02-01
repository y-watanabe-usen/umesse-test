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
@import '@/scss/_variables.scss';

.modal-footer {
  @include flex_center;
  padding: 0;
  height: 100px;
  border-top: 1px solid rgb(229, 229, 229);
  ::v-deep button {
    width: 242px;
    margin-left: 14px;
    margin-right: 14px;
  }
}
</style>
