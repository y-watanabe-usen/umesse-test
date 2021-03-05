<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>アプリ情報</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <template #sub-menu>
          <SubMenu>
            <SubMenuItem
              v-for="appInformation in appInformations"
              :key="appInformation.cd"
              :isSelected="appInformation.cd == activeAppInformationCd"
              @click="clickAppInformation(appInformation.cd)"
            >
              {{ appInformation.name }}
            </SubMenuItem>
          </SubMenu>
        </template>
        <div class="content">
          <div v-if="activeAppInformationCd === '01'" class="version">
            <h2>U MESSE Ver0000000000</h2>
          </div>
          <div v-if="activeAppInformationCd === '02'">
            <h2>U MESSE利用規約</h2>
            <p>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br />
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br />
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
          <div v-if="activeAppInformationCd === '03'">
            <h2>アナウンス発注の利用規約</h2>
            <p>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br />
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br />
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "vue";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/FormatDate";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    SubMenu,
    SubMenuItem,
  },
  setup() {
    const state = reactive({
      appInformations: computed(() => Common.getSettingAppInformations()),
      activeAppInformationCd: "01",
      isDocumentModalAppear: false,
      isPlayModalAppear: false,
    });

    const clickAppInformation = (appInformationCd: string) => {
      state.activeAppInformationCd = appInformationCd;
    };

    return {
      ...toRefs(state),
      stop,
      clickAppInformation,
      convertDatestringToDateJp,
      convertNumberToTime,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;

.content {
  overflow: hidden;
  height: 100%;
  h2 {
    font-size: 20px;
    font-weight: $font_weight_bold;
    text-align: center;
    margin: 34px;
  }
  p {
    font-size: 20px;
    line-height: 1.6em;
    margin-top: 76px;
    margin-left: 75px;
    margin-right: 75px;
  }
  .version {
    @include flex_center;
    height: 90%;
  }
}
</style>
