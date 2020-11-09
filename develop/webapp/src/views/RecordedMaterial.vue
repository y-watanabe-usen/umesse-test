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
          録音した素材を確認する
        </div>
      </nav>
      <div class="row">
        <div class="col-2 bg-menu pl-1 pr-1 rounded-left">
          <button
            type="button"
            class="btn btn-menu text-left text-white"
            :class="[
              menu.id == activeMenuId ? 'btn-light' : 'btn-link',
              menu.id == activeMenuId ? 'text-dark' : 'text-white',
              menu.id == 1 ? 'mt-2' : '',
            ]"
            v-for="menu in menus"
            :key="menu.id"
            @click="activeMenuId = menu.id"
          >
            {{ menu.title }}
          </button>
        </div>
        <div class="col-10 bg-white rounded-right">
          <div class="my-3">
            <h6 class="border-bottom border-gray pb-2 mb-0">
              <select class="form-control w-25">
                <option v-for="sort in sorts" :key="sort">{{ sort }}</option>
              </select>
            </h6>
            <div
              class="media text-muted pt-3"
              v-for="narrationData in narrationDatas"
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
                    <button type="button" class="btn btn-light shadow btn-try">
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
                      class="btn btn-edit"
                      data-toggle="modal"
                      data-target="#modal1"
                    >
                      <svg
                        id="グループ_42"
                        data-name="グループ 42"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="6"
                        viewBox="0 0 30 6"
                      >
                        <circle
                          id="楕円形_2"
                          data-name="楕円形 2"
                          cx="3"
                          cy="3"
                          r="3"
                          fill="#555"
                        />
                        <circle
                          id="楕円形_3"
                          data-name="楕円形 3"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(12)"
                          fill="#555"
                        />
                        <circle
                          id="楕円形_4"
                          data-name="楕円形 4"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(24)"
                          fill="#555"
                        />
                      </svg>
                    </button>
                    <!-- <ModalMaterialMenu /> -->
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

<script>
//import ModalMaterialMenu from "@/components/ModalMaterialMenu";

export default {
  // components: {
  //   ModalMaterialMenu,
  // },
  data() {
    return {
      menus: [
        {
          id: 1,
          title: "録音音源",
        },
        {
          id: 2,
          title: "合成音源",
        },
      ],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      narrationDatas: [
        {
          title: "録音した音源1",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "録音した音源2",
          description1:
            "お客様にご案内申し上げます。当店ではアルバイトを募集いたしており…",
          description2: "00:15 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "録音した音源3",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "録音した音源4",
          description1:
            "本日はご来店いただきまして、誠にありがとうございます。お客様に…",
          description2: "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
      ],
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
.btn:focus {
  box-shadow: none;
}
</style>