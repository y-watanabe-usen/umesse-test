<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center h4">
          発注履歴
        </div>
      </nav>

      <div class="bg-white order rounded">
        <div class="item py-3" v-for="data in datas" :key="data.id">
          <div class="row w-100">
            <div class="col left">
              {{ data.date }}
              <div
                v-if="data.status == 1"
                class="alert alert-danger status"
                role="alert"
              >
                製作中
              </div>
              <div
                v-if="data.status == 2"
                class="alert alert-success status"
                role="alert"
              >
                発注済み
              </div>
              <div
                v-if="data.status == 3"
                class="alert alert-info status"
                role="alert"
              >
                納品済み
              </div>
            </div>
            <div class="col-6 lead small center">{{ data.description }}</div>
            <div class="col right">
              <router-link
                :to="{ name: 'OrderHistoryDetail', params: { id: data.id } }"
                >詳細を確認&nbsp;&gt;</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import AudioPlayer from "@/utils/AudioPlayer";
import axios from "axios";
import AudioStore from "@/store/audio";

export default defineComponent({
  setup() {
    const state = reactive({
      datas: [
        {
          id: 1,
          date: "2021年10月15日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。なんたらかんたら",
          status: 1,
        },
        {
          id: 2,
          date: "2021年10月12日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。ああああああああああああああああああああああああああああああああああああああああああ",
          status: 2,
        },
        {
          id: 3,
          date: "2021年10月10日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。",
          status: 3,
        },
        {
          id: 4,
          date: "2021年10月8日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。",
          status: 3,
        },
        {
          id: 5,
          date: "2021年9月27日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。",
          status: 3,
        },
        {
          id: 6,
          date: "2021年9月15日",
          description:
            "本日はmeguro cafeにお越しくださいましてありがとうございます。",
          status: 3,
        },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.order .left {
  text-align: center;
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
.order a:link,
.order a:visited,
.order a:hover,
.order a:active {
  text-decoration: none;
  color: #212529;
}
</style>