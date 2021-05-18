<template>
  <li class="setting-list-item">
    <p class="title">
      <slot name="title" />
    </p>
    <p class="description">
      <slot name="description" />
    </p>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "SettingListItem",
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

.setting-list-item {
  @include flex_between;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(240, 240, 240);
  p {
    margin-left: 34px;
    margin-right: 30px;
    line-height: 80px;
    font-size: 20px;
    &.title {
      color: black;
      font-weight: $font_weight_bold;
    }
    &.description {
      @include ellipsis;
      color: rgb(92, 92, 92);
      width: 730px;
      text-align: right;
    }
  }
}
</style>
