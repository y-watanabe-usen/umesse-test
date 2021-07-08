<template>
  <div>
    <header>
      <h2>
        <img src="@/assets/logo_umesse.png" />
      </h2>
      <ul class="nav">
        <li>
          <router-link :to="{ name: 'Setting' }">
            <img src="@/assets/icon_setting.svg" />
          </router-link>
        </li>
      </ul>
    </header>
    <MainMenu />
    <!-- modal -->
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="reload"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" />
    <transition>
      <ModalDialog
        v-if="isTutorialModalAppear"
        @close="closeTutorialModal"
        size="large"
        :isNarrow="true"
      >
        <template #header>
          <ModalHeader title="音声CM作成の流れ" @close="closeTutorialModal" />
        </template>
        <template #contents>
          <div>
            <ul class="list-style">
              <TutorialItem :isNarrow="true">
                <template #title>
                  <p>
                    Step.1<br />
                    中心となる素材を決める
                  </p>
                </template>
                <template #contents>
                  <ul class="tutorial-contents">
                    <li class="tutorial-contents-li">
                      <span>録音</span>
                      <div class="img" />
                      <!-- <span><img src="@/assets/home_screen_shot.png"/></span> -->
                    </li>
                    <li>or</li>
                    <li class="tutorial-contents-li">
                      <span>音声合成</span>
                      <div class="img" />
                      <!-- <span><img src="@/assets/home_screen_shot.png"/></span> -->
                    </li>
                    <li>or</li>
                    <li class="tutorial-contents-li">
                      <span>既存素材の選択</span>
                      <div class="img" />
                      <!-- <span><img src="@/assets/home_screen_shot.png"/></span> -->
                    </li>
                  </ul>
                </template>
                <template #description>
                  <p>
                    録音や音声合成で素材を作ったり、<br />既存素材を選ぶことで、音声CMの中心<br />となる素材を決定します。
                  </p>
                </template>
              </TutorialItem>
              <li class="arrow">→</li>
              <TutorialItem>
                <template #title>
                  <p>
                    Step.2<br />
                    素材を組み合わせる
                  </p>
                </template>
                <template #contents>
                  <div class="img" />
                  <!-- <img src="@/assets/home_screen_shot.png" /> -->
                </template>
                <template #description>
                  <p>
                    BGM・チャイムの設定、他のナレーション<br />素材の追加などを行い、音声CMの中身<br />の編集を行います。
                  </p>
                </template>
              </TutorialItem>
              <li class="arrow">→</li>
              <TutorialItem>
                <template #title>
                  <p>
                    Step.3<br />
                    必要情報を入力する
                  </p>
                </template>
                <template #contents>
                  <div class="img" />
                  <!-- <img src="@/assets/home_screen_shot.png" /> -->
                </template>
                <template #description>
                  <p>
                    タイトル、説明文、保存先、アップロード先<br />など、音声CM保存のために必要な情報<br />を入力します。
                  </p>
                </template>
              </TutorialItem>
            </ul>
          </div>
        </template>
        <template #footer>
          <ModalFooter>
            <div class="tutorial-checkbox">
              <input
                type="checkbox"
                id="tutorial-check"
                v-model="readTutorial"
                :value="readTutorial"
              />
              <label :for="readTutorial">次回以降表示しない</label>
            </div>
            <Button type="secondary" @click="closeTutorial"
              >確認しました</Button
            >
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import TutorialItem from "@/components/molecules/TutorialItem.vue";
import Button from "@/components/atoms/Button.vue";
import useLoadingModalController from "@/mixins/loadingModalController";
import useModalController from "@/mixins/modalController";
import useErrorModalController from "@/mixins/errorModalController";
import analytics from "@/utils/firebaseAnalytics";
import Constants from "@/utils/constants";
import { displayCache } from "@/repository/cache";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";
import { LOCAL_STORAGE_KEY } from "@/repository/localStorage/localStorage";
import { localStorageService } from "@/services";

