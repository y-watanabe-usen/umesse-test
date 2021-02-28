<template>
  <div class="text-dialog-contents">
    <p><slot /></p>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "TextDialogContents",
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

.text-dialog-contents {
  p {
    color: rgb(92, 92, 92);
    font-size: 19px;
    margin-left: 42px;
    margin-right: 42px;
    line-height: 1.7em;
  }
}
</style>
