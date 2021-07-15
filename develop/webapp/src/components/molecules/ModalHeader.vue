<template>
  <div class="modal-header">
    <p class="title">{{ title }}</p>
    <button
      v-if="showClose"
      :disabled="closeDisabled"
      class="btn-close"
      @click="$emit('close')"
    >
      <img src="@/assets/icon_close.svg" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    closeDisabled: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.modal-header {
  position: relative;
  height: 80px;
  border-bottom: 1px solid rgb(229, 229, 229);
  display: block;
  padding: 0;
  caret-color: transparent;
  .title {
    color: black;
    font-size: 16px;
    font-weight: $font_weight_bold;
    line-height: 80px;
    text-align: center;
  }
  .btn-close {
    cursor: pointer;
    position: absolute;
    top: 25px;
    right: 25px;
    img {
      width: 30px;
      height: 30px;
    }
    &:disabled {
      opacity: 0.3;
    }
  }
}
</style>
