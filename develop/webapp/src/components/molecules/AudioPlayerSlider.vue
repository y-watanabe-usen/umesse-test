<template>
  <vue-slider
    class="slider"
    :modelValue="modelValue"
    :dotSize="20"
    :min="0"
    :max="state.duration"
    :interval="0.001"
    :duration="0"
    tooltip="none"
    :disabled="disabled"
    :railStyle="{ backgroundColor: 'rgb(186, 186, 186)' }"
    :processStyle="{ backgroundColor: 'rgb(87, 142, 217)' }"
    :dotStyle="{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }"
    @change="$emit('onChange')"
  />
</template>

<script lang="ts">
import { computed, reactive } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "AudioPlayerSlider",
  components: {
    VueSlider,
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any) {
    const state = reactive({
      duration: computed(() => Number.parseFloat(props.duration).toFixed(3)),
    });
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.slider {
  width: 100%;
}
</style>
