<template>
  <div>
    <header>
      <h2>
        <img src="@/assets/logo_umesse.svg" />
        <span v-if="authenticating">Loading...</span>
        <span v-else> {{ token }} {{ error }} </span>
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
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { defineComponent, onMounted } from "vue";
import MainMenu from "@/components/organisms/MainMenu.vue";

export default defineComponent({
  components: {
    MainMenu,
  },
  name: "Home",
  setup() {
    const { auth } = useGlobalStore();
    onMounted(() => {
      auth.requestAuth();
    });
    return {
      ...auth,
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
