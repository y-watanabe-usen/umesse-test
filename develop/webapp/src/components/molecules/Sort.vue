<template>
  <div class="sort">
    <p class="label">ソート：</p>
    <SelectBox
      :options="options"
      :modelValue="modelValue"
      @update:modelValue="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";

export default defineComponent({
  name: "Sort",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const state = reactive({});
    const onChange = (event: Event) => {
      context.emit("update:modelValue", event);
    };
    return {
      state,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.sort {
  @include flex_start;
  align-items: center;
  margin-top: 9px;
  .label {
    color: black;
    font-size: 16px;
    font-weight: $font_weight_bold;
    line-height: 58px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  ::v-deep .select-box {
    border: none;
    width: auto;
    &::before {
      top: 32px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid rgb(95, 95, 95);
    }
    select {
      font-size: 16px;
      font-weight: $font_weight_bold;
      width: auto;
      padding-left: 4px;
      padding-right: 38px;
    }
  }
}
</style>
