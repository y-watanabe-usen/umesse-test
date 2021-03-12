<template>
  <input
    type="text"
    :value="modelValue"
    :disabled="isDisabled"
    @input="onUpdate"
    @change="onChange"
  />
</template>

<script lang="ts">
import { reactive, SetupContext } from "vue";

export default {
  name: "TextBox",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    onChangeInput: {
      type: Function,
      required: false,
      default: null,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: SetupContext) {
    const state = reactive({});
    const onUpdate = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        context.emit("update:modelValue", event.target.value);
        if (!props.onChangeInput()) props.onChangeInput();
      }
    };
    const onChange = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        context.emit("change", event.target.value);
      }
    };
    return {
      state,
      onUpdate,
      onChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

input {
  height: 58px;
  width: 100%;
  font-size: 19px;
  font-weight: $font_weight_bold;
  outline: none;
  border: none;
  appearance: none;
  border: 1px solid rgb(190, 190, 190);
  border-radius: 6px;
  padding-left: 24px;
  padding-right: 24px;
}
</style>
