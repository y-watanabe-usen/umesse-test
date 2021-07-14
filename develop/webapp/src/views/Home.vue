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
      <ModalTutorialDialog
        v-if="isTutorialModalAppear"
        :closeModal="closeTutorial"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import ModalTutorialDialog from "@/components/organisms/ModalTutorialDialog.vue";
import useLoadingModalController from "@/mixins/loadingModalController";
import useModalController from "@/mixins/modalController";
import useErrorModalController from "@/mixins/errorModalController";
import analytics from "@/utils/firebaseAnalytics";
import Constants from "@/utils/constants";
import { displayCache } from "@/repository/cache";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";
import { userService } from "@/services";

export default defineComponent({
  components: {
    MainMenu,
    ModalLoading,
    ModalErrorDialog,
    ModalTutorialDialog,
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

    const state = reactive({});

    const closeTutorial = (isCheck = false, confirm = true) => {
      if (confirm) {
        if (isCheck) userService.dontShowForeverTutorial();
      }
      userService.showTutorial();
      closeTutorialModal();
    };

    onMounted(async () => {
      removeDisplayCache();
      try {
        await auth.requestAuth();
        if (isShowTutorial()) openTutorialModal();
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
    const isShowTutorial = () => {
      if (userService.isAlreadyShowTutorial()) {
        return false;
      }
      if (userService.getDontShowForeverTutorial()) {
        return false;
      }

      return true;
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
@include fade_animation;
</style>
