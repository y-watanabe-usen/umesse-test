<template>
  <div class="end-year-date">
    <SelectBox
      :options="
        values.map((v) => {
          return {
            title: `12/${v}`,
            value: `12/${v}`,
          };
        })
      "
      :modelValue="modelValue"
      @update:modelValue="onChange"
    />
  </div>
</template>

<script lang="ts">
import { SetupContext } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { range } from "@/utils/Common";

export default {
  name: "EndYearDate",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      required: true,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: SetupContext) {
    const values = range(1, 32);
    const onChange = (event: Event) => {
      context.emit("update:modelValue", event);
    };
    return {
      values,
      onChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.end-year-date {
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
}
</style>
