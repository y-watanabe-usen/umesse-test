<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center text-white h4"
        >
          発注履歴
        </div>
      </nav>

      <div class="bg-white order">
        <div class="item py-3">
          <div class="row w-100">
            <div class="col left ml-3" style="margin: auto;">
              {{ state.data.date }}
            </div>
            <div class="col-9">
              <div class="alert alert-info status" role="alert">納品済み</div>
            </div>
          </div>
        </div>
        <div class="item py-3">
          <div class="row w-100">
            <div class="col left ml-3">アナウンス</div>
            <div class="col-9">
              {{ state.data.description }}
            </div>
          </div>
        </div>
        <div class="item py-3">
          <div class="row w-100">
            <div class="col left ml-3">BGM</div>
            <div class="col-9">
              {{ state.data.bgm }}
            </div>
          </div>
        </div>
        <div class="item py-3">
          <div class="row w-100">
            <div class="col left ml-3">オープニングチャイム</div>
            <div class="col-9">
              {{ state.data.openChaim }}
            </div>
          </div>
        </div>
        <div class="item py-3">
          <div class="row w-100">
            <div class="col left ml-3">エンディングチャイム</div>
            <div class="col-9">
              {{ state.data.endChaim }}
            </div>
          </div>
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

export default {
  setup() {
    const state = reactive({
      data: {
        id: 1,
        date: "2021年10月15日 10:30",
        description:
          "本日はmeguro cafeにお越しくださいましてありがとうございます。本日の閉店時間は21:00となっております。",
        bgm: "おまかせ",
        openChaim: "おまかせ",
        endChaim: "おまかせ",
        status: 1,
      },
    });

    return {
      state,
    };
  },
};
</script>

<style scoped>
.order {
  border-radius: 1em 1em 0 0;
}

.order .left {
  text-align: left;
}
.order .right {
  text-align: center;
  margin: auto;
}
.item {
  border-bottom: 1px solid #ccc;
}
.status {
  width: 100px;
  padding: 5px;
  margin: auto;
  text-align: center;
  border-radius: 2em;
}
</style>