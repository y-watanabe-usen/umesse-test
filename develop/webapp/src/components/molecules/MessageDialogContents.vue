<template>
  <div class="message-dialog-contents">
    <p><slot /></p>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "MessageDialogContents",
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

.message-dialog-contents {
  caret-color: transparent;
  p {
    font-size: 19px;
    font-weight: $font_weight_bold;
    text-align: center;
    line-height: 1.7em;
    white-space: pre-wrap;
  }
}
</style>
