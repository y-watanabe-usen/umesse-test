<template>
  <div>
    <p>{{ state.token }}</p>
    <button @click="send">send</button>
  </div>
</template>

<script>
import { computed, inject, reactive } from "vue";
import * as UMesseApi from "umesseapi";

export default {
  setup() {
    const state = reactive({
      token: "a",
    });

    const send = async () => {
      // const api = new UMesseApi.AuthApi();
      // const response = await api.authPost();
      // console.log(response);
      // state.token = response.data.token;
      const api = new UMesseApi.ResourcesApi();
      const response = await api.narrationGet();
      console.log(response);
      state.token = response.data

    };
    return {
      state,
      send,
    };
  },
};
</script>