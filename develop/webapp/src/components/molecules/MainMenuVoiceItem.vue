<template>
  <li class="main-menu-voice-item">
    <div class="base" @click="onClick">
      <h2>
        <span class="icon"><slot name="icon"/></span>
        <span class="title"><slot name="title"/></span>
        <span class="subtitle"><slot name="subtitle"/></span>
      </h2>
    </div>
    <p class="description">
      <slot name="description" />
    </p>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainMenuVoiceItem",
  props: {
    to: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({});
    const onClick = () => {
      router.push({ name: props.to });
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

.main-menu-voice-item {
  margin-bottom: 36px;
  width: calc((100% - 120px) / 2);
  .base {
    border-radius: 10px;
    background-color: white;
    padding-top: 17px;
    padding-bottom: 17px;
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: $box_shadow;
    min-height: 180px;
    cursor: pointer;
    h2 {
      display: block;
      margin: 0;
    }
    .icon {
      display: block;
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
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
      font-size: 24px;
      font-weight: $font_weight_bold;
      line-height: 1.5em;
      text-align: center;
    }
    .subtitle {
      color: black;
      display: block;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.6em;
      text-align: center;
    }
  }
  .description {
    color: black;
    font-size: 16px;
    font-weight: $font_weight_bold;
    line-height: 1.6em;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
