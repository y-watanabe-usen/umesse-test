<template>
  <ul class="dropdown-menu" :style="state.style">
    <li
      v-for="param in params"
      :key="param.title"
      :class="{ caution: param.isCaution }"
      @click="param.action()"
    >
      {{ param.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, reactive } from "vue";

export default {
  name: "DropdownMenu",
  props: {
    params: {
      type: Array,
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
      defaul: 0,
    },
    arrowOffset: {
      type: Number,
      defaul: 0,
    },
    direction: {
      type: String,
      default: "down",
    }
  },
  setup(props: any) {
    const state = reactive({
      style: computed(() => {
        return {
          width: props.width + "px",
          top: props.direction == "down" ? (props.targetHeight + 20) + "px" : "auto",
          bottom: props.direction == "up" ? (props.targetHeight + 20) + "px" : "auto",
          left: (((props.targetWidth - props.width) / 2) + props.offset) + "px",
        };
      })
    });
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.dropdown-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 0;
  margin: 0;
  border: 0;
  z-index: 100;
  li {
    font-size: 16px;
    font-weight: $font_weight_bold;
    line-height: 60px;
    height: 60px;
    border-top: 1px solid rgb(232, 232, 232);
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-top: none;
    }
    &.caution {
      color: rgb(155, 0, 0);
      border-top: 1px solid rgb(141, 141, 141);
    }
  }
}
</style>
