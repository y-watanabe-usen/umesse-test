<template>
  <div class="form-group">
    <p class="title">
      {{ title }}
      <span class="required" v-if="required">※必須</span>
    </p>
    <div class="input-wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "FromGroup",
  props: {
    title: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: any) {
    const router = useRouter();
    const state = reactive({});
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.form-group {
  @include flex-between;
  margin-left: 75px;
  margin-right: 75px;
  margin-bottom: 26px;
  .title {
    width: 110px;
    height: 60px;
    line-height: 60px;
    font-size: 19px;
    font-weight: $font_weight_bold;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    .required {
      position: absolute;
      top: 50px;
      left: 0;
      color: rgb(0, 157, 255);
      font-size: 16px;
      font-weight: normal;
      line-height: 1em;
    }
  }
  .input-wrapper {
    @include flex_start;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
