<template>
  <div class="form-group">
    <p class="title">
      {{ title }}
      <span class="required" v-if="required">※必須</span>
      <span class="title-description" v-if="titleDescription != ''">
        {{ titleDescription }}
      </span>
    </p>
    <div class="input-wrapper">
      <slot />
      <p class="description" v-if="description != ''">
        {{ description }}
      </p>
      <p class="descriptionSub" v-if="descriptionSub != ''">
        {{ descriptionSub }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "FromGroup",
  props: {
    title: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    descriptionSub: {
      type: String,
      default: "",
    },
    titleDescription: {
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

.form-group {
  @include flex_between;
  margin-left: 75px;
  margin-right: 75px;
  margin-bottom: 26px;
  p {
    caret-color: transparent;
  }
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
    .title-description {
      position: absolute;
      top: 50px;
      left: 0;
      font-size: 19px;
      font-weight: $font_weight_bold;
      line-height: 1em;
    }
  }
  .input-wrapper {
    @include flex_start;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;
    .description {
      color: rgb(123, 123, 123);
      font-size: 16px;
      position: absolute;
      left: 0;
      bottom: -24px;
    }
    .descriptionSub {
      color: rgb(123, 123, 123);
      font-size: 16px;
      position: absolute;
      left: 0;
      bottom: -44px;
    }
  }
}
</style>
