<template>
  <div @click="closeAllDropdownMenu">
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
                    @update:modelValue="fetchFreeTemplate"
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
                v-for="freeItem in freeItems"
                :key="freeItem.contentsId"
              >
                <template #title>
                  <h2>{{ freeItem.title }}</h2>
                </template>
                <template #line1>
                  <p>{{ freeItem.description }}</p>
                </template>
                <template #line2>
                  <p>
                    <span v-if="freeItem.seconds" class="duration">{{
                      convertNumberToTime(freeItem.seconds)
                    }}</span>
                    <span v-if="freeItem.timestamp" class="start">{{
                      convertDatestringToDate(freeItem.timestamp)
                    }}</span>
                  </p>
                </template>
                <template #operations>
                  <Button
                    v-if="freeItem.manuscript"
                    class="btn-document"
                    @click="
                      setManuscriptAndOpenDocumentModal(freeItem, freeItem.id)
                    "
                  >
                    <img src="@/assets/icon_document.svg" />原稿
                  </Button>
                  <Button
                    class="btn-select"
                    @click="selectFreeTemplate(freeItem)"
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
            {{ selectedFreeItem?.manuscript }}
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
import * as common from "@/utils/common";
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
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import { FreeItem } from "umesseapi/models";
import { useGlobalStore } from "@/store";
import router from "@/router";
import {
  convertNumberToTime,
  convertDatestringToDate,
} from "@/utils/formatDate";
import { resourcesService } from "@/services";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { displayCache } from "@/repository/cache";
import analytics from "@/utils/firebaseAnalytics";
import Constants, { Scene } from "@/utils/constants";
import useModalController from "@/mixins/modalController";
import useLoadingModalController from "@/mixins/loadingModalController";
import useErrorModalController from "@/mixins/errorModalController";
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
    TextDialogContents,
    ModalLoading,
  },
  setup() {
    const { auth } = useGlobalStore();
    const authToken = <string>auth.getToken();
    const sortList = common.getSort();
    const industries = common.getTemplateIndustries();
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
      sort: 1,
      activeIndustryCd: "10",
      activeSceneCd: null as string | null,
      freeItems: [] as FreeItem[],
      scenes: [] as Scene[],
      selectedFreeItem: null as FreeItem | null,
      manuscript: "",
      dropdownfreeItemId: "",
      title: "",
      description: "",
    });

    const clickIndustry = (industryCd: string) => {
      if (
        state.activeIndustryCd !== industryCd ||
        (state.activeIndustryCd === industryCd && state.freeItems)
      ) {
        analytics.selectIndustry(industryCd, Constants.SCREEN.SELECT_TEMPLATE);
        state.activeIndustryCd = industryCd;
        state.activeSceneCd = null;
        fetchScene();
      }
    };

    const clickScene = (sceneCd: string) => {
      displayCache.set<string>(
        DISPLAY_CACHE_KEY.VOICE_FREE_SELECT_TEMPLATE_SELECT_SCENE,
        sceneCd
      );
      analytics.selectScene(sceneCd, Constants.SCREEN.SELECT_TEMPLATE);
      state.activeSceneCd = sceneCd;
      fetchFreeTemplate();
    };

    const clickBack = () => {
      state.activeSceneCd = null;
      state.freeItems = [];
    };

    const fetchScene = () => {
      state.scenes = common.getIndustryScenes(state.activeIndustryCd);
      state.freeItems = [];
    };

    const fetchFreeTemplate = async () => {
      if (!state.activeSceneCd) return;
      try {
        openLoadingModal();
        const response = await resourcesService.fetchNarration(
          authToken,
          state.activeIndustryCd,
          state.activeSceneCd,
          state.sort
        );
        state.freeItems = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeLoadingModal();
      }
    };

    const setManuscript = (freeItem: FreeItem) => {
      state.selectedFreeItem = freeItem;
    };

    const selectFreeTemplate = (free: FreeItem) => {
      displayCache.set<string>(
        DISPLAY_CACHE_KEY.VOICE_FREE_INDEX_SELECT_TEXT,
        free.manuscript
      );
      analytics.selectFree(free.id);
      router.push({ name: "VoiceFree" });
    };

    const setManuscriptAndOpenDocumentModal = (
      freeItem: FreeItem,
      freeId: string
    ) => {
      setManuscript(freeItem);
      closeAllDropdownMenu();
      analytics.pressButtonManuscript(freeId, Constants.SCREEN.SELECT_TEMPLATE);
      openDocumentModal();
    };

    onMounted(async () => {
      analytics.screenView(Constants.SCREEN.SELECT_TEMPLATE);
      await fetchFreeTemplate();
    });

    const closeAllDropdownMenu = () => {
      state.dropdownfreeItemId = "";
    };

    onMounted(async () => {
      fetchScene();
    });

    return {
      ...toRefs(state),
      sortList,
      industries,
      clickIndustry,
      clickScene,
      selectFreeTemplate,
      setManuscriptAndOpenDocumentModal,
      convertDatestringToDate,
      convertNumberToTime,
      fetchFreeTemplate,
      clickBack,
      closeAllDropdownMenu,
      isDocumentModalAppear,
      openDocumentModal,
      closeDocumentModal,
      isLoading,
      loadingMessage,
      openLoadingModal,
      closeLoadingModal,
      isErrorModalApper,
      errorCode,
      errorMessage,
      openErrorModal,
      closeErrorModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
