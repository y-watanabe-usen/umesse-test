<template>
  <button  class="box-top" data-toggle="modal" data-target="#modal1">
    <div class="btn-area">
      <div class="btn-edit shadow">
        <div class="narration-text">ナレーション1</div>
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
  <ModalAddMaterial />
  <ModalSelectNarrationRecordingData />
  <ModalSelectVoiceProvidedByUsen />
  <ModalSelectVoiceOrdered />
</template>
<script>
import ModalAddMaterial from "@/components/ModalAddMaterial";
import ModalSelectNarrationRecordingData from "@/components/ModalSelectNarrationRecordingData";
import ModalSelectVoiceProvidedByUsen from "@/components/ModalSelectVoiceProvidedByUsen";
import ModalSelectVoiceOrdered from "@/components/ModalSelectVoiceOrdered";

export default {
    components: {
      ModalAddMaterial,
      ModalSelectNarrationRecordingData,
      ModalSelectVoiceProvidedByUsen,
      ModalSelectVoiceOrdered,
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
button:focus {
  outline: 0;
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