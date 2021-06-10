<template>
  <input
    type="time"
    :value="modelValue"
    :disabled="isDisabled"
    @input="onUpdate"
    @change="onChange"
    @click.prevent=""
  />
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from "vue";

export default defineComponent({
  name: "TimeInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context: SetupContext) {
    const state = reactive({});
    const onUpdate = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        context.emit("update:modelValue", event.target.value);
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
});
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
