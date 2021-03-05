<template>
  <div class="modal-footer" :class="{ 'no-border': noBorder }">
    <slot />
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "ModalFooter",
  props: {
    noBorder: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.modal-footer {
  @include flex_center;
  padding: 0;
  height: 100px;
  border-top: 1px solid rgb(229, 229, 229);
  &.no-border {
    border-top: none;
  }
  ::v-deep button {
    width: 242px;
    margin-left: 14px;
    margin-right: 14px;
    &.rectangle {
      width: 88px;
    }
  }
}
</style>
