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
          <button class="open-chime">
            <div class="btn-area">
              <div class="btn-edit shadow">
                <div class="narration-text">Openチャイム</div>
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
        </div>
        <div class="box3">
        <!-- コンポーネントを表示 -->
          <div v-if="currentView == 1">
            <AddCreateCommercial1 :current-view="currentView" v-on:my-click="currentView = $event" />
          </div>
          <div v-if="currentView == 2">
            <AddCreateCommercial2 />
          </div>

          <div class="space"></div>
          <button class="box-bottom">
            <div class="btn-area">
              <div class="btn-edit shadow">
                <div class="narration-text">BGM</div>
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
        </div>
        <div class="box4">
          <button class="end-chime">
            <div class="btn-area">
              <div class="btn-edit shadow">
                <div class="narration-text">Endチャイム</div>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 表示するコンポーネントをインポート
import AddCreateCommercial1 from "@/components/AddCreateCommercial1";
import AddCreateCommercial2 from "@/components/AddCreateCommercial2";

export default {
    components: {
    AddCreateCommercial1,
    AddCreateCommercial2,
  },
  data() {
    return {
      currentView: 1,
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
.open-chime {
  width: 170px;
  height: 260px;
  border-radius: 10px;
  margin-top: 150px;
  margin-left: 60px;
  opacity: 0.5;
}
.end-chime {
  width: 170px;
  height: 260px;
  border-radius: 10px;
  margin-top: 150px;
  margin-left: 20px;
  opacity: 0.5;
}
.narration-text {
  font-size: 13px;
  margin-top: 10px;
}
.space {
  width: 100px;
  height: 35px;
}
.box-top {
  width: 100%;
  height: 235px;
  border-radius: 10px;
}
.box-bottom {
  width: 100%;
  height: 235px;
  border-radius: 10px;
  opacity: 0.5;
}
</style>