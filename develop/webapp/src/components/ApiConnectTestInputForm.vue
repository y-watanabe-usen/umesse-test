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
          api接続テスト
        </div>
      </nav>
      <p class="h4 my-3 text-white">
        試しにUSEN MEMBERSのログインapiに繋いでみます
      </p>
      <div class="mb-3">
        <label for="loginId" class="text-white">ログインID</label>
        <input
          type="text"
          class="form-control"
          id="loginId"
          v-model="state.loginId"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="text-white">パスワード</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="state.password"
        />
      </div>
      <div class="mb-3">
        <label for="identifier" class="text-white"
          >アプリケーション識別子</label
        >
        <input
          type="text"
          class="form-control"
          id="identifier"
          v-model="state.identifier"
        />
      </div>
      <div class="mb-3">
        <label for="iv" class="text-white">IV</label>
        <input type="text" class="form-control" id="iv" v-model="state.iv" />
      </div>
      <hr class="mb-4" />
      <div class="mb-3">
        <button
          class="btn btn-primary btn-lg btn-block"
          type="submit"
          @click="login"
        >
          送信
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: 実際には使わないので後で消す
import { computed, inject, reactive } from "vue";
import UserKey from "@/components/user-key";

export default {
  setup() {
    const user = inject(UserKey);
    if (!user) {
      throw new Error(`${user} is not provided`);
    }
    const state = reactive({
      loginId: "xSgdZv",
      password: "KbvDW6K4",
      identifier: "EAbkM8KfG/jZ/gTGGFWoaqhbCpIHjG9T75Cyv2k+/Pk=",
      iv: "fOLf8ZE4btauxiqE",
    });

    const login = async () => {
      user.login(state.loginId, state.password, state.identifier, state.iv);
    };
    return {
      state,
      login,
    };
  },
};
</script>

<style scoped>
.custom-card {
  position: relative;
}
.custom-card p.title {
  position: absolute;
  color: white;
  font-size: 24px;
  top: 100px;
  left: 30%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}
.custom-card .card-body {
  position: absolute;
  padding: 0;
  top: 200px;
}
.custom-card.card {
  border: none;
  background-color: transparent;
}
</style>