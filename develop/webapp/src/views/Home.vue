<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <span class="navbar-brand mb-0 h1 text-white"
          >U Messe
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
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-gear-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
                  />
                </svg>
                設定</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link disabled text-white" to="#"
                ><svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-person-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                </svg>
                Meguro Cafe</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
      <div class="row row-cols-4">
        <div class="col image-content">
          <img
            class="card-img-top"
            src="../assets/matt-botsford-OKLqGsCT8qs-unsp@2x.png"
          />
          <p class="title">店内アナウンスを作成</p>
        </div>
        <div class="col content">
          <router-link
            :to="{ path: 'RecordingStart' }"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            録音して作成
          </router-link>
          <p class="lead small">
            ご自身の声を録音して、店内アナウンスを作成します。
          </p>
        </div>
        <div class="col content">
          <router-link
            :to="{ path: 'selecttemplate' }"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            合成音声から作成
          </router-link>
          <p class="lead small">
            テキストを入力し、アプリが読み上げた音声を店内アナウンスにします。
          </p>
        </div>
        <div class="col content right">
          <router-link
            :to="{ path: 'narration' }"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            ナレーション素材から作成
          </router-link>
          <p class="lead small">
            USENが提供する音声素材から、店内アナウンスを作成します。
          </p>
        </div>
      </div>
      <div class="row row-cols-4 py-4">
        <div class="col image-content">
          <img class="card-img-top" src="../assets/_dm@2x.png" />
          <p class="title">管理</p>
        </div>
        <div class="col content right">
          <router-link
            :to="{ path: 'createdcm' }"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            店内アナウンスを管理する
          </router-link>
          <p class="lead small">
            自分で作成した店内アナウンスや、発注で作成した店内アナウンスを確認、試聴することができます。
          </p>
          <button
            type="button"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            発注したアナウンスが完成しました。（5件）
          </button>
        </div>
        <div class="col image-content">
          <img class="card-img-top" src="../assets/_c@2x.png" />
          <p class="title">発注</p>
        </div>
        <div class="col content right">
          <router-link
            :to="{ path: 'new-order' }"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            店内アナウンスを発注する
          </router-link>
          <p class="lead small">
            USENのプロのアナウンサーが、ご希望のアナウンスを収録して店内アナウンスを製作いたします。
          </p>
          <button
            type="button"
            class="btn btn-light border w-100 text-left my-4 font-weight-bold"
          >
            発注履歴を確認する
          </button>
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
.image-content {
  padding: 0;
}
.content {
  background: #e2e2e2;
}
.content.right {
  border-radius: 0 1em 1em 0;
}
.image-content p.title {
  position: absolute;
  color: white;
  font-size: 18px;
  top: 100px;
  left: 40%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  width: 70%;
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