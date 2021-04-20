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
                    v-if="template.manuscript"
                    class="btn-document"
                    @click="selectTemplateAndOpenDocumentModal(template)"
                  >
                    <img src="@/assets/icon_document.svg" />原稿
                  </Button>
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
      <ModalDialog v-if="isDocumentModalAppear" @close="closeDocumentModal">
        <template #header>
          <ModalHeader title="原稿" @close="closeDocumentModal" />
        </template>
        <template #contents>
          <TextDialogContents>
            {{ selectedTemplate?.manuscript }}
          </TextDialogContents>
        </template>
        <template #footer>
          <ModalFooter>
            <Button type="secondary" @click="closeDocumentModal">閉じる</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
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
import { convertDatestringToDate } from "@/utils/FormatDate";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import { resourcesService } from "@/services";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import { freeCache, displayCache } from "@/repository/cache";
import analytics from "@/utils/firebaseAnalytics";
import useLoadingModalController from "@/mixins/loadingModalController";
import useModalController from "@/mixins/modalController";
import useErrorModalController from "@/mixins/errorModalController";
import Constants, { Scene } from "@/utils/Constants";
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
    ModalDialog,
    ModalHeader,
    ModalFooter,
    ModalErrorDialog,
    ModalLoading,
    TextDialogContents,
  },
  setup() {
    const sortList = Common.getSort();
    const industries = Common.getTemplateIndustries();
    const {
      isApper: isDocumentModalAppear,
      open: openDocumentModal,
      close: closeDocumentModal,
    } = useModalController();
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
        displayCache.get<string | null>(
          DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD
        ) ?? null,
      selectedTemplate: null as TemplateItem | null,
    });

    const clickIndustry = (industryCd: string) => {
      if (state.activeIndustryCd !== industryCd) {
        analytics.selectIndustry(industryCd, Constants.SCREEN.VOICE_TEMPLATE);
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
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
      // TODO: キャッシュでいいのか
      freeCache.set("voice/template", templateItem);
      analytics.selectTemplate(templateItem.id);
      setDisplayCache();
      router.push({ name: "VoiceTemplateDetail" });
    };

    const setDisplayCache = () => {
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
    };
    const removeDisplayCache = () => {
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_INDUSTRY_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENE_CD);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_TEMPLATES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SCENES);
      displayCache.remove(DISPLAY_CACHE_KEY.VOICE_TEMPLATE_INDEX_SORT);
    };

    onMounted(async () => {
      analytics.screenView(Constants.SCREEN.VOICE_TEMPLATE);
      if (state.templates.length == 0) {
        fetchScene();
        await fetchTemplate();
      }
    });

    const fetchScene = () => {
      state.scenes = Common.getIndustryScenes(state.activeIndustryCd);
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

    const selectTemplateAndOpenDocumentModal = (template: TemplateItem) => {
      selectTemplate(template);
      analytics.pressButtonManuscript(
        template.id,
        Constants.SCREEN.VOICE_TEMPLATE
      );
      openDocumentModal();
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
      isDocumentModalAppear,
      openDocumentModal,
      closeDocumentModal,
      clickScene,
      clickBack,
      convertDatestringToDate,
      selectTemplate,
      selectTemplateAndOpenDocumentModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
