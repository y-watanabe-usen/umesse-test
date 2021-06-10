<template>
  <div class="time-selector">
    <SelectBox
      v-model="inputHour"
      :options="createSequentialOptions(24)"
    />
    <p>：</p>
    <SelectBox
      v-model="inputMinutes"
      :options="createSequentialOptions(60)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, toRefs, watchEffect } from "vue";
import SelectBox from "@/components/atoms/SelectBox.vue";

export default defineComponent({
  name: "TimeSelector",
  components: {
    SelectBox,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const state = reactive({
      inputHour: 0,
      inputMinutes: 0,
    });
    const zeroPadding = (n: number) => {
      return ('00' + n).slice(-2);
    };
    const createSequentialOptions = (num: number) => {
      return new Array(num).fill(null).map((_, i) => ({ value: i, title: zeroPadding(i) }));
    };
    watchEffect(() => {
      const [hour, minutes] = props.modelValue.split(':');
      state.inputHour = parseInt(hour);
      state.inputMinutes = parseInt(minutes);
    });
    watchEffect(() => {
      const time = zeroPadding(state.inputHour) + ':' + zeroPadding(state.inputMinutes);
      context.emit("update:modelValue", time);
    });
    return {
      ...toRefs(state),
      zeroPadding,
      createSequentialOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.time-selector {
  @include flex_center;
  padding-left: 120px;
  padding-right: 120px;
  p {
    font-size: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
