<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'OrderFlow1' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center h4"
        >
          店内アナウンスを発注する
        </div>
        <router-link
          class="navbar-brand"
          :to="{ name: 'OrderFlow3' }"
          ><button class="btn" style="width: 100px">次へ</button></router-link
        >
      </nav>
      <div class="rounded bg-white" style="height: 600px;">
        <div class="p-4">
          <div class="d-flex">
            <div class="d-flex col-2 pl-0">
              <div class="step-number">1</div>
              <p style="color: #888888; line-height: 50px">基本情報</p>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number step-current">2</div>
              <h6 style="color: #578ed9; line-height: 50px">原稿</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number">3</div>
              <h6 style="color: #888888; line-height: 50px">アナウンサー</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number">4</div>
              <h6 style="color: #888888; line-height: 50px">BGM</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number">5</div>
              <h6 style="color: #888888; line-height: 50px">納期/金額</h6>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number">6</div>
              <h6 style="color: #888888; line-height: 50px">確認/発注</h6>
            </div>
          </div>
          <hr />
          <div class="d-flex" style="line-height: 40px">
            <div class="col-3">原稿</div>
            <textarea
              class="form-control"
              style="height: 140px"
              placeholder="原稿を入力してください"
            ></textarea>
          </div>
          <hr />
          <div class="d-flex" style="line-height: 40px">
            <div class="col-3">読み方</div>
            <textarea
              class="form-control"
              style="height: 140px"
              placeholder="地名、難関字など特に注意すべき読み方がありましたらご記入ください"
            ></textarea>
          </div>
          <hr />
          <div
            class="col-12 d-flex justify-content-between"
            style="line-height: 40px"
          >
            <div>
              言い回しがおかしい部分については、こちらで手直ししてもよろしいですか？
            </div>
            <div style="font-size: 18px">
              <input type="radio" name="y-n" value="" class="mr-2" />はい
              <input type="radio" name="y-n" value="" class="mr-2 ml-4" />いいえ
            </div>
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
  background-color: #e6e6e6;
  color: #888888;
  margin-right: 10px;
}
.step-current {
  background-color: #578ed9;
  color: #ffffff;
}
::placeholder {
  color: #cccccc;
}
</style>