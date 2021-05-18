<template>
  <div class="cm-item" :class="[size, isEmpty ? 'empty' : '']">
    <div class="header">
      <p class="title">{{ title }}</p>
    </div>
    <div class="body">
      <template v-if="isEmpty">
        <button type="button" class="btn-add" @click.stop="$emit('add')">
          <img src="@/assets/icon_plus.svg" />
          <slot name="dropdownmenu" />
        </button>
        <p class="btn-add-title">素材追加</p>
      </template>
      <template v-else>
        <p class="content-title" :class="[`content-title-width_${contentTitleName}`]">
          {{ contentTitle }}
        </p>
        <button class="sound" @click="$emit('togglePlay')">
          <img src="@/assets/icon_sound.svg" />
        </button>
        <p class="duration">{{ duration }}</p>
      </template>
    </div>
    <div class="footer" v-if="!isEmpty">
      <div class="volume" @click.stop="$emit('toggleSlider')">
        <img src="@/assets/icon_volume.svg" />{{ volume }}%
        <slot name="volume" />
      </div>
      <div class="operations">
        <slot name="operations" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "CmItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      required: true,
    },
    contentTitle: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    volume: {
      type: Number,
      default: 0,
    },
    contentTitleName: {
      type: String,
      default: "",
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

.cm-item {
  @include flex_col_start;
  height: 286px;
  border-radius: 7px;
  box-shadow: $box_shadow_weak;
  margin-left: 4px;
  margin-right: 4px;
  background-color: rgba(255, 255, 255, 0.85);
  &.empty {
    background-color: rgba(211, 211, 211, 0.85);
  }
  &.flexible {
    width: 200px;
    flex-grow: 1;
    flex-shrink: 1;
  }
  &.fixed {
    width: 200px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .header {
    height: 54px;
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    .title {
      color: rgb(76, 86, 121);
      font-size: 16px;
      font-weight: $font_weight_bold;
      text-align: center;
      height: 36px;
      line-height: 36px;
      width: 160px;
      border-radius: 18px;
      margin-left: auto;
      margin-right: auto;
      background-color: white;
      margin-top: 18px;
    }
  }
  .body {
    @include flex_center;
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    .btn-add {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background-color: white;
      margin-bottom: 20px;
    }
    .btn-add-title,
    .content-title {
      @include ellipsis;
      width: 500px;
      font-size: 16px;
      font-weight: $font_weight_bold;
      text-align: center;
    }
    .content-title-width_chime {
      width: 170px;
    }
    .content-title-width_bgm {
      width: 800px;
    }
    .content-title-width_narration1 {
      width: 380px;
    }
    .content-title-width_narration2 {
      width: 240px;
    }
    .content-title-width_narration3,
    .content-title-width_narration4 {
      width: 170px;
    }
    .btn-add-title {
      color: white;
    }
    .content-title {
      color: black;
      margin-bottom: 14px;
    }
    .sound {
      width: 70px;
      height: 70px;
      border-radius: 35px;
      border-bottom: 14px;
      background-color: white;
      margin-bottom: 14px;
    }
    .duration {
      color: black;
      font-size: 14px;
      text-align: center;
    }
    .btn-add {
      position: relative;
    }
  }
  .footer {
    @include flex_between;
    align-items: center;
    height: 60px;
    width: calc(100% - 35px);
    flex-grow: 0;
    flex-shrink: 0;
    background-color: white;
    padding-left: 15px;
    padding-right: 20px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    .volume {
      @include flex_start;
      position: relative;
      align-items: center;
      color: $color_blue;
      font-size: 19px;
      height: 30px;
      line-height: 30px;
      img {
        margin-right: 10px;
      }
    }
    .operations {
      ::v-deep button,
      img {
        position: relative;
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
