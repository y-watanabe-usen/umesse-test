<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>情報</template>
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
          <div v-if="activeAppInformationCd === '01'">
            <List>
              <SettingListItem>
                <template #title>店名</template>
                <template #description>{{ authUser.customerName }}</template>
              </SettingListItem>
              <SettingListItem>
                <template #title>UNIS顧客CD</template>
                <template #description>{{ authUser.unisCustomerCd }}</template>
              </SettingListItem>
              <SettingListItem>
                <template #title>サービスCD</template>
                <template #description>{{ authUser.serviceCd }}</template>
              </SettingListItem>
              <SettingListItem>
                <template #title>サービス名</template>
                <template #description>{{ authUser.serviceName }}</template>
              </SettingListItem>
            </List>
          </div>
          <div v-if="activeAppInformationCd === '02'" class="version">
            <List>
              <SettingListItem>
                <template #title>バージョン</template>
                <template #description>{{ version }}</template>
              </SettingListItem>
              <h2>ライセンス</h2>
              <p class="lisence">
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              </p>
            </List>
          </div>
          <div v-if="activeAppInformationCd === '03'">
            <p class="cautions">
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br />
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            </p>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from "vue";
import { useGlobalStore } from "@/store";
import * as common from "@/utils/common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import SettingListItem from "@/components/molecules/SettingListItem.vue";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/formatDate";
import analytics from "@/utils/firebaseAnalytics";
import Constants from "@/utils/constants";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    SubMenu,
    SubMenuItem,
    List,
    SettingListItem,
  },
  setup() {
    const { auth } = useGlobalStore();
    const authUser = auth.getUserInfo();

    const state = reactive({
      appInformations: computed(() => common.getSettingAppInformations()),
      version: computed(() => common.getVersion()),
      activeAppInformationCd: "01",
      isDocumentModalAppear: false,
      isPlayModalAppear: false,
    });

    const clickAppInformation = (appInformationCd: string) => {
      state.activeAppInformationCd = appInformationCd;
    };

    onMounted(() => {
      analytics.screenView(Constants.SCREEN.SETTINGS);
    });

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
    color: black;
    font-size: 20px;
    font-weight: $font_weight_bold;
    margin-left: 34px;
    line-height: 80px;
  }
  p {
    color: rgb(92, 92, 92);
    font-size: 20px;
    line-height: 1.8em;
    margin-top: -10px;
    margin-left: 34px;
    margin-right: 30px;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &:first-child {
      margin-top: 40px;
    }
  }
  .lisence {
    height: 56vh;
  }
  .cautions {
    height: 69vh;
  }
}
</style>
