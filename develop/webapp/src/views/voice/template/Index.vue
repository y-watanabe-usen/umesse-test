<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center h4">
          テンプレート選択
        </div>
      </nav>
      <div class="row">
        <div class="col-2 bg-menu pl-1 pr-1 rounded-left">
          <button
            type="button"
            class="btn btn-menu text-left text-white"
            :class="[
              menu.id == state.activeMenuId ? 'btn-primary' : 'btn-link',
              menu.id == state.activeMenuId ? 'text-white' : 'text-dark',
              menu.id == 1 ? 'mt-2' : '',
            ]"
            v-for="menu in state.menus"
            :key="menu.id"
            @click="state.activeMenuId = menu.id"
          >
            {{ menu.title }}
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
              v-for="narrationData in state.narrationDatas"
              :key="narrationData.title"
            >
              <div
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray pl-3"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100"
                >
                  <strong class="text-dark h5 pt-2 pb-2">{{
                    narrationData.title
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
                <span class="d-block pb-2"
                  >{{ narrationData.description1 }}<br />{{
                    narrationData.description2
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";

export default {
  setup() {
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
      narrationDatas: [
        {
          title: "XXXXXXの案内1",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "XXXXXXの案内1",
          description1:
            "お客様にご案内申し上げます。当店ではアルバイトを募集いたしており…",
          description2: "00:15 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "XXXXXXの案内1",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "XXXXXXの案内1",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
      ],
    });

    return {
      state,
    };
  },
};
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