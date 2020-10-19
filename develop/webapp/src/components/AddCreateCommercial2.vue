<template>
  <div class="top">
    <div class="box-top1">
      <div class="narration-area">
        <div class="btn-edit shadow">
            <div class="narration-text">ナレーション1</div>
        </div>
      </div>
      <p>18時閉店</p>
      <div class="top-middle">
        <svg width="2.7em" height="2.7em" viewBox="0 0 16 16" class="bi bi-music-note-list" fill="#808080" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
          <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
          <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
          <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </div>
      <div class="top-under">
        <div class="under-left"></div>
        <div class="under-center">00:00:00:00.00</div>
        <div class="under-right">
          <div class="dot">
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="#555555" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        </div>
      </div>
    </div>
  </div>
  <button class="box-top2">
    <div class="btn-area">
      <div class="btn-edit shadow">
        <div class="narration-text">ナレーション2</div>
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
</template>

<style scoped>
p {
  font-size: 13px;
  text-align: center;
}
button {
  border: none;
  background-color: #ffffff;
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
  background-color:red;
}
.box2 {
  width: 25%;
  border-radius: 10px;
}
.narration-text {
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
}
.box-top1 {
  width: 67%;
  height: 235px;
  border-radius: 10px;
  background-color:white;
}
.box-top2 {
  width: 30%;
  height: 235px;
  border-radius: 10px;
  margin-left: 20px;
}
.box-bottom{
  width: 100%;
  height: 235px;
  border-radius: 10px;
  opacity: 0.5
}
.top{
  display: flex;

}
.narration-area {
  display: flex;
  justify-content: center;
  margin-top:25px;
}
.top-middle{
  width: 100%;
  height: 80px;
  border-radius: 10px;
  text-align: center;
}
.top-under{
  display: flex;
  width: 100%;
  height: 40px;
  background-color:#C0C0C0;
  border-radius: 0 0 10px 10px;
}
.under-left{
  width: 25%;
  border-radius: 10px;
}
.under-center{
  width: 50%;
  border-radius: 10px;
  margin-top:10px;
  text-align: center;
}
.under-right{
  width: 25%;
  border-radius: 10px;
}
.dot{
  margin: 5px 0px 0px 68px; 
}
</style>