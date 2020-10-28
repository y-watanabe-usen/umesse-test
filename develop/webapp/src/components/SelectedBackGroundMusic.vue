<template>
  <div class="space"></div>
  <div class="selected-back-ground-music">
    <div class="narration-area">
      <div class="btn-edit shadow">
        <div class="narration-text">BGM</div>
      </div>
    </div>
    <p>店内BGMサンプル1</p>
    <div class="back-ground-music-middle">
      <svg width="2.7em" height="2.7em" viewBox="0 0 16 16" class="bi bi-music-note-list" fill="#808080" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
        <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
        <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    <div>00:00</div>
  </div>
  <div class="back-ground-music-under">
      <div class="back-ground-music-under-left">
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-volume-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z"/>
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"/>
        </svg>
      </div>
      <div class="back-ground-music-under-center"></div>
      <div class="back-ground-music-under-right">
        <div class="back-ground-music-dot">
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="#555555" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 13px;
  text-align: center;
}
.btn-edit {
  background-color: #d5dbe3;
  font-size: 13px;
  width: 160px;
  height: 40px;
  border-radius: 2em;
  margin: 8px;
}
.narration-text {
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
}
.selected-back-ground-music {
  height: 235px;
  border-radius: 10px;
  background-color: white;
}
.narration-area {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  padding-top: 25px; 
}
.back-ground-music-middle {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  text-align: center;
}
.back-ground-music-under {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #C0C0C0;
  border-radius: 0 0 10px 10px;
}
.back-ground-music-under-left {
  width: 25%;
  border-radius: 10px;
  margin: 3px 0px 0px 10px;
}
.back-ground-music-under-center {
  width: 50%;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
}
.back-ground-music-under-right {
  width: 25%;
  border-radius: 10px;
}
.back-ground-music-dot {
  margin: 5px 0px 0px 115px; 
}
</style>