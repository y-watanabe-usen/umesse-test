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
          オーダーする
        </div>
        <router-link class="navbar-brand text-white" to="#">保存</router-link>
      </nav>
      <div class="box1">
        <div class="box2">
          <div class="box3">
            <div class="box3-text">
              <p style="padding-left: 40px">ナレーションを入力してください</p>
              <p>※必須</p>
            </div>
            <textarea name=""></textarea>
          </div>
          <div class="box4">
            <div>
              <p>BGMを選択　※任意</p>
              <button class="box5">
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
            <div>
              <p>始まりのチャイムを選択　※任意</p>
              <button class="box5">
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
            <div>
              <p>終わりのチャイムを選択　※任意</p>
              <button class="box5">
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
      <div class="btn-area">
        <button class="btn-edit shadow">キャンセル</button>
        <button class="btn-edit btn-save shadow">保存する</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
  width: 100%;
  height: 170px;
  border-radius: 5px;
  border: none;
}
p {
  font-size: 13px;
  color: #ffffff;
  margin-bottom: 5px;
}
button {
  border: none;
  background-color: #ffffff;
}
.box1 {
  display: flex;
  width: 800px;
  height: 440px;
  background-color: #868d97;
  margin: 20px auto;
  border-radius: 10px;
}
.box2 {
  width: 92%;
  margin: auto;
}
.box3 {
  width: 100%;
  height: 230px;
}
.box3-text {
  display: flex;
  justify-content: space-between;
}
.box4 {
  display: flex;
  justify-content: space-between;
}
.box5 {
  width: 230px;
  height: 115px;
  border-radius: 5px;
}
.btn-area {
  display: flex;
  justify-content: center;
}
.btn-edit {
  font-size: 13px;
  width: 160px;
  height: 40px;
  border-radius: 2em;
  margin: 8px;
}
.btn-save {
  color: #ffffff;
  background-color: #578ed9;
}
</style>