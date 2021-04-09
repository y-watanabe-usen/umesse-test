<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header :clickBack="activeSceneCd ? clickBack : null">
          <template #title>テンプレート選択</template>
        </Header>
      </template>
      <template #contents>
        <ContentsBase>
          <template #sub-menu>
            <SubMenu>
              <SubMenuItem
                v-for="industry in industries"
                :key="industry.cd"
                :isSelected="industry.cd == activeIndustryCd"
                @click="clickIndustry(industry.cd)"
              >
                {{ industry.name }}
              </SubMenuItem>
            </SubMenu>
          </template>
          <template v-if="!activeSceneCd">
            <List>
              <ListItem
                class="scene"
                v-for="scene in scenes"
                :key="scene.cd"
                @click="clickScene(scene.cd)"
              >
                <template #title>
                  <h2>{{ scene.name }}</h2>
                </template>
              </ListItem>
            </List>
          </template>
          <template v-else>
            <List>
              <template #header>
                <ListHeader>
                  <Sort
                    v-model="sort"
                    @update:modelValue="fetchTemplate"
                    :options="
                      sortList.map((v) => {
                        return {
                          title: v.name,
                          value: v.cd,
                        };
                      })
                    "
                  />
                </ListHeader>
              </template>
              <ListItem
                v-for="template in templates"
                :key="template.contentsId"
              >
                <template #title>
                  <h2>{{ template.title }}</h2>
                </template>
                <template #line1>
                  <p>{{ template.manuscript }}</p>
                </template>
                <template #line2>
                  <p>
                    約00:00<!-- TODO: 仮の数値 -->／
                    {{ template.description }}
                  </p>
                </template>
                <template #operations>
                  <Button
                    class="btn-select"
                    @click="toVoiceTemplateDetail(template)"
                  >
                    選択<img src="@/assets/icon_select.svg" />
                  </Button>
                </template>
              </ListItem>
            </List>
          </template>
        </ContentsBase>
      </template>
    </BasicLayout>
    <!-- modal -->
    <transition>
      <ModalErrorDialog
        v-if="isErrorModalApper"
        @close="closeErrorModal"
        :errorCode="errorCode"
        :errorMessage="errorMessage"
      />
    </transition>
    <ModalLoading v-if="isLoading" title="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import Button from "@/components/atoms/Button.vue";
import Sort from "@/components/molecules/Sort.vue";
import SubMenu from "@/components/organisms/SubMenu.vue";
import SubMenuItem from "@/components/molecules/SubMenuItem.vue";
import List from "@/components/organisms/List.vue";
import ListHeader from "@/components/molecules/ListHeader.vue";
import ListItem from "@/components/molecules/ListItem.vue";
import { TemplateItem } from "umesseapi/models";
import * as Common from "@/utils/Common";
import router from "@/router";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import { resourcesService } from "@/services";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { freeCache } from "@/repository/cache";
import analytics from "@/utils/firebaseAnalytics";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import { Scene } from "@/utils/Constants";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
    Button,
    Sort,
    SubMenu,
    SubMenuItem,
    List,
    ListHeader,
    ListItem,
    ModalErrorDialog,
    ModalLoading,
  },
  setup() {
    const sortList = Common.getSort();
    const industries = Common.getTemplateIndustries();
    const {
      isApper: isLoading,
      loadingMessage,
      open: openLoadingModal,
      close: closeLoadingModal,
    } = useLoadingModalController();
    const {
      isApper: isErrorModalApper,
      errorCode,
      errorMessage,
      open: openErrorModal,
      close: closeErrorModal,
    } = useErrorModalController();
    const state = reactive({
      sort: 1,
      activeIndustryCd: "10",
      templates: [] as TemplateItem[],
      isLoading: false,
      scenes: [] as Scene[],
      activeSceneCd: null as string | null,
    });

    const clickIndustry = (industryCd: string) => {
      if (state.activeIndustryCd !== industryCd) {
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
        fetchScene();
      }
    };

    const fetchTemplate = async () => {
      try {
        openLoadingModal();
        const response = await resourcesService.fetchTemplate(
          state.activeIndustryCd,
          state.sort
        );
        state.templates = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };

    const toVoiceTemplateDetail = (templateItem: TemplateItem) => {
      // TODO: キャッシュでいいのか
      freeCache.set("voice/template", templateItem);
      analytics.selectTemplate(templateItem.id);
      router.push({ name: "VoiceTemplateDetail" });
    };
    onMounted(async () => {
      await fetchTemplate();
    });

    const fetchScene = () => {
      state.scenes = Common.getIndustryScenes(state.activeIndustryCd);
      state.templates = [];
    };
    const clickScene = (sceneCd: string) => {
      state.activeSceneCd = sceneCd;
      fetchTemplate();
    };
    const clickBack = () => {
      state.activeSceneCd = null;
      state.templates = [];
    };
    onMounted(async () => {
      fetchScene();
    });

    return {
      ...toRefs(state),
      sortList,
      industries,
      clickIndustry,
      toVoiceTemplateDetail,
      fetchTemplate,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
      clickScene,
      clickBack,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
