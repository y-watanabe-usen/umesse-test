<template>
  <div class="volume-slider" :style="state.style" @click.stop="() => {}">
    <div class="base">
      <img src="@/assets/icon_volume_black.svg" />
      <vue-slider
        class="slider"
        :modelValue="modelValue"
        :width="310"
        :dotSize="20"
        tooltip="none"
        :railStyle="{ backgroundColor: 'rgb(186, 186, 186)' }"
        :processStyle="{ backgroundColor: 'rgb(186, 186, 186)' }"
        :dotStyle="{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }"
        @change="$emit('update:modelValue', $event)"
      />
    </div>
    <div class="arrow" :style="state.arrowStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: "VolumeSlider",
  components: {
    VueSlider,
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    targetWidth: {
      type: Number,
      required: true,
    },
    targetHeight: {
      type: Number,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: "down",
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any) {
    const state = reactive({
      value: 0,
      style: computed(() => {
        return {
          width: props.width + "px",
          top: props.direction == "down" ? (props.targetHeight + 24) + "px" : "auto",
          bottom: props.direction == "up" ? (props.targetHeight + 24) + "px" : "auto",
          left: -15 + props.offset + "px",
        };
      }),
      arrowStyle: computed(() => {
        return {
          top: props.direction == "down" ? "-12px" : "auto",
          bottom: props.direction == "up" ? "-12px" : "auto",
          left: (((props.targetWidth - 25) / 2) + 15 - props.offset) + "px",
        };
      }),
    });
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.volume-slider {
  position: absolute;
  padding: 0;
  margin: 0;
  border: 0;
  z-index: 100;
  background-color: transparent;
  .base {
    @include flex_start;
    align-items: center;
    height: 80px;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    margin-bottom: 0;
    .slider, img {
      position: relative;
      z-index: 3;
    }
    .slider {
      margin-right: 30px;
      flex-shrink: 1;
    }
    img {
      display: block;
      height: 26px;
      margin-left: 20px;
      margin-right: 30px;
      flex-shrink: 0;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 8px;
      background-color: white;
      z-index: 2;
    }
  }
  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    width: 25px;
    height: 25px;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    transform: rotate(45deg) skew(10deg, 10deg);
    z-index: 1;
  }
}
</style>
