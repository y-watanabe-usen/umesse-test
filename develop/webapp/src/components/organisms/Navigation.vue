<template>
  <ul class="navigation">
    <NavigationItem to="Recording">
      <template #icon><img src="@/assets/icon_home_recording.svg" /></template>
      <template #title>録音して作成</template>
      <template #description>ご自身の声を録音して、<br>店内アナウンスを作成します。</template>
    </NavigationItem>
    <NavigationItem to="Narration">
      <template #icon><img src="@/assets/icon_home_narration.svg" /></template>
      <template #title>ナレーション素材から作成</template>
      <template #description>USENが提供する音声素材から、店内アナウンスを作成します。</template>
    </NavigationItem>
    <NavigationItem to="VoiceTemplate">
      <template #icon><img src="@/assets/icon_home_template.svg" /></template>
      <template #title>音声合成テンプレートから作成</template>
      <template #description>よく使われる文言のテンプレートをカスタマイズして作成します。</template>
    </NavigationItem>
    <NavigationItem to="VoiceFree">
      <template #icon><img src="@/assets/icon_home_free.svg" /></template>
      <template #title>音声合成フリー入力から作成</template>
      <template #description>自由な文言からアナウンスを作成します。</template>
    </NavigationItem>
    <NavigationItem to="Management" :isWide="true">
      <template #icon><img src="@/assets/icon_home_management.svg" /></template>
      <template #title>管理する</template>
      <template #description>自分で作成した店内アナウンスを試聴することができます。</template>
    </NavigationItem>
    <NavigationItem to="Home" :isWide="true">
      <template #icon><img src="@/assets/icon_home_order.svg" /></template>
      <template #title>発注する</template>
      <template #description>ご希望の内容で、弊社の制作チームがオリジナル店内アナウンスを作成いたします。<br>店内アナウンス発注は有料になります。</template>
    </NavigationItem>
  </ul>
</template>

<script lang="ts">
import { reactive } from "vue";
import NavigationItem from "@/components/molecules/NavigationItem.vue";

export default {
  components: {
    NavigationItem,
  },
  name: "Navigation",
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

.navigation {
  @include flex_between;
  flex-flow: row wrap;
  padding-left: 30px;
  padding-right: 30px;
  .navigation-item {
    width: calc((100% - 60px) / 4);
    &.is-wide {
      width: calc((100% - 20px) / 2);
    }
  }
}
</style>
