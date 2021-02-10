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
                freeTemplateIndustry.cd == activeFreeTemplateIndustryCd
                  ? 'btn-primary'
                  : 'btn-link',
                freeTemplateIndustry.cd == activeFreeTemplateIndustryCd
                  ? 'text-white'
                  : 'text-dark',
                freeTemplateIndustry.cd == 1 ? 'mt-2' : '',
              ]"
              v-for="freeTemplateIndustry in freeTemplateIndustries"
              :key="freeTemplateIndustry.cd"
              @click="clickFreeTemplateIndustry(freeTemplateIndustry.cd)"
            >
              {{ freeTemplateIndustry.name }}
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
                v-for="freeItem in freeItems"
                :key="freeItem.contentsId"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      freeItem.title
                    }}</strong>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-try"
                        data-toggle="modal"
                        data-target=".bd-try-modal-lg"
                        @click="setManuscript(freeItem.manuscript)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="28"
                          viewBox="0 0 22 28"
                        >
                          <g id="原稿" transform="translate(-487.76 -231.13)">
                            <rect
                              id="長方形_406"
                              data-name="長方形 406"
                              width="22"
                              height="28"
                              rx="2"
                              transform="translate(487.76 231.13)"
                              fill="#578ed9"
                            />
                            <line
                              id="線_7"
                              data-name="線 7"
                              x2="11.657"
                              transform="translate(492.931 239.13)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              id="線_8"
                              data-name="線 8"
                              x2="11.657"
                              transform="translate(492.931 245.13)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              id="線_9"
                              data-name="線 9"
                              x2="11.657"
                              transform="translate(492.931 251.13)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </g>
                        </svg>
                        原稿
                      </button>

                      <router-link :to="{ name: 'VoiceFree' }">
                        <button
                          type="button"
                          class="btn btn-light shadow btn-try"
                          @click="selectFreeTemplate(freeItem.manuscript)"
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
                  <span class="d-block pb-2"
                    >{{ freeItem.manuscript }}<br />{{
                      freeItem.description
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentsBase>
    </template>
  </BasicLayout>
  <!-- modal -->
  <div
    class="modal fade bd-try-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">原稿</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ manuscript }}
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-light btn-close"
            data-dismiss="modal"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import * as UMesseApi from "umesseapi";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue";
import Header from "@/components/organisms/Header.vue";
import { config } from "@/utils/UMesseApiConfiguration";
import { FreeItem } from "umesseapi/models/free-item";
import * as Common from "@/utils/Common";
import { useGlobalStore } from "@/store";

export default defineComponent({
  components: {
    BasicLayout,
    ContentsBase,
    Header,
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
    };

    onMounted(async () => {
      await fetchFreeTemplate();
    });

    return {
      ...toRefs(state),
      clickFreeTemplateIndustry,
      setManuscript,
      selectFreeTemplate,
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
