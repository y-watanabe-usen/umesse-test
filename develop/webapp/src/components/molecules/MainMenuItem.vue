<template>
  <li class="main-menu-item" :class="{ 'is-wide': isWide }">
    <div class="base" @click="onClick">
      <h2>
        <span class="icon"><slot name="icon" /></span>
        <span class="title"><slot name="title" /></span>
      </h2>
    </div>
    <p class="description"><slot name="description" /></p>
  </li>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "MainMenuItem",
  props: {
    to: {
      type: String,
      required: true,
    },
    isWide: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: any) {
    const router = useRouter();
    const state = reactive({});
    const onClick = () => {
      router.push({ name: props.to })
    }
    return {
      state,
      onClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.main-menu-item {
  margin-bottom: 56px;
  .base {
    border-radius: 10px;
    background-color: white;
    padding-top: 36px;
    padding-bottom: 32px;
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: $box_shadow;
    min-height: 212px;
    cursor: pointer;
    h2 {
      display: block;
      margin: 0;
    }
    .icon {
      display: block;
      width: 100px;
      height: 100px;
      margin-bottom: 36px;
      margin-left: auto;
      margin-right: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      color: black;
      display: block;
      font-size: 23px;
      font-weight: $font_weight_bold;
      line-height: 1.5em;
      text-align: center;
    }
  }
  .description {
    color: white;
    font-size: 15px;
    font-weight: $font_weight_bold;
    line-height: 1.6em;
    text-align: center;
    margin-top: 16px;
  }
  &.is-wide {
    margin-bottom: 20px;
    .base {
      h2 {
        @include flex_center;
        margin: 0 auto;
      }
      padding-top: 4px;
      padding-bottom: 4px;
      min-height: auto;
      .icon {
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 6px;
        width: 80px;
        height: 80px;
      }
      .title {
        line-height: 80px;
      }
    }
  }
}
</style>
