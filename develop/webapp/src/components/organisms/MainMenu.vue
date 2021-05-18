<template>
  <ul class="main-menu">
    <MainMenuItem to="Recording">
      <template #icon><img src="@/assets/icon_home_recording.svg" /></template>
      <template #title>録音して作成</template>
      <template #description
        >ご自身の声を録音して、<br />店内CMを作成します。</template
      >
    </MainMenuItem>
    <MainMenuItem to="Narration">
      <template #icon><img src="@/assets/icon_home_narration.svg" /></template>
      <template #title>ナレーション素材から作成</template>
      <template #description
        >USENが提供する音声素材から、<br />店内CMを作成します。</template
      >
    </MainMenuItem>
    <MainMenuItem to="VoiceTemplate">
      <template #icon><img src="@/assets/icon_home_template.svg" /></template>
      <template #title>音声合成テンプレートから作成</template>
      <template #description
        >よく使われる文言のテンプレートを<br />カスタマイズして作成します。</template
      >
    </MainMenuItem>
    <MainMenuItem to="VoiceFree">
      <template #icon><img src="@/assets/icon_home_free.svg" /></template>
      <template #title>音声合成フリー入力から作成</template>
      <template #description>入力いただいた文章から、<br />店内CMを作成します。</template>
    </MainMenuItem>
    <MainMenuItem to="Management" :isWide="true">
      <template #icon><img src="@/assets/icon_home_management.svg" /></template>
      <template #title>管理する</template>
      <template #description
        >作成した店内CMの管理を行います。</template
      >
    </MainMenuItem>
    <!-- <MainMenuItem to="Home" :isWide="true">
      <template #icon><img src="@/assets/icon_home_order.svg" /></template>
      <template #title>発注する</template>
      <template #description
        >ご希望の内容で、弊社の制作チームに店内CMを発注します。<br />※発注は有料サービスになります。</template
      >
    </MainMenuItem> -->
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import MainMenuItem from "@/components/molecules/MainMenuItem.vue";

export default defineComponent({
  components: {
    MainMenuItem,
  },
  name: "MainMenu",
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

.main-menu {
  @include flex_center;
  align-items: stretch;
  flex-flow: row wrap;
  caret-color: transparent;
  .main-menu-item {
    margin-left: 10px;
    margin-right: 10px;
    width: calc((100% - 120px) / 4);
    &.is-wide {
      width: calc((100% - 80px) / 2);
    }
  }
}
</style>
