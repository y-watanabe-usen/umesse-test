<template>
  <header>
    <h2>
      <img src="@/assets/logo_umesse.svg" />
      <span v-if="authenticating">Loading...</span>
      <span v-else> {{ token }} {{ error }} </span>
    </h2>
    <p class="title"><router-link :to="{ name: 'Cm' }">店内アナウンスを作成する</router-link></p>
    <ul class="nav">
      <li>
        <router-link to="#" data-toggle="modal" data-target="#modalSetting">
          <img src="@/assets/icon_setting.svg" />
        </router-link>
      </li>
    </ul>
  </header>
  <MainMenu />
  <!-- modal -->
  <div
    class="modal fade"
    id="modalSetting"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalSetting"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">setting</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="custom-control custom-switch">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue"

export default defineComponent({
  components: {
    MainMenu,
  },
  name: "Home",
  setup() {
    const { auth, base } = useGlobalStore();
    onMounted(() => {
      auth.requestAuth();
    });
    return {
      ...auth,
      ...base,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

header {
  @include flex_between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 50px;
  margin-bottom: 46px;
  height: 40px;
  h2 {
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
    margin-right: 16px;
    li {
      width: 40px;
      height: 40px;
      a, img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
