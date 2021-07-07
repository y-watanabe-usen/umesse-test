<template>
  <li class="base">
    <div class="list-element-title">
      <slot name="title" />
    </div>
    <div class="list-element-contents" :class="[isNarrow ? 'is-narrow' : '']">
      <slot name="contents" />
    </div>
    <div class="list-element-description">
      <slot name="description" />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "TutorialItem",
  props: {
    isNarrow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.base {
  width: calc((100% - 120px) / 3);
  height: 445px;
  border: 2px solid rgb(192, 192, 191);
  border-radius: 10px;
  background-color: white;
  padding: 15px 15px;
  min-height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .list-element-title {
    color: black;
    font-weight: bold;
    font-size: 18px;
  }
  .list-element-contents {
    margin: 45px 0px;
    &.is-narrow {
      margin: 5px 0px;
    }
  }
  .list-element-description {
    color: #5c5c5c;
    font-weight: nomal;
    font-size: 13px;
    text-align: left;
  }
}
</style>
