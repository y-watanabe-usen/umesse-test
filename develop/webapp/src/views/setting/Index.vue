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
            <h2>U MESSE Ver{{ version }}</h2>
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
          <div v-if="activeAppInformationCd === '04'">
            <h2>お客様ID：{{ token }}</h2>
            <h4>contractStatusName:{{ authUser.contractStatusName }}</h4>
            <h4>contractStatusCd:{{ authUser.contractStatusCd }}</h4>
            <h4>customerGroupName: {{ authUser.customerGroupName }}</h4>
            <h4>contractCd: {{ authUser.contractCd }}</h4>
            <h4>customerNameKana:{{ authUser.customerNameKana }}</h4>
            <h4>unisCustomerCd:{{ authUser.unisCustomerCd }}</h4>
            <h4>serviceCd:{{ authUser.serviceCd }}</h4>
            <h4>renewalDate:{{ authUser.renewalDate }}</h4>
            <h4>serviceName:{{ authUser.serviceName }}</h4>
            <h4>customerGroupCd:{{ authUser.customerGroupCd }}</h4>
            <h4>customerName:{{ authUser.customerName }}</h4>
            <h4>createDate:{{ authUser.createDate }}</h4>
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
import { useGlobalStore } from "@/store";
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
    const { auth } = useGlobalStore();
    const authUser = auth.getUserInfo();

    const state = reactive({
      appInformations: computed(() => Common.getSettingAppInformations()),
      version: computed(() => Common.getVersion()),
      activeAppInformationCd: "01",
      isDocumentModalAppear: false,
      isPlayModalAppear: false,
    });

    const clickAppInformation = (appInformationCd: string) => {
      state.activeAppInformationCd = appInformationCd;
    };

    return {
      ...toRefs(state),
      ...auth,
      stop,
      clickAppInformation,
      convertDatestringToDateJp,
      convertNumberToTime,
      authUser,
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
  caret-color: transparent;
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
