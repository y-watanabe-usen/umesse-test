<template>
  <textarea
    :value="value"
    :disabled="isDisabled"
    @input="onUpdate"
  >
  </textarea>
</template>

<script lang="ts">
import { reactive, SetupContext } from "vue";

export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, context: SetupContext) {
    const state = reactive({});
    const onUpdate = (event: Event) => {
      if (event.target instanceof HTMLTextAreaElement) {
        context.emit('update:value', event.target.value);
      }
    }
    return {
      state,
      onUpdate,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

textarea {
  height: 116px;
  width: 100%;
  font-size: 19px;
  font-weight: $font_weight_bold;
  line-height: 1.4em;
  outline: none;
  border: none;
  appearance: none;
  border: 1px solid rgb(190, 190, 190);
  border-radius: 6px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 14px;
  padding-bottom: 14px;
  resize: none;
}
</style>
