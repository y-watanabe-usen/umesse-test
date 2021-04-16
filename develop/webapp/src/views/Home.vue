<template>
  <div>
    <header>
      <h2>
        <img src="@/assets/logo_umesse.png" />
      </h2>
      <p class="title">店内CMを作成する</p>
      <ul class="nav">
        <li>
          <router-link :to="{ name: 'Setting' }">
            <img src="@/assets/icon_setting.svg" />
          </router-link>
        </li>
      </ul>
    </header>
    <MainMenu />
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="reload"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import analytics from "@/utils/firebaseAnalytics";
import Constants from "@/utils/Constants";

export default defineComponent({
  components: {
    MainMenu,
    ModalLoading,
    ModalErrorDialog,
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

    const state = reactive({});
    const handleBackButton = () => {
      history.go(1);
    };
    onMounted(async () => {
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", handleBackButton);
      try {
        await auth.requestAuth();
        analytics.screenView(Constants.SCREEN.HOME);
      } catch (e) {
        openErrorModal(e);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("popstate", handleBackButton);
    });
    const reload = () => {
      closeErrorModal();
      window.location.reload();
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
  margin-bottom: 46px;
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
  .title {
    color: white;
    font-size: 23px;
    font-weight: $font_weight_bold;
    line-height: 40px;
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
