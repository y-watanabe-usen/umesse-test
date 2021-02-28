<template>
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
              v-for="freeTemplateIndustry in freeTemplateIndustries"
              :key="freeTemplateIndustry.cd"
              :isSelected="freeTemplateIndustry.cd == activeFreeTemplateIndustryCd"
              @click="clickFreeTemplateIndustry(freeTemplateIndustry.cd)"
            >
              {{ freeTemplateIndustry.name }}
            </SubMenuItem>
          </SubMenu>
        </template>
        <List>
          <template #header>
            <ListHeader>
              <Sort
                :options="
                  sorts.map((sort) => {
                    return { title: sort, value: sort };
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
                <span class="start">放送開始日{{ convertDatestringToDateJp(freeItem.timestamp) }}</span>
                <span class="end">有効期限{{ convertDatestringToDateJp(freeItem.timestamp) }}</span>
              </p>
            </template>
            <template #operations>
              <Button
                type="rectangle"
                class="btn-document"
                @click="setManuscriptAndOpenDocumentModal(freeItem.manuscript)"
              >
                <img src="@/assets/icon_document.svg" />原稿
              </Button>
              <Button
                type="rectangle"
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
        <ModalFooter :noBorder="true">
          <Button type="rectangle" @click="closeDocumentModal">閉じる</Button>
        </ModalFooter>
      </template>
    </ModalDialog>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import * as UMesseApi from "umesseapi";
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
import TextDialogContents from "@/components/molecules/TextDialogContents.vue";
import { config } from "@/utils/UMesseApiConfiguration";
import { FreeItem } from "umesseapi/models/free-item";
import * as Common from "@/utils/Common";
import { useGlobalStore } from "@/store";
import { convertDatestringToDateJp } from "@/utils/FormatDate";
import router from "@/router";

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
    TextDialogContents,
  },
  setup() {
    const api = new UMesseApi.ResourcesApi(config);
    const { base } = useGlobalStore();
    const state = reactive({
      freeTemplateIndustries: computed(() => Common.getBgmIndustries()),
      activeFreeTemplateIndustryCd: "01",
      sorts: ["名前順", "作成日順", "更新日順"],
      freeItems: [] as FreeItem[],
      manuscript: "",
      isDocumentModalAppear: false,
    });

    const clickFreeTemplateIndustry = (freeTemplateIndustryCd: string) => {
      state.activeFreeTemplateIndustryCd = freeTemplateIndustryCd;
      fetchFreeTemplate();
    };

    const fetchFreeTemplate = async () => {
      const response = await api.listFree(state.activeFreeTemplateIndustryCd);
      state.freeItems = response.data;
    };

    const setManuscript = (manuscript: string) => {
      state.manuscript = manuscript;
    };

    const selectFreeTemplate = (manuscript: string) => {
      // TODO: キャッシュに入れるでいいのか
      const cacheKey = "voice/free/selectTemplate";
      base.cache.set(cacheKey, manuscript);
      router.push({ name: 'VoiceFree' });
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
    }

    onMounted(async () => {
      await fetchFreeTemplate();
    });

    return {
      ...toRefs(state),
      clickFreeTemplateIndustry,
      setManuscript,
      selectFreeTemplate,
      openDocumentModal,
      closeDocumentModal,
      setManuscriptAndOpenDocumentModal,
      convertDatestringToDateJp,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
