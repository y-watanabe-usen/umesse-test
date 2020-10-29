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
          <div class="player">
            <button class="player-left">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-play-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
            </button>
            <div class="player-center">
              <img class="card-img-top" src="../assets/_bar@2x.png" />
            </div>
            <div class="player-right">00:00:00:00.00</div>
          </div>
        </div>
        <router-link class="navbar-brand text-white" to="#"
          >別名で保存</router-link
        >
      </nav>
      <div class="box1">
        <div class="box2">
          <div v-if="selectedOprnChime == 0">
            <AddOpenChime v-on:open-chime="selectedOprnChime = $event" />
          </div>
          <div v-if="selectedOprnChime == 1">
            <SelectedOpenChime />
          </div>
        </div>
        <div class="box3">
          <div v-if="selectedNarration == 1">
            <AddCreateCommercial1 v-on:selectedNarration="selectedNarration = $event" />
          </div>
          <div v-if="selectedNarration == 2">
            <AddCreateCommercial2 v-on:selectedNarration="selectedNarration = $event" />
          </div>
          <div v-if="selectedNarration == 3">
            <AddCreateCommercial3 />
          </div>
          <div v-if="selectedBackGroundMusic == 0">
            <AddBackgroundMusic v-on:selected-back-ground-music="selectedBackGroundMusic = $event" />
          </div>
          <div v-if="selectedBackGroundMusic == 1">
            <SelectedBackGroundMusic />
          </div>
        </div>
        <div class="box4">
          <div v-if="selectedEndChime == 0">
            <AddEndChime v-on:end-chime="selectedEndChime = $event" />
          </div>
          <div v-if="selectedEndChime == 1">
            <SelectedEndChime />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 表示するコンポーネントをインポート
import AddCreateCommercial1 from "@/components/AddCreateCommercial1";
import AddCreateCommercial2 from "@/components/AddCreateCommercial2";
import AddCreateCommercial3 from "@/components/AddCreateCommercial3";
import AddOpenChime from "@/components/AddOpenChime";
import SelectedOpenChime from "@/components/SelectedOpenChime";
import AddBackgroundMusic from "@/components/AddBackgroundMusic";
import SelectedBackGroundMusic from "@/components/SelectedBackGroundMusic";
import AddEndChime from "@/components/AddEndChime";
import SelectedEndChime from "@/components/SelectedEndChime";

export default {
    components: {
    AddCreateCommercial1,
    AddCreateCommercial2,
    AddCreateCommercial3,
    AddOpenChime,
    SelectedOpenChime,
    AddBackgroundMusic,
    SelectedBackGroundMusic,
    AddEndChime,
    SelectedEndChime,
  },
  data() {
    return {
      selectedNarration: 1,
      selectedOprnChime: 0,
      selectedBackGroundMusic: 0,
      selectedEndChime: 0,
    };
  },
};
</script>

<style scoped>
p {
  font-size: 13px;
  margin-top: 20px;
}
button {
  border: none;
}
.player {
  display: flex;
  width: 800px;
  height: 35px;
  background-color: #555859;
  border-radius: 5px;
  opacity: 0.5;
}
.player-left {
  width: 100px;
  height: 35px;
  border-radius: 5px;
  text-align: center;
  background-color: #555859;
}
.player-center {
  width: 480px;
  height: 35px;
  border-radius: 5px;
}
.player-right {
  width: 215px;
  height: 35px;
  border-radius: 5px;
  text-align: center;
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
.box1 {
  display: flex;
  width: 1100px;
  height: 550px;
  margin: 20px auto;
  border-radius: 10px;
}
.box2 {
  width: 25%;
  border-radius: 10px;
}
.box3 {
  width: 60%;
  border-radius: 10px;
}
.box4 {
  width: 25%;
  border-radius: 10px;
}
.narration-text {
  font-size: 13px;
  margin-top: 10px;
}
</style>