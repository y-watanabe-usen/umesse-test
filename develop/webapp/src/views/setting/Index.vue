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
              <div class="lisence">
                U MESSE<br />
                Copyright © USEN CORPORATION All Rights Reserved.<br />
                <br />
                ReadSpeaker ® WebAPI<br />
                「ReadSpeaker」は
                HOYA株式会社またはHOYAグループ会社が保有する日本国およびその他の国における登録商標です。<br />
                <br />
                <div
                  class="thirdparty"
                  v-for="license in thirdparty"
                  :key="license.name"
                >
                  {{ license.name }} {{ license.version }} {{ license.publisher
                  }}<br />
                  {{ license.description }} {{ license.copyright }}<br />
                  {{ license.repository }}<br />
                  <br />
                </div>
              </div>
            </List>
          </div>
          <div v-if="activeAppInformationCd === '03'">
            <h2>禁止事項</h2>
            <p class="cautions">
              ・当社もしくは第三者の著作権、商標権などの知的財産権その他の権利を侵害する行為、または侵害する恐れのある行為<br />
              ・他人の名誉、社会的信用、プライバシーを侵害する恐れのある音声を送信する行為<br />
              ・法令若しくは公序良俗に違反し、当社若しくは第三者に不利益を与える行為<br />
              ・第三者になりすまして本サービスを利用する行為<br />
              ・第三者が嫌悪感を抱く、もしくはその恐れのある音声を送信する行為<br />
              ・本サービスの利用若しくは運営に支障を与える行為、または与える恐れのある行為<br />
              ・本サービスを通じて提供した文字情報（原稿）を他媒体に転用する行為<br />
              <br />
              ※上記の様な事項に該当する場合、サービス利用停止の措置を取らせていただきます。<br />
              &emsp;詳細内容は、「USEN IoT
              PLATFORMサービス契約約款」をご確認ください。<br />
            </p>
          </div>
          <div v-if="activeAppInformationCd === '04'">
            <h2>チュートリアル</h2>
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
import thirdparty from "@/../public/thirdparty.json";

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
  data() {
    return {
      thirdparty: thirdparty,
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
  }
  .lisence {
    height: 56vh;
  }
  .cautions {
    height: 69vh;
  }
  div.lisence {
    color: rgb(92, 92, 92);
    font-size: 20px;
    line-height: 1.8em;
    margin-top: -10px;
    margin-left: 34px;
    margin-right: 30px;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 56vh;
  }
  div.thirdparty {
    color: rgb(92, 92, 92);
    font-size: 20px;
    line-height: 1.8em;
    margin-top: -10px;
    margin-right: 30px;
  }
}
</style>
