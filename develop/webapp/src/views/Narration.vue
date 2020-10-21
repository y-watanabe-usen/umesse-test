<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center text-white h4"
        >
          ナレーション選択
        </div>
      </nav>
      <div class="row">
        <div class="col-2 bg-menu pl-1 pr-1 rounded-left">
          <button
            type="button"
            class="btn btn-menu text-left text-white"
            :class="[
              narrationList.id == state.activeIndustryId
                ? 'btn-light'
                : 'btn-link',
              narrationList.id == state.activeIndustryId
                ? 'text-dark'
                : 'text-white',
              narrationList.id == 1 ? 'mt-2' : '',
            ]"
            v-for="narrationList in narrationLists"
            :key="narrationList.id"
            @click="changeActiveIndustryId(narrationList.id)"
          >
            {{ narrationList.name }}
          </button>
        </div>
        <div class="col-10 bg-white rounded-right">
          <div class="my-3">
            <h6 class="border-bottom border-gray pb-2 mb-0">
              <select class="form-control w-25">
                <option v-for="sort in state.sorts" :key="sort">
                  {{ sort }}
                </option>
              </select>
            </h6>
            <template v-if="state.scenes">
              <div
                class="media text-muted pt-3"
                v-for="scene in state.scenes"
                :key="scene.id"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                  @click="clickScene(scene.id)"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      scene.name
                    }}</strong>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="state.scenes.length == 0">
              <div
                class="media text-muted pt-3"
                v-for="narration in narrations"
                :key="narration.id"
              >
                <div
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
                >
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <strong class="text-dark h5 pt-2 pb-2">{{
                      narration.name
                    }}</strong>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-try"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-music-note-list"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"
                          />
                          <path fill-rule="evenodd" d="M12 3v10h-1V3h1z" />
                          <path
                            d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
                          />
                        </svg>
                        試聴
                      </button>
                      <button
                        type="button"
                        class="btn btn-light shadow btn-edit"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-pencil"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                          />
                        </svg>
                        編集
                      </button>
                    </div>
                  </div>
                  <span class="d-block pb-2"
                    >{{ narration.manuscript }}<br />{{
                      narration.detail
                    }}</span
                  >
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  reactive,
  onCreated,
} from "vue";
import narrationStore from "@/store/narration";

export default {
  setup() {
    // TODO: 大分強引&分かりにくいので後でリファクタリング
    const store = narrationStore();

    const state = reactive({
      sorts: ["名前順", "作成日順", "更新日順"],
      activeIndustryId: 0,
      scenes: [],
    });

    const narrationLists = computed(() => store.narrationLists);
    const narrations = computed(() => store.narrations);

    // TODO: onCreatedがない？？
    onMounted(async () => {
      await store.fetchNarrationLists();
      changeActiveIndustryId(store.narrationLists[0].id);
    });

    const changeActiveIndustryId = (id) => {
      state.activeIndustryId = id;
      console.log(state.activeIndustryId);
      const narrationLists = store.narrationLists;
      if (!narrationLists) {
        state.scenes = [];
      }
      narrationLists.forEach((value) => {
        console.log(value.scenes);
        if (value.id == state.activeIndustryId) {
          state.scenes = value.scenes;
        }
      });
    };

    const clickScene = async (id) => {
      await store.fetchNarrations(id);
      state.scenes = [];
    };

    return {
      state,
      narrationLists,
      narrations,
      changeActiveIndustryId,
      clickScene,
    };
  },
};
</script>

<style scoped>
.bg-menu {
  background: -moz-linear-gradient(top, #89929e, #a4a8ad);
  background: -webkit-linear-gradient(top, #89929e, #a4a8ad);
  background: linear-gradient(to bottom, #89929e, #a4a8ad);
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
</style>