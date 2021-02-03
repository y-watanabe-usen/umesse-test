<template>
  <BasicLayout>
    <template #header>
      <Header>
        <template #title>テンプレート選択</template>
      </Header>
    </template>
    <template #contents>
      <ContentsBase>
        <div class="row">
          <div class="col-2 bg-menu pl-1 pr-1 rounded-left">
            <button
              type="button"
              class="btn btn-menu text-left text-white"
              :class="[
                menu.id == activeMenuId ? 'btn-primary' : 'btn-link',
                menu.id == activeMenuId ? 'text-white' : 'text-dark',
                menu.id == 1 ? 'mt-2' : '',
              ]"
              v-for="menu in menus"
              :key="menu.id"
              @click="activeMenuId = menu.id"
            >
              {{ menu.title }}
            </button>
          </div>
          <div class="col-9 bg-white rounded-right">
            <div class="my-3">
              <h6 class="border-bottom border-gray pb-2 mb-0">
                <select class="form-control w-25">
                  <option v-for="sort in sorts" :key="sort">
                    {{ sort }}
                  </option>
                </select>
              </h6>
              <div
                class="media text-muted pt-3"
                v-for="template in templates"
                :key="template.contentsId"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      template.title
                    }}</strong>
                    <div>
                      <router-link :to="{ name: 'VoiceTemplateDetail' }">
                        <button
                          type="button"
                          class="btn btn-light shadow btn-try"
                        >
                          選択
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="7.099"
                            height="12.198"
                            viewBox="0 0 7.099 12.198"
                            class="ml-2"
                          >
                            <path
                              d="M933.947,184.472l4.685,4.685-4.685,4.685"
                              transform="translate(-932.533 -183.057)"
                              fill="none"
                              stroke="#578ed9"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </svg>
                        </button>
                      </router-link>
                    </div>
                  </div>
                  <span class="d-block pb-2">{{ template.manuscript }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import { config } from "@/utils/UMesseApiConfiguration";
import * as UMesseApi from "umesseapi";
import { TemplateItem } from "umesseapi/models";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
  },
  setup() {
    const api = new UMesseApi.ResourcesApi(config);
    const state = reactive({
      menus: [
        {
          id: 1,
          title: "テンプレート1",
        },
        {
          id: 2,
          title: "テンプレート2",
        },
        {
          id: 3,
          title: "テンプレート3",
        },
        {
          id: 4,
          title: "テンプレート4",
        },
        {
          id: 5,
          title: "テンプレート5",
        },
        {
          id: 6,
          title: "テンプレート6",
        },
      ],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      templates: [] as TemplateItem[],
    });
    onMounted(async () => {
      const response = await api.listTemplate();
      state.templates = response.data;
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.bg-menu {
  background: #d9d9d9;
}
.btn-menu {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  text-decoration: none;
}
.btn-try,
.btn-edit {
  width: 100px;
  height: 40px;
}
.btn-edit {
  margin-left: 20px;
}
.btn:focus {
  box-shadow: none;
}
.btn-play,
.btn-close {
  width: 200px;
}
.btn-link {
  color: #333;
}
.dropdown-toggle::after {
  content: none;
}
</style>