export default defineComponent({
  components: {
    MainMenu,
    ModalLoading,
    ModalErrorDialog,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    Button,
    TutorialItem,
  },
  name: "Home",
  setup() {
    const { auth } = useGlobalStore();
    const {
      isApper: isLoading,
      loadingMessage: loadingMessage,
      open: openLoadingModal,
      close: closeLoadingModal,
    } = useLoadingModalController(auth.isAuthenticating);
    const {
      isApper: isErrorModalApper,
      errorCode,
      errorMessage,
      open: openErrorModal,
      close: closeErrorModal,
    } = useErrorModalController();
    const {
      isApper: isTutorialModalAppear,
      open: openTutorialModal,
      close: closeTutorialModal,
    } = useModalController();

    const state = reactive({
      readTutorial: false,
    });

    const closeTutorial = () => {
      if (state.readTutorial) localStorageService.setItem(LOCAL_STORAGE_KEY.TUTORIAL, "true");
      closeTutorialModal();
    };

    onMounted(async () => {
      removeDisplayCache();
      try {
        await auth.requestAuth();
        if (
          localStorageService.getItem(LOCAL_STORAGE_KEY.TUTORIAL) == null ||
          localStorageService.getItem(LOCAL_STORAGE_KEY.TUTORIAL) == "false"
        )
          openTutorialModal();
        analytics.screenView(Constants.SCREEN.HOME);
      } catch (e) {
        openErrorModal(e);
      }
    });
    const reload = () => {
      closeErrorModal();
      window.location.reload();
    };
    const removeDisplayCache = () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT);
    };
    return {
      ...toRefs(state),
      ...auth,
      reload,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      removeDisplayCache,
      isTutorialModalAppear,
      openTutorialModal,
      closeTutorialModal,
      closeTutorial,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

header {
  @include flex_between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 50px;
  margin-bottom: 10px;
  height: 40px;
  h2 {
    min-width: 210px;
    color: white;
    line-height: 32px;
    caret-color: transparent;
    img {
      height: 32px;
      margin-right: 20px;
    }
  }
  .nav {
    @include flex_end;
    min-width: 194px;
    margin-right: 16px;
    li {
      width: 40px;
      height: 40px;
      caret-color: transparent;
      a,
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.list-style {
  list-style: none;
  display: flex;
  padding: 0px 20px;
  p {
    line-height: 20px;
  }
  img {
    height: 150px;
    width: 250px;
  }
  // todo: img設定後削除
  .img {
    height: 150px;
    width: 250px;
    border: 2px solid rgb(192, 192, 191);
    border-radius: 3px;
  }
  .tutorial-contents {
    display: inline-block;
    li {
      text-align: center;
      font-weight: bold;
      color: #5c5c5c;
    }
    .tutorial-contents-li {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
      padding: 10px 0;
      span {
        width: 100px;
        text-align: center;
        font-weight: bold;
        color: #5c5c5c;
        height: 75px;
        line-height: 75px;
        padding-right: 10px;
      }
      img {
        height: 75px;
        width: 110px;
      }
      // todo: img設定後削除
      .img {
        height: 75px;
        width: 110px;
        border: 2px solid rgb(192, 192, 191);
        border-radius: 3px;
      }
    }
  }

  .arrow {
    margin: 10px;
    display: block;
    line-height: 470px;
  }
}
.tutorial-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  margin: 1em 0;
  padding-left: 28px;
  cursor: pointer;
  input[type="checkbox"] {
    top: -6px;
    right: -5px;
    outline: none;
    border: none;
    line-height: 20px;
    vertical-align: middle;
    margin: 0;
    background-color: white;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 16px;
      height: 16px;
      border: 2px solid rgb(192, 192, 191);
      border-radius: 3px;
      box-sizing: content-box;
    }
    &:checked {
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 20px;
        height: 20px;
        border: none;
        background-image: url("~@/assets/icon_checked.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  label {
    text-align: left;
    display: block;
    width: 100%;
    padding-left: 10px;
    padding-right: 40px;
    color: black;
  }
}
@include fade_animation;
</style>
