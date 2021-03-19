<template>
  <div>
    <BasicLayout>
      <template #header>
        <Header>
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
            <ListItem v-for="freeItem in freeItems" :key="freeItem.contentsId">
              <template #title>
                <h2>{{ freeItem.title }}</h2>
              </template>
              <template #line1>
                <p>{{ freeItem.manuscript }}</p>
              </template>
              <template #line2>
                <p>
                  <span class="duration">00:00</span>
                  <span class="start"
                    >放送開始日{{
                      convertDatestringToDateJp(freeItem.timestamp)
                    }}</span
                  >
                  <span class="end"
                    >有効期限{{
                      convertDatestringToDateJp(freeItem.timestamp)
                    }}</span
                  >
                </p>
              </template>
              <template #operations>
                <Button
                  class="btn-document"
                  @click="
                    setManuscriptAndOpenDocumentModal(freeItem.manuscript)
                  "
                >
                  <img src="@/assets/icon_document.svg" />原稿
                </Button>
                <Button
                  class="btn-select"
                  @click="selectFreeTemplate(freeItem.manuscript)"
                >
                  選択<img src="@/assets/icon_select.svg" />
                </Button>
              </template>
            </ListItem>
          </List>
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
            {{ manuscript }}
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
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import ModalErrorDialog from "@/components/organisms/ModalErrorDialog.vue";
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import { FreeItem } from "umesseapi/models/free-item";
import * as Common from "@/utils/Common";
import { convertDatestringToDateJp } from "@/utils/FormatDate";
import router from "@/router";
import { UMesseError } from "../../../models/UMesseError";
import { resourcesService } from "@/services";
import ModalLoading from "@/components/organisms/ModalLoading.vue";
import { freeCache } from "@/repository/cache";

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
    const sortList = Common.getSort();
    const industries = Common.getBgmIndustries();
    const state = reactive({
      sort: 1,
      activeIndustryCd: "01",
      freeItems: [] as FreeItem[],
      manuscript: "",
      isDocumentModalAppear: false,
      isErrorModalApper: false,
      errorCode: "",
      errorMessage: "",
      isLoading: false,
    });

    const clickIndustry = (industryCd: string) => {
      if (state.activeIndustryCd !== industryCd) {
        state.activeIndustryCd = industryCd;
        fetchFreeTemplate();
      }
    };

    const fetchFreeTemplate = async () => {
      try {
        openModalLoading();
        const response = await resourcesService.fetchFree(
          state.activeIndustryCd,
          state.sort
        );
        state.freeItems = response;
      } catch (e) {
        openErrorModal(e);
      } finally {
        closeModalLoading();
      }
    };

    const setManuscript = (manuscript: string) => {
      state.manuscript = manuscript;
    };

    const selectFreeTemplate = (manuscript: string) => {
      // TODO: キャッシュに入れるでいいのか
      const cacheKey = "voice/free/selectTemplate";
      freeCache.set(cacheKey, manuscript);
      router.push({ name: "VoiceFree" });
    };

    const openDocumentModal = () => {
      state.isDocumentModalAppear = true;
    };
    const closeDocumentModal = () => {
      state.isDocumentModalAppear = false;
    };

    const setManuscriptAndOpenDocumentModal = (manuscript: string) => {
      setManuscript(manuscript);
      openDocumentModal();
    };

    onMounted(async () => {
      await fetchFreeTemplate();
    });

    const closeErrorModal = () => {
      state.isErrorModalApper = false;
    };

    const openErrorModal = (e: UMesseError) => {
      state.errorCode = e.errorCode;
      state.errorMessage = e.message;
      state.isErrorModalApper = true;
    };

    const openModalLoading = () => {
      state.isLoading = true;
    };

    const closeModalLoading = () => {
      state.isLoading = false;
    };
    return {
      ...toRefs(state),
      sortList,
      industries,
      clickIndustry,
      setManuscript,
      selectFreeTemplate,
      openDocumentModal,
      closeDocumentModal,
      setManuscriptAndOpenDocumentModal,
      convertDatestringToDateJp,
      closeErrorModal,
      fetchFreeTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
