<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header :clickBack="clickBack">
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
                :isSelected="template.id === selectedTemplate?.id"
                @click="selectTemplate(template)"
              >
                <template #title>
                  <h2>{{ template.title }}</h2>
                </template>
                <template #line1>
                  <p>{{ template.description }}</p>
                </template>
                <template #line2>
                  <p>
                    <span v-if="template.timestamp" class="start">{{
                      convertDatestringToDate(template.timestamp)
                    }}</span>
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
import * as common from "@/utils/common";
import router from "@/router";
import { convertDatestringToDate } from "@/utils/formatDate";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import { resourcesService } from "@/services";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { displayCache } from "@/repository/cache";
import analytics from "@/utils/firebaseAnalytics";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
import Constants, { Scene } from "@/utils/constants";
import { DISPLAY_CACHE_KEY } from "@/repository/cache/displayCache";

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
    const sortList = common.getSort();
    const industries = common.getTemplateIndustries();
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
      sort:
        displayCache.get<number>(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT) ??
        1,
      activeIndustryCd:
        displayCache.get<string>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD
        ) ?? "10",
      templates:
        displayCache.get<TemplateItem[]>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES
        ) ?? [],
      scenes:
        displayCache.get<Scene[]>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES
        ) ?? [],
      activeSceneCd:
        displayCache.get<string | undefined>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD
        ) ?? null,
      selectedTemplate: null as TemplateItem | null,
    });

    const clickIndustry = (industryCd: string) => {
      if (state.activeIndustryCd !== industryCd) {
        analytics.selectIndustry(industryCd, Constants.SCREEN.VOICE_TEMPLATE);
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
        state.selectedTemplate = null;
        fetchScene();
      }
    };

    const fetchTemplate = async () => {
      if (!state.activeSceneCd) return;
      try {
        openLoadingModal();
        const response = await resourcesService.fetchTemplate(
          state.activeIndustryCd,
          state.activeSceneCd,
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
      analytics.selectTemplate(templateItem.id);
      setDisplayCache(templateItem);
      router.push({ name: "VoiceTemplateDetail" });
    };

    const setDisplayCache = (templateItem: TemplateItem) => {
      displayCache.set(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD,
        state.activeIndustryCd
      );
      displayCache.set(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD,
        state.activeSceneCd
      );
      displayCache.set(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES,
        state.templates
      );
      displayCache.set(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES,
        state.scenes
      );
      displayCache.set(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT, state.sort);
      displayCache.set<TemplateItem>(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SELECT_TEMPLATE,
        templateItem
      );
      displayCache.set(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_NARRATION_SCROLL_POSITION,
        document.getElementById("list-scroll")?.scrollTop
      );
    };
    const removeDisplayCache = () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT);
      displayCache.remove(
        DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_NARRATION_SCROLL_POSITION
      );
    };

    onMounted(async () => {
      analytics.screenView(Constants.SCREEN.VOICE_TEMPLATE);
      if (state.templates.length == 0) {
        fetchScene();
        await fetchTemplate();
      }
      const position =
        displayCache.get<number>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_NARRATION_SCROLL_POSITION
        ) ?? 0;
      const list = document.getElementById("list-scroll");
      if (list != null || list != undefined) {
        list.style.scrollBehavior = "auto";
        list.scrollTo(0, position);
        list.style.scrollBehavior = "smooth";
      }
    });

    const fetchScene = () => {
      state.scenes = common.getIndustryScenes(state.activeIndustryCd);
      state.templates = [];
    };
    const clickScene = (sceneCd: string) => {
      analytics.selectScene(sceneCd, Constants.SCREEN.VOICE_TEMPLATE);
      state.activeSceneCd = sceneCd;
      fetchTemplate();
    };
    const clickBack = () => {
      if (state.activeSceneCd) {
        state.activeSceneCd = null;
        state.templates = [];
      } else {
        removeDisplayCache();
        router.go(-1);
      }
    };

    const selectTemplate = (template: TemplateItem) => {
      state.selectedTemplate = template;
    };

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
      convertDatestringToDate,
      selectTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
