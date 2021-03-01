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
        <div>
          <div v-if="activeAppInformationCd === '01'">
            <p>U MESSE Ver0000000000</p>
          </div>
          <div v-if="activeAppInformationCd === '02'">
            <p>U MESSE利用規約</p>
          </div>
          <div v-if="activeAppInformationCd === '03'">
            <p>アナウンス発注の利用規約</p>
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
  ref,
  onMounted,
  reactive,
  toRefs,
} from "vue";
import * as Common from "@/utils/Common";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import { useRoute } from "vue-router";
import {
  convertDatestringToDateJp,
  convertNumberToTime,
} from "@/utils/FormatDate";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    SubMenu,
    SubMenuItem,
  },
  setup() {
    const route = useRoute();
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

p {
  font-size: 1.5em;
  text-align: center;
}
</style>
