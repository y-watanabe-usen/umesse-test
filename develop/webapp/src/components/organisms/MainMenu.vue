<template>
  <div>
    <BasicLayout>
      <ul class="main-menu">
        <div class="menu-item-center">
          <div class="menu-item-title">音声CMの作成</div>
          <div class="menu-item">
            <MainMenuItem to="Recording">
              <template #icon
                ><img src="@/assets/icon_home_recording.svg"
              /></template>
              <template #title>録音</template>
              <template #description
                >声を録音して<br />ナレーションを作る</template
              >
            </MainMenuItem>
            <MainMenuItem :clickFunction="openSelectVoiceModal">
              <template #icon
                ><img src="@/assets/icon_home_template.svg"
              /></template>
              <template #title>テキスト音声合成</template>
              <template #description
                >テキスト音声読み上げして<br />ナレーションを作る</template
              >
            </MainMenuItem>
            <MainMenuItem to="Narration">
              <template #icon
                ><img src="@/assets/icon_home_narration.svg"
              /></template>
              <template #title>既存素材の選択</template>
              <template #description
                >過去に作成したナレーション、<br />USENが収録したナレーション<br />の中から素材を選択する</template
              >
            </MainMenuItem>
          </div>
        </div>
        <div class="menu-item-bottom">
          <MainMenuItem to="Management" :isWide="true">
            <template #icon
              ><img src="@/assets/icon_home_management.svg"
            /></template>
            <template #title>音声CM一覧</template>
            <template #description>過去に作成した音声CMの管理をする</template>
          </MainMenuItem>
          <!-- <MainMenuItem to="Home" :isWide="true">
          <template #icon><img src="@/assets/icon_home_order.svg"/></template>
          <template #title>発注する</template>
          <template #description
            >ご希望の内容で、弊社の制作チームに店内CMを発注します。<br />※発注は有料サービスになります。</template
          >
        </MainMenuItem> -->
        </div>
      </ul>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalDialog
        v-if="isSelectVoiceModalAppear"
        @close="closeSelectVoiceModal"
      >
        <template #header>
          <ModalHeader title="音声合成" @close="closeSelectVoiceModal" />
        </template>
        <template #contents>
          <MessageDialogContents>
            <div>
              <ul class="voice-item">
                <MainMenuVoiceItem to="VoiceFree" descriptionColor="black">
                  <template #icon
                    ><img src="@/assets/icon_home_free.svg"
                  /></template>
                  <template #title>フリー入力</template>
                  <template #description
                    >自由にテキストを入力して<br />音声読み上げする</template
                  >
                </MainMenuVoiceItem>
                <MainMenuVoiceItem to="VoiceTemplate" descriptionColor="black">
                  <template #icon
                    ><img src="@/assets/icon_home_template.svg"
                  /></template>
                  <template #title
                    >テンプレートの選択</template
                  >
                  <template #subtitle>※多言語対応あり</template>
                  <template #description
                    >サンプルの原稿をベースに固有名詞などを<br />穴埋めして音声読み上げする<br />※一部コンテンツは多言語対応</template
                  >
                </MainMenuVoiceItem>
              </ul>
            </div>
          </MessageDialogContents>
        </template>
      </ModalDialog>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import MainMenuItem from "@/components/molecules/MainMenuItem.vue";
import MainMenuVoiceItem from "@/components/molecules/MainMenuVoiceItem.vue";
import useModalController from "@/mixins/modalController";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";

export default defineComponent({
  components: {
    MainMenuItem,
    MainMenuVoiceItem,
    ModalDialog,
    ModalHeader,
    MessageDialogContents,
  },
  name: "MainMenu",
  setup() {
    const {
      isApper: isSelectVoiceModalAppear,
      open: openSelectVoiceModal,
      close: closeSelectVoiceModal,
    } = useModalController();
    const state = reactive({});
    return {
      state,
      isSelectVoiceModalAppear,
      openSelectVoiceModal,
      closeSelectVoiceModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.main-menu {
  @include flex_center;
  align-items: stretch;
  flex-flow: column;
  caret-color: transparent;
  text-align: center;
  .main-menu-item {
    margin-left: 40px;
    margin-right: 40px;
    width: calc((100% - 120px) / 3);
    &.is-wide {
      width: calc((100% - 80px) / 2);
    }
  }
  .menu-item-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: stretch;
    caret-color: transparent;
    position: relative;
    margin-top: 1em;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding-top: 74px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 41px;
    margin-right: 41px;
    margin-bottom: 36px;
    min-height: 212px;
    .menu-item-title {
      @include flex_center;
      color: white;
      font-size: 23px;
      font-weight: $font_weight_bold;
      line-height: 40px;
      position: absolute;
      top: 0;
      left: 20px;
      font-weight: 600;
      margin: 15px auto;
      width: 100%;
    }
    .menu-item {
      @include flex_center;
      align-items: stretch;
      caret-color: transparent;
    }
  }
  .menu-item-bottom {
    @include flex_center;
    align-items: stretch;
    caret-color: transparent;
  }
}
.voice-item {
  @include flex_center;
  align-items: stretch;
  caret-color: transparent;
  .main-menu-voice-item {
    margin-left: 32px;
    margin-right: 32px;
    width: calc((100% - 300px) / 2);
  }
}
</style>
