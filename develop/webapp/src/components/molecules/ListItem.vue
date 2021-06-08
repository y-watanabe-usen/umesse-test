<template>
  <li class="list-item">
    <div class="contents">
      <div class="wrapper">
        <slot name="title" />
        <slot name="line1" />
        <slot name="line2" />
      </div>
    </div>
    <div class="operations" :class="{'is-wide': isWide}">
      <slot name="operations" />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "ListItem",
  props: {
    isWide: {
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

.list-item {
  @include flex_between;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid rgb(240, 240, 240);
  &.scene {
    height: 92px;
    .contents {
      .wrapper {
        ::v-deep h2 {
          margin-bottom: 10px;
        }
      }
    }
  }
  .contents {
    @include flex_start;
    align-items: center;
    width: calc(100% - 440px - 54px);
    padding-left: 34px;
    padding-right: 20px;
    flex-grow: 1;
    flex-shrink: 1;
    .wrapper {
      width: 100%;
      ::v-deep h2 {
        @include ellipsis;
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
        .status {
          display: inline-block;
          margin-right: 20px;
          margin-left: 14px;
          font-weight: $font_weight_bold;
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 15px;
          &.comp {
            color: rgb(47, 118, 178);
            background-color: rgb(232, 244, 253);
          }
          &.busy {
            color: rgb(45, 172, 34);
            background-color: rgb(222, 239, 220);
          }
          &.error {
            color: rgb(186, 48, 48);
            background-color: rgb(255, 229, 229);
          }
        }
      }
    }
  }
  .operations {
    @include flex_end;
    align-items: center;
    width: 420px;
    padding-left: 20px;
    padding-right: 0;
    flex-grow: 0;
    flex-shrink: 0;
    &.is-wide {
      width: 250px;
    }
    ::v-deep button {
      width: 120px;
      font-size: 16px;
      margin-right: 20px;
      padding-left: 0;
      padding-right: 0;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
      &.btn-document {
        img {
          width: 22px;
          height: 28px;
          margin-right: 12px;
        }
      }
      &.btn-play {
        img {
          height: 26px;
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
      &.btn-more {
        position: relative;
        height: 30px;
        width: 80px;
        box-shadow: none;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
