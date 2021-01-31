<template>
  <header class="header">
    <p class="btn-back"><a href="#" @click.prevent="back">戻る</a></p>
    <div class="title">
        <slot name="title" />
    </div>
    <div class="buttons">
      <slot name="buttons" />
    </div>
  </header>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const state = reactive({});
    const back = () => {
      router.go(-1);
    }
    return {
      state,
      back,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.header {
  height: 80px;
  .btn-back {
    position: absolute;
    top: 28px;
    left: 24px;
    padding-left: 24px;
    a {
      position: relative;
      display: inline-block;
      color: white;
      font-size: 16px;
      font-weight: $font_weight_bold;
      line-height: 24px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -24px;
        width: 14px;
        height: 24px;
        background-image: url("~@/assets/icon_back.svg");
        background-repeat: no-repeat;
        background-size: 100%;
      }
    }
  }
  .title {
    @include flex_center;
    height: 100%;
    color: white;
    font-size: 20px;
    font-weight: $font_weight_bold;
  }
  .buttons {
    @include flex_end;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 80px;
    padding-right: 32px;
  }
}
</style>
