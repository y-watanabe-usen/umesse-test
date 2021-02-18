<template>
  <li class="list-item">
    <div class="contents">
      <div class="wrapper">
        <slot name="title" />
        <slot name="line1" />
        <slot name="line2" />
      </div>
    </div>
    <div class="operations">
      <slot name="operations" />
    </div>
  </li>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  name: "ListItem",
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.list-item {
  @include flex_between;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid rgb(240, 240, 240);
  .contents {
    @include flex_start;
    align-items: center;
    width: calc(100% - 428px - 68px);
    padding-left: 34px;
    padding-right: 34px;
    flex-grow: 1;
    flex-shrink: 1;
    .wrapper {
      width: 100%;
      ::v-deep h2 {
        color: black;
        font-size: 20px;
        font-weight: $font_weight_bold;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      ::v-deep p {
        @include ellipsis;
        color: rgb(92, 92, 92);
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 10px;
        span {
          color: rgb(92, 92, 92);
          font-size: 18px;
        }
        .duration {
          display: inline-block;
          margin-right: 34px;
        }
        .start {
          display: inline-block;
          margin-right: 20px;
        }
        .end {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
  }
  .operations {
    @include flex_end;
    align-items: center;
    width: 402px;
    padding-left: 20px;
    padding-right: 6px;
    flex-grow: 0;
    flex-shrink: 0;
    ::v-deep button {
      width: 120px;
      font-size: 16px;
      margin-right: 14px;
      padding-left: 0;
      padding-right: 0;
      &.btn-document {
        img {
          width: 22px;
          height: 28px;
          margin-right: 12px;
        }
      }
      &.btn-play {
        img {
          width: 30px;
          height: 23px;
          margin-right: 12px;
        }
      }
      &.btn-select {
        img {
          width: 10px;
          height: 17px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
