<template>
  <div class="bg-umesse-home">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <span class="navbar-brand mb-0 h1 text-white"
          >U MESSE
          <span v-if="authenticating">Loading...</span>
          <span v-else> {{ token }} {{ error }} </span>
        </span>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                class="nav-link text-white"
                to="#"
                data-toggle="modal"
                data-target="#modalSetting"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31.706"
                  height="31.706"
                  viewBox="0 0 31.706 31.706"
                >
                  <path
                    id="パス_18"
                    data-name="パス 18"
                    d="M464.461,165.51h-1.975a.637.637,0,0,1-.571-.42l-1.525-3.671a.632.632,0,0,1,.105-.7l1.4-1.4a.443.443,0,0,0,0-.622l-3.28-3.28a.441.441,0,0,0-.62,0l-1.4,1.4a.634.634,0,0,1-.7.1l-3.671-1.523a.639.639,0,0,1-.418-.572v-1.975a.44.44,0,0,0-.439-.439h-4.64a.44.44,0,0,0-.439.439v1.975a.641.641,0,0,1-.418.572l-3.672,1.523a.635.635,0,0,1-.7-.1l-1.4-1.4a.442.442,0,0,0-.62,0l-3.28,3.28a.441.441,0,0,0,0,.622l1.4,1.4a.629.629,0,0,1,.1.7l-1.523,3.671a.637.637,0,0,1-.571.42h-1.977a.44.44,0,0,0-.439.439v4.638a.44.44,0,0,0,.439.439h1.977a.638.638,0,0,1,.571.418l1.523,3.672a.63.63,0,0,1-.1.7l-1.4,1.4a.439.439,0,0,0,0,.62l3.28,3.28a.439.439,0,0,0,.62,0l1.4-1.4a.629.629,0,0,1,.7-.1l3.672,1.523a.639.639,0,0,1,.418.571v1.977a.44.44,0,0,0,.439.439h4.64a.44.44,0,0,0,.439-.439v-1.977a.637.637,0,0,1,.418-.571l3.671-1.523a.632.632,0,0,1,.7.1l1.4,1.4a.439.439,0,0,0,.62,0l3.28-3.28a.442.442,0,0,0,0-.62l-1.4-1.4a.633.633,0,0,1-.105-.7l1.525-3.672a.638.638,0,0,1,.571-.418h1.975a.44.44,0,0,0,.439-.439v-4.638A.44.44,0,0,0,464.461,165.51Zm-15.414,11.1a8.34,8.34,0,1,1,8.34-8.34A8.34,8.34,0,0,1,449.047,176.608Z"
                    transform="translate(-433.194 -152.415)"
                    fill="#fff"
                  />
                </svg>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <h5 class="text-white"><router-link :to="{name: 'Cm'}">店内アナウンスを作成する</router-link></h5>
      <div class="row top">
        <div class="col-md-4 mb-4">
          <router-link :to="{ name: 'Recording' }">
            <div class="content">
              <p class="image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50.888"
                  height="93.295"
                  viewBox="0 0 50.888 93.295"
                >
                  <g
                    id="アイコン"
                    transform="translate(-169.279 -195.63)"
                    opacity="0.8"
                  >
                    <path
                      id="パス_45"
                      data-name="パス 45"
                      d="M186.5,287a12.761,12.761,0,0,0,12.722-12.722V240.352a12.722,12.722,0,1,0-25.444,0v33.926A12.761,12.761,0,0,0,186.5,287Z"
                      transform="translate(8.222 -32)"
                      fill="#61aed6"
                    />
                    <path
                      id="パス_46"
                      data-name="パス 46"
                      d="M220.167,253.892V243.028a4.241,4.241,0,1,0-8.481,0v10.865a16.963,16.963,0,1,1-33.926,0V243.028a4.241,4.241,0,1,0-8.481,0v10.865a25.46,25.46,0,0,0,21.28,25.071c-.011.13-.076.24-.076.373v12.722H179.909a4.241,4.241,0,1,0,0,8.481h29.628a4.241,4.241,0,1,0,0-8.481H198.964V279.337c0-.133-.062-.243-.074-.373A25.46,25.46,0,0,0,220.167,253.892Z"
                      transform="translate(0 -11.615)"
                      fill="#61aed6"
                    />
                  </g>
                </svg>
              </p>
              <p class="title">録音して作成</p>
              <p class="lead small">
                ご自身の声を録音して、店内アナウンスを作成します。
              </p>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <div class="content">
            <p class="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66.551"
                height="84.324"
                viewBox="0 0 66.551 84.324"
              >
                <g
                  id="グループ_509"
                  data-name="グループ 509"
                  transform="translate(-588.73 -432)"
                  opacity="0.8"
                >
                  <path
                    id="パス_1204"
                    data-name="パス 1204"
                    d="M550.538,267.13H489.533a2.791,2.791,0,0,0-2.773,2.811v78.7a2.793,2.793,0,0,0,2.773,2.811h61.005a2.793,2.793,0,0,0,2.773-2.811v-78.7A2.791,2.791,0,0,0,550.538,267.13Zm-2.773,78.7H492.306V272.752h55.459Z"
                    transform="translate(101.97 164.87)"
                    fill="#61aed6"
                  />
                  <path
                    id="パス_1205"
                    data-name="パス 1205"
                    d="M494.7,280.752h32.327a2.811,2.811,0,0,0,0-5.622H494.7a2.811,2.811,0,0,0,0,5.622Z"
                    transform="translate(111.138 179.357)"
                    fill="#61aed6"
                  />
                  <path
                    id="パス_1206"
                    data-name="パス 1206"
                    d="M494.7,286.752h32.327a2.811,2.811,0,0,0,0-5.622H494.7a2.811,2.811,0,0,0,0,5.622Z"
                    transform="translate(111.138 190.222)"
                    fill="#61aed6"
                  />
                  <path
                    id="パス_1207"
                    data-name="パス 1207"
                    d="M494.7,292.752h32.327a2.811,2.811,0,0,0,0-5.622H494.7a2.811,2.811,0,0,0,0,5.622Z"
                    transform="translate(111.138 201.086)"
                    fill="#61aed6"
                  />
                </g>
              </svg>
            </p>
            <p class="title">
              <span
                class="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                合成音声から作成
              </span>
              <span class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                  :to="{ name: 'VoiceTemplate' }"
                  class="dropdown-item"
                >
                  テンプレートから作成</router-link
                >
                <router-link
                  :to="{ name: 'VoiceFree' }"
                  class="dropdown-item"
                >
                  フリー入力から作成</router-link
                >
              </span>
            </p>
            <p class="lead small">
              テキストを入力し、アプリが読み上げた音声を店内アナウンスにします。
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <router-link :to="{ name: 'Narration' }">
            <div class="content">
              <p class="image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56.359"
                  height="52.662"
                  viewBox="0 0 56.359 52.662"
                >
                  <path
                    id="パス_1203"
                    data-name="パス 1203"
                    d="M437.277,251.13h-26.3a15.072,15.072,0,0,0-15.03,15.027v11.272a15.073,15.073,0,0,0,15.03,15.03h4.047c.566.133,1.112.66.417,2.478-1.143,2.6-3.941,5.935-10.607,8.794,0,0,19.558,1.385,27.347-9.081v.019s1.795-2.21,4.132-2.21h.963a15.073,15.073,0,0,0,15.03-15.03V266.157A15.072,15.072,0,0,0,437.277,251.13Z"
                    transform="translate(-395.948 -251.13)"
                    fill="#61aed6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="49.33"
                  height="57.81"
                  viewBox="0 0 49.33 57.81"
                >
                  <g
                    id="グループ_581"
                    data-name="グループ 581"
                    transform="translate(-74.261 -69.225)"
                  >
                    <path
                      id="パス_1239"
                      data-name="パス 1239"
                      d="M122.675,69.233,89.913,73.681a1.1,1.1,0,0,0-.92,1.052v37.86a11.861,11.861,0,0,0-8.293,1.027c-4.912,2.388-7.582,7.016-5.967,10.336s6.906,4.073,11.815,1.685c3.969-1.933,6.428-5.317,6.392-8.3l.017.011v-32.9a1.12,1.12,0,0,1,.914-1.072l24.843-3.93a.771.771,0,0,1,.917.782v28.438a11.863,11.863,0,0,0-8.324,1.018c-4.912,2.388-7.581,7.016-5.967,10.338s6.9,4.073,11.815,1.682c4.341-2.113,6.92-5.972,6.344-9.134l.093.079V70.035A.79.79,0,0,0,122.675,69.233Z"
                      fill="#80bede"
                    />
                  </g>
                </svg>
              </p>
              <p class="title">ナレーションから作成</p>
              <p class="lead small">
                USENが提供する音声素材から、店内アナウンスを作成します。
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row bottom">
        <div class="col-md-4">
          <div class="content">
            <p class="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="46"
                viewBox="0 0 51 46"
              >
                <g
                  id="グループ_576"
                  data-name="グループ 576"
                  transform="translate(-63 -473)"
                >
                  <path
                    id="合体_3"
                    data-name="合体 3"
                    d="M6426-5455a3,3,0,0,1-3-3v-40a3,3,0,0,1,3-3h23a3,3,0,0,1,3,3v4h19a3,3,0,0,1,3,3v33a3,3,0,0,1-3,3Z"
                    transform="translate(-6360 5974)"
                    fill="#6a5cb7"
                  />
                  <rect
                    id="長方形_464"
                    data-name="長方形 464"
                    width="51"
                    height="32"
                    rx="3"
                    transform="translate(63 487)"
                    fill="#a095d8"
                  />
                </g>
              </svg>
              <span class="title">&nbsp;&nbsp;管理する</span>
            </p>
            <router-link
              :to="{ name: 'Management' }"
              class="btn btn-light border w-100 my-4 text-left"
            >
              店内アナウンスを管理
            </router-link>
            <p class="lead small">
              自分で作成した店内アナウンスや、発注で作成した店内アナウンスを確認、試聴することができます。
            </p>
          </div>
        </div>
        <div class="col-md-8">
          <div class="content">
            <p class="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56.532"
                height="52.824"
                viewBox="0 0 56.532 52.824"
              >
                <g
                  id="グループ_572"
                  data-name="グループ 572"
                  transform="translate(-315.26 -253.41)"
                >
                  <path
                    id="パス_1203"
                    data-name="パス 1203"
                    d="M437.4,251.13h-26.38A15.118,15.118,0,0,0,395.948,266.2V277.51a15.119,15.119,0,0,0,15.076,15.076h4.06c.568.133,1.115.662.419,2.486-1.147,2.609-3.953,5.954-10.64,8.821,0,0,19.618,1.39,27.431-9.109v.019s1.8-2.217,4.145-2.217h.966A15.119,15.119,0,0,0,452.48,277.51V266.2A15.118,15.118,0,0,0,437.4,251.13Z"
                    transform="translate(-80.688 2.28)"
                    fill="#b4b97f"
                  />
                </g>
              </svg>
              <span class="title">&nbsp;&nbsp;発注する</span>
            </p>
            <div class="row">
              <div class="col">
                <router-link
                  :to="{ name: 'OrderFlow1' }"
                  class="btn btn-light border w-100 my-4 text-left"
                >
                  店内アナウンスを発注
                </router-link>
                <p class="lead small">
                  USENのプロのアナウンサーが、ご希望のアナウンスを収録して店内アナウンスを製作いたします。
                </p>
              </div>
              <div class="col">
                <router-link
                  :to="{ name: 'OrderHistory' }"
                  class="btn btn-light border w-100 my-4 text-left"
                >
                  発注履歴
                </router-link>
                <p class="lead small">
                  今までの発注したアナウンスの履歴を確認できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div
    class="modal fade"
    id="modalSetting"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalSetting"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">setting</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              v-model="isDarkTheme"
              @change="toggleDarkTheme()"
            />
            <label class="custom-control-label" for="customSwitch1"
              >switch dark mode</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const { auth, base } = useGlobalStore();
    onMounted(() => {
      auth.requestAuth();
    });
    return {
      ...auth,
      ...base,
    };
  },
});
</script>

<style scoped>
.top .content {
  padding: 20px;
  background: #fff;
  border-radius: 1em;
}

.top a:link,
.top a:visited,
.top a:hover,
.top a:active {
  text-decoration: none;
  color: #212529;
}
.top .content .image {
  text-align: center;
  height: 115px;
}
.top .content .title {
  font-size: 18px;
}

.bottom .content {
  padding: 20px;
  background: #fff;
  border-radius: 1em 1em 0 0;
}
.bottom .content .image {
  text-align: left;
  height: 55px;
}
.bottom .content .title {
  font-size: 24px;
}

.dark .content {
  background: #272727;
  color: #fff;
  border-color: #aaa;
}
.dark .modal-content {
  background: #272727;
  color: #fff;
  border-color: #aaa;
}
</style>