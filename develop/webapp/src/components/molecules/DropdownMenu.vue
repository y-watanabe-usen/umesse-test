<template>
  <div class="dropdown-menu" :style="state.style">
    <ul>
      <li
        v-for="param in params"
        :key="param.title"
        :class="{ caution: param.isCaution, disabled: param.isDisabled }"
        @click.stop="onClick(param)"
      >
        <span>{{ param.title }}</span>
      </li>
    </ul>
    <div class="arrow" :style="state.arrowStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

export default defineComponent({
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
      default: 0,
    },
    direction: {
      type: String,
      default: "down",
    },
  },
  setup(props) {
    const state = reactive({
      style: computed(() => {
        return {
          width: props.width + "px",
          top:
            props.direction == "down" ? props.targetHeight + 24 + "px" : "auto",
          bottom:
            props.direction == "up" ? props.targetHeight + 24 + "px" : "auto",
          left: (props.targetWidth - props.width) / 2 + props.offset + "px",
        };
      }),
      arrowStyle: computed(() => {
        return {
          top: props.direction == "down" ? "-12px" : "auto",
          bottom: props.direction == "up" ? "-12px" : "auto",
          left: (props.width - 25) / 2 - props.offset + "px",
        };
      }),
    });
    const onClick = (param: {
      action: () => void;
      isDisabled: boolean | undefined;
    }) => {
      if (!param.isDisabled) {
        param.action();
      }
    };
    return {
      state,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.dropdown-menu {
  display: block;
  position: absolute;
  padding: 0;
  margin: 0;
  border: 0;
  z-index: 100;
  background-color: transparent;
  ul {
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    margin-bottom: 0;
    li {
      height: 60px;
      border-top: 1px solid rgb(232, 232, 232);
      margin-left: 10px;
      margin-right: 10px;
      text-align: center;
      cursor: pointer;
      position: relative;
      z-index: 3;
      &:first-child {
        border-top: none;
      }
      &.caution {
        border-top: 1px solid rgb(141, 141, 141);
        span {
          color: rgb(155, 0, 0);
        }
      }
      &.disabled > * {
        opacity: 0.3;
      }
      span {
        font-size: 16px;
        font-weight: $font_weight_bold;
        line-height: 60px;
      }
    }
    &::after {
      content: "";
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
