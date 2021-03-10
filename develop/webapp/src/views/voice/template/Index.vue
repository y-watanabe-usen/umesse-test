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
            <ListItem v-for="template in templates" :key="template.contentsId">
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
                  type="rectangle"
                  class="btn-select"
                  @click="toVoiceTemplateDetail(template)"
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
      <ModalDialog v-if="isError" @close="closeErrorModal">
        <template #header>
          <ModalHeader title="エラー" @close="closeErrorModal" />
        </template>
        <template #contents>
          <MessageDialogContents>
            {{ errorCode }} <br />
            {{ errorMessge }}
          </MessageDialogContents>
        </template>
        <template #footer>
          <ModalFooter :noBorder="true">
            <Button type="rectangle" @click="closeErrorModal">閉じる</Button>
          </ModalFooter>
        </template>
      </ModalDialog>
    </transition>
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
import UMesseService from "@/services/UMesseService";
import router from "@/router";
import UMesseCache from "@/repository/UMesseCache";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";

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
  },
  setup() {
    const sortList = Common.getSort();
    const industries = Common.getBgmIndustries();
    const state = reactive({
      sort: 1,
      activeIndustryCd: "01",
      templates: [] as TemplateItem[],
      isError: false,
      errorCode: "",
      errorMessge: "",
    });

    const clickIndustry = (industryCd: string) => {
      state.activeIndustryCd = industryCd;
      fetchTemplate();
    };

    const fetchTemplate = async () => {
      try {
        const response = await UMesseService.resourcesService.fetchTemplate(
          state.activeIndustryCd,
          state.sort
        );
        state.templates = response;
      } catch (e) {
        state.errorCode = e.errorCode;
        state.errorMessge = e.message;
        state.isError = true;
      }
    };

    const toVoiceTemplateDetail = (templateItem: TemplateItem) => {
      // TODO: キャッシュでいいのか
      UMesseCache.freeCache.set("voice/template", templateItem);
      router.push({ name: "VoiceTemplateDetail" });
    };
    onMounted(async () => {
      await fetchTemplate();
    });

    const closeErrorModal = () => {
      state.isError = false;
    };

    return {
      ...toRefs(state),
      sortList,
      industries,
      clickIndustry,
      toVoiceTemplateDetail,
      closeErrorModal,
      fetchTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
@include fade_animation;
</style>
