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
          店内アナウンスを発注する
        </div>
        <router-link class="navbar-brand" :to="{ path: 'orderinstoreannouncement2' }"><button class="btn" style="width:100px;">次へ</button></router-link>
      </nav>
      <div class="rounded" style="height: 600px; background-color: #E6E6E6;">
        <div class="p-4">
          <div class="d-flex">
            <div class="d-flex col-2 pl-0">
              <div class="step-number step-current" style="">1</div>
              <p style="color: #578ED9; line-height: 50px;">基本情報</p>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number" style="">2</div>
              <h6 style="color: #888888; line-height: 50px;">原稿</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number" style="">3</div>
              <h6 style="color: #888888; line-height: 50px;">アナウンサー</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number" style="">4</div>
              <h6 style="color: #888888; line-height: 50px;">BGM</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number" style="">5</div>
              <h6 style="color: #888888; line-height: 50px;">納期/金額</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number" style="">6</div>
              <h6 style="color: #888888; line-height: 50px;">確認/発注</h6>
            </div>
          </div>
          <hr>
          <div class="d-flex" style="line-height: 40px;">
            <div class="col-3">納品先</div>
            <div class="col-9">Megro Cafe様</div>
          </div>
          <hr>
          <div class="d-flex" style="line-height: 40px;">
            <div class="col-3">CMタイトル</div>
            <input type="text" class="w-100 form-control" placeholder="タイトルを入力してください" style="">
          </div>
          <hr>
          <div class="d-flex" style="line-height: 40px;">
            <div class="col-3">シーン</div>
            <select name="" id="" class="form-control">
              <option value="">開始/終了</option>
            </select>
          </div>
          <hr>
          <div class="d-flex" style="line-height: 40px;">
            <div class="col-3">説明文</div>
            <textarea class="form-control" name="" id="" cols="30" rows="10" placeholder="説明を入力してください"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
  width: 100%;
  height: 170px;
}
button {
  border: none;
  background-color: #ffffff;
}
hr {
  margin: 10px;
}
.step-number {
  width: 45px;
  height: 45px;
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  background-color: #ffffff;
  color: #888888;
  margin-right: 10px;
}
.step-current {
  background-color: #578ED9;
  color: #ffffff;
}
::placeholder {
  color: #cccccc;
}
</style>