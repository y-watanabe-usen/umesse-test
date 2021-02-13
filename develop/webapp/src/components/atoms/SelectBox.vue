<template>
  <div class="select-box">
    <select :value="value" @change="onChange">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { reactive, SetupContext } from "vue";

export default {
  name: "SelectBox",
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props: any, context: SetupContext) {
    const state = reactive({});
    const onChange = (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        context.emit('change', event.target.value);
      }
    }
    return {
      state,
      onChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.select-box {
  height: 58px;
  width: 100%;
  border: 1px solid rgb(190, 190, 190);
  border-radius: 6px;
  position: relative;
  &::before {
    position: absolute;
    top: 36px;
    right: 12px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgb(95, 95, 95);
    pointer-events: none;
  }
  select {
    width: calc(100% - 48px);
    height: 100%;
    outline: none;
    border: none;
    appearance: none;
    font-size: 19px;
    font-weight: $font_weight_bold;
    line-height: 58px;
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>
