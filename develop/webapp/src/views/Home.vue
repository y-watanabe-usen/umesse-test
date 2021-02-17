<template>
  <header>
    <h2>
      <img src="@/assets/logo_umesse.svg" />
      <span v-if="authenticating">Loading...</span>
      <span v-else> {{ token }} {{ error }} </span>
    </h2>
    <p class="title">
      <router-link :to="{ name: 'Cm' }">店内アナウンスを作成する</router-link>
    </p>
    <ul class="nav">
      <li>
        <router-link to="#" @click="openModal">
          <img src="@/assets/icon_setting.svg" />
        </router-link>
      </li>
    </ul>
  </header>
  <MainMenu />
  <!-- modal -->
  <transition>
    <ModalDialog v-if="isModalAppear" @close="closeModal">
      <template #header>
        <ModalHeader title="setting" @close="closeModal" />
      </template>
      <template #contents>
        <div class="modal-contents custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            v-model="isDarkTheme"
            @change="toggleDarkTheme()"
          />
          <label class="custom-control-label" for="customSwitch1"
            >switch dark mode</label
          >
        </div>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";

export default defineComponent({
  components: {
    MainMenu,
    ModalDialog,
    ModalHeader,
  },
  name: "Home",
  setup() {
    const { auth, base } = useGlobalStore();
    const state = reactive({
      isModalAppear: false,
    });
    const openModal = () => {
      state.isModalAppear = true;
    };
    const closeModal = () => {
      state.isModalAppear = false;
    };
    onMounted(() => {
      auth.requestAuth();
    });
    return {
      ...toRefs(state),
      openModal,
      closeModal,
      ...auth,
      ...base,
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
    img {
      height: 32px;
      width: 184px;
      margin-right: 20px;
    }
  }
  .title {
    a {
      color: white;
      font-size: 23px;
      font-weight: $font_weight_bold;
      line-height: 40px;
    }
  }
  .nav {
    @include flex_end;
    min-width: 194px;
    margin-right: 16px;
    li {
      width: 40px;
      height: 40px;
      a,
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.modal-contents {
  padding: 30px;
}
@include fade_animation;
</style>
