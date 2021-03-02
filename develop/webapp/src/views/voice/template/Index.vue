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
              v-for="templateIndustry in templateIndustries"
              :key="templateIndustry.cd"
              :isSelected="templateIndustry.cd == activeTemplateIndustryCd"
              @click="clickTemplateIndustry(templateIndustry.cd)"
            >
              {{ templateIndustry.name }}
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
          <ListItem v-for="template in templates" :key="template.contentsId">
            <template #title>
              <h2>{{ template.title }}</h2>
            </template>
            <template #line1>
              <p>{{ template.manuscript }}</p>
            </template>
            <template #line2>
              <p>約00:00<!-- TODO: 仮の数値 --></p>
            </template>
            <template #operations>
              <Button
                type="rectangle"
                class="btn-select"
                @click="$router.push({ name: 'VoiceTemplateDetail' })"
              >
                選択<img src="@/assets/icon_select.svg" />
              </Button>
            </template>
          </ListItem>
        </List>
      </ContentsBase>
    </template>
  </BasicLayout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
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
import UMesseApi from "@/repository/UMesseApi";
import UMesseService from "@/services/UMesseService";

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
  },
  setup() {
    const state = reactive({
      templateIndustries: computed(() => Common.getBgmIndustries()),
      activeTemplateIndustryCd: "01",
      sorts: ["名前順", "作成日順", "更新日順"],
      templates: [] as TemplateItem[],
    });

    const clickTemplateIndustry = (templateIndustryCd: string) => {
      state.activeTemplateIndustryCd = templateIndustryCd;
      fetchTemplate();
    };

    const fetchTemplate = async () => {
      const response = await UMesseService.resourcesService.fetchTemplate(
        state.activeTemplateIndustryCd
      );
      state.templates = response;
    };

    onMounted(async () => {
      await fetchTemplate();
    });

    return {
      ...toRefs(state),
      clickTemplateIndustry,
    };
  },
});
</script>
