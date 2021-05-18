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
import { defineComponent, SetupContext } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { range } from "@/utils/common";

export default defineComponent({
  name: "EndYearDate",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const values = range(1, 32);
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

.end-year-date {
  @include flex_start;
  align-items: center;
  width: 120px;
}
</style>
