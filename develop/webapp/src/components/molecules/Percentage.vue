<template>
  <div class="percentage">
    <SelectBox
      :options="
        values.map((v) => {
          return {
            title: v,
            value: v,
          };
        })
      "
      :modelValue="modelValue"
      @update:modelValue="onChange"
    />
    <p class="label">%</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { range } from "@/utils/common";

export default defineComponent({
  name: "Percentage",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const values = range(1, 100);
    const onChange = (event: Event) => {
      context.emit("update:modelValue", event);
    };
    return {
      values,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.percentage {
  @include flex_start;
  align-items: center;
  width: 120px;
  .label {
    margin-left: 5px;
    color: black;
    font-size: 16px;
    font-weight: $font_weight_bold;
    line-height: 58px;
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
