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
          録音する
        </div>
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >保存</router-link
        >
      </nav>
      <div class="row">
        <div class="m-5">
          <p class="recording" v-on:click="toggle_switch()">
            <p v-if="isActive === false">
              <img class="card-img-top" src="../assets/_rec@2x.png" />
            </p>
            <p v-else>
              <img class="card-img-top" src="../assets/_stop@2x.png" />
            </p>
          </p>
        </div>
        <div class="d-flex align-items-center">
          <div class="border-top border-bottom lead" style="padding:20px;">Recording Timestamp：00:00:00:00.00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
  data: function() {
   return {
    isActive: false
   }
  },
  methods: {
   toggle_switch: function() {
    this.isActive = !this.isActive
   }
  }
 }
</script>

<style scoped>
.recording {
  cursor: pointer;
  margin-left: 95px;
  width: 429px;
  height: 429px;
}
</style>