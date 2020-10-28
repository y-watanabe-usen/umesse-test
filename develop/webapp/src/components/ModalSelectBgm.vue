<template>
  <div
    class="modal fade modal-bgm"
    id="modal-bgm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="label1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header" style="height: 70px">
          <div></div>
          <div style="margin: auto">BGMを選択</div>
          <button data-dismiss="modal" class="bg-white mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.769"
              height="15.366"
              viewBox="0 0 14.769 15.366"
            >
              <g transform="translate(-1385.086 -129.086)">
                <line
                  x1="11.941"
                  y2="12.539"
                  transform="translate(1386.5 130.5)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-width="2"
                />
                <line
                  x2="11.941"
                  y2="12.539"
                  transform="translate(1386.5 130.5)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </g>
            </svg>
          </button>
        </div>
        <div class="container">
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
                    <option v-for="sort in sorts" :key="sort">
                      {{ sort }}
                    </option>
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
                      <strong class="text-dark h5 pt-2 pb-2"
                        >{{ narrationData.title }}
                      </strong>
                      <div>
                        <button
                          type="button"
                          class="btn btn-light shadow modal-btn-try"
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-music-note-list mb-1 text-primary"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M12 3v10h-1V3h1z"
                            />
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
                          type="button" v-on:click="changeView()"
                          class="btn btn-light shadow modal-btn-edit"
                        >
                          <svg
                            class="mb-1 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 20 20"
                          >
                            <g transform="translate(-866 -179)">
                              <rect
                                width="20"
                                height="4"
                                rx="1"
                                transform="translate(866 187)"
                                fill="#007bff"
                              />
                              <rect
                                width="20"
                                height="4"
                                rx="1"
                                transform="translate(878 179) rotate(90)"
                                fill="#007bff"
                              />
                            </g>
                          </svg>
                          追加
                        </button>
                      </div>
                    </div>
                    <span class="d-block pb-2"
                      >{{ narrationData.description1 }}<br />{{
                        narrationData.description2
                      }}
                    </span>
                  </div>
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
export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          title: "お気に入り",
        },
        {
          id: 2,
          title: "新着&おすすめ",
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
          title: "小売向け",
        },
        {
          id: 6,
          title: "スーパー/ドラッグ",
        },

],
      activeMenuId: 1,
      sorts: ["名前順", "作成日順", "更新日順"],
      narrationDatas: [
        {
          title: "BGM1",
          description1:
            "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "BGM2",
          description1:
            "00:15 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "BGM3",
          description1:
            "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
        {
          title: "BGM4",
          description1:
            "00:24 放送開始日2020年10月15日 有効期限2020年10月20日",
        },
      ],
    };
  },
  methods: {
    changeView() {
    this.$parent.$emit("selectedNarration", 2);
      $('.modal-backdrop').remove();
    },
  },
}
</script>
<style scoped>
button {
  border: none;
}
button:focus {
  outline: 0;
}
.modal-btn {
  background-color: #ffffff;
}
.modal-content {
  border: none;
  box-shadow: none;
}
.modal-dialog {
  max-width: 1140px;
}
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
.modal-btn-try,
.modal-btn-edit {
  width: 100px;
  height: 40px;
}
.modal-btn-edit {
  margin-left: 20px;
}
</style>