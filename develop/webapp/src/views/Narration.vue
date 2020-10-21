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
            <div
              class="media text-muted pt-3"
              v-for="scene in state.scenes"
              :key="scene.id"
            >
              <div
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
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
    const store = narrationStore();

    const state = reactive({
      sorts: ["名前順", "作成日順", "更新日順"],
      activeIndustryId: 0,
      scenes: [],
    });

    const narrationLists = computed(() => store.narrationLists);

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

    return {
      state,
      narrationLists,
      changeActiveIndustryId,
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