<template>
  <BasicLayout>
    <template #header>
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'VoiceFree' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center h4">
          テンプレート選択
        </div>
      </nav>
    </template>
    <template #contents>
      <ContentsBase>
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
          <div class="col-9 bg-white rounded-right">
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
                      <button
                        type="button"
                        class="btn btn-light shadow btn-try"
                        data-toggle="modal"
                        data-target=".bd-try-modal-lg"
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
          本⽇は、ご来店いただきまして、誠にありがとうございます。本⽇は、ご来店いただきまして、誠にありがとうございます。本⽇は、ご来店いただきまして、誠にありがとうございます。本⽇は、ご来店いただきまして、誠にありがとうございます。本⽇は、ご来店いただきまして、誠にありがとうございます。本⽇は、ご来店いただきまして、誠にありがとうございます。
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
import { computed, reactive } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import axios from "axios";
import AudioStore from "@/store/audio";
import * as UMesseApi from "umesseapi";
import BasicLayout from "@/components/templates/BasicLayout.vue";
import ContentsBase from "@/components/templates/ContentsBase.vue"

export default {
  components: {
    BasicLayout,
    ContentsBase,
  },
  setup() {
    const state = reactive({
      menus: [
        {
          id: 1,
          title: "新着＆おすすめ",
        },
        {
          id: 2,
          title: "ユーザー作成音声",
        },
        {
          id: 3,
          title: "飲食店向け",
        },
        {
          id: 4,
          title: "サービス業向け",
        },
        {
          id: 5,
          title: "小売店向け",
        },
        {
          id: 6,
          title: "スーパー/ドラッグ量販店向け",
        },
        {
          id: 7,
          title: "医療/福祉向け",
        },
      ],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      narrationDatas: [
        {
          title: "18時30分閉店",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "アルバイト募集",
          description1:
            "お客様にご案内申し上げます。当店ではアルバイトを募集いたしており…",
          description2: "00:15 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "チャイルドチェア",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "デリバリー",
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
