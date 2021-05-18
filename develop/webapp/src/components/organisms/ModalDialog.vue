<template>
  <div class="modal-dialog" @click="onClick">
    <div class="base" :class="[size, isFocus ? 'base-margin-top' : '']">
      <slot name="header" />
      <div class="contents">
        <slot name="contents" />
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from "vue";

export default defineComponent({
  name: "ModalDialog",
  props: {
    size: {
      type: String,
      default: "medium",
    },
    closeDisabled: {
      type: Boolean,
      default: false,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context: SetupContext) {
    const state = reactive({});
    const onClick = (event: Event) => {
      if (
        event.target === document.querySelector(".modal-dialog") &&
        !props.closeDisabled
      ) {
        context.emit("close");
      }
    };
    return {
      state,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.modal-dialog {
  @include flex_center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  max-width: initial;
  pointer-events: auto;
  margin: 0;
  z-index: 1;
  .base {
    background-color: white;
    border-radius: 10px;
    box-shadow: $box_shadow_strong;
    &.small {
      width: 600px;
    }
    &.medium {
      width: 900px;
    }
    &.large {
      width: 1040px;
    }
    .contents {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
  .base-margin-top {
    margin-top: 120px;
  }
}
</style>
