<template>
  <div class="minutes">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { range } from "@/utils/common";

export default defineComponent({
  name: "Minutes",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const values = range(1, 61);
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

.minutes {
  @include flex_start;
  align-items: center;
  width: 120px;
}
</style>
