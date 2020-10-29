<template>
  <div class="top">
    <div class="box-top1">
      <div class="narration-area">
        <div class="btn-edit shadow">
            <div class="narration-text">ナレーション1</div>
        </div>
      </div>
      <p>18時閉店</p>
      <div class="top-middle">
        <svg width="2.7em" height="2.7em" viewBox="0 0 16 16" class="bi bi-music-note-list" fill="#808080" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
          <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
          <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
          <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <div>00:00</div>
      </div>
      <div class="top-under">
        <div class="under-left">
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-volume-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z"/>
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
              <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"/>
            </svg>
        </div>
        <div class="under-center"></div>
        <div class="under-right">
          <div class="dot">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="#555555" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <button class="box-top2" data-toggle="modal" data-target="#modal1">
      <div class="btn-area">
        <div class="btn-edit shadow">
          <div class="narration-text">ナレーション2</div>
        </div>
      </div>
      <p>素材追加</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 70 70"
      >
      <g transform="translate(-313 -249)">
        <g
          transform="translate(313 249)"
          fill="#fff"
          stroke="#dbdbdb"
          stroke-width="1"
        >
          <circle cx="35" cy="35" r="35" stroke="none" />
          <circle cx="35" cy="35" r="34.5" fill="none" />
        </g>
        <rect
          width="40"
          height="8"
          rx="1"
          transform="translate(328 280)"
          fill="#9d9d9d"
        />
        <rect
          width="40"
          height="8"
          rx="1"
          transform="translate(352 264) rotate(90)"
          fill="#9d9d9d"
        />
        </g>
      </svg>
    </button>
    <!-- Modal -->
    <div
      class="modal fade modal1"
      id="modal1"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <ul class="modal-content shadow">
          <li>
            <button
              class="modal-btn select-top"
              id="to-modal2"
              data-toggle="modal"
              data-target="#modal2"
              data-dismiss="modal"
            >
              自分で録音した音声を追加
            </button>
          </li>
          <li>
            <button class="modal-btn">USENが提供する音声を追加</button>
          </li>
          <li>
            <button class="modal-btn select-bottom">
              オーダーした音声を追加
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="modal fade modal2"
      id="modal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="label1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="height: 70px">
            <div></div>
            <div style="margin: auto">ナレーションを選択</div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          title: "録音音源",
        },
        {
          id: 2,
          title: "合成音声",
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
  methods: {
    changeView() {
      this.$emit("selectedNarration", 3);
      $('.modal-backdrop').remove();
    },
  },
};
</script>

<style scoped>
p {
  font-size: 13px;
  text-align: center;
}
button {
  border: none;
  background-color: #ffffff;
}
.btn-area {
  display: flex;
  justify-content: center;
}
.btn-edit {
  background-color: #d5dbe3;
  font-size: 13px;
  width: 160px;
  height: 40px;
  border-radius: 2em;
  margin: 8px;
}
.narration-text {
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
}
.box-top1 {
  width: 67%;
  height: 235px;
  border-radius: 10px;
  background-color: white;
}
.box-top2 {
  width: 30%;
  height: 235px;
  border-radius: 10px;
  margin-left: 20px;
}
.top{
  display: flex;
}
.narration-area {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.top-middle{
  width: 100%;
  height: 80px;
  border-radius: 10px;
  text-align: center;
}
.top-under{
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #C0C0C0;
  border-radius: 0 0 10px 10px;
}
.under-left{
  width: 25%;
  border-radius: 10px;
  margin: 3px 0px 0px 10px; 
}
.under-center{
  width: 50%;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
}
.under-right{
  width: 25%;
  border-radius: 10px;
}
.dot{
  margin: 5px 0px 0px 65px; 
}
.modal-btn {
  background-color: #ffffff;
}
ul {
  z-index: 1000;
  position: absolute;
  text-align: center;
  width: 250px;
  top: 260px;
  margin-left: 662px;
  list-style: none;
  border-radius: 10px;
  padding-left: 0;
}
li {
  line-height: 4em;
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
}
li:first-child {
  border-radius: 5px 5px 0 0;
}
li:last-child {
  border-radius: 0 0 5px 5px;
  border-bottom: none;
}
ul:after {
  z-index: -1;
  content: "";
  position: absolute;
  margin-left: 110px;
  top: -18px;
  border-style: solid;
  border-color: transparent transparent transparent #ffffff;
  border-width: 15px 0 15px 17.32px;
  transform: rotate(-90deg);
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.1));
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