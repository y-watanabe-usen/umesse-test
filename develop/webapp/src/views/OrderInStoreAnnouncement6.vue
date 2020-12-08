<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light d-flex">
        <router-link class="navbar-brand text-white" :to="{ path: '/' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center text-white h4"
        >
          店内アナウンスを発注する
        </div>
        <div style="width: 116px; height: 46px"></div>
      </nav>
      <div class="rounded" style="height: 600px; background-color: #e6e6e6">
        <div class="p-4">
          <div class="d-flex">
            <div class="d-flex col-2 pl-0">
              <div class="step-number">1</div>
              <p style="color: #888888; line-height: 50px">基本情報</p>
            </div>
            <div class="d-flex col-2 pl-0">
              <div class="step-number">2</div>
              <h6 style="color: #888888; line-height: 50px">原稿</h6>
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
              <div class="step-number step-current">6</div>
              <h6 style="color: #578ed9; line-height: 50px">確認/発注</h6>
            </div>
          </div>
          <div style="height: 320px; overflow-y: scroll">
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">納品先</div>
              <div>Meguro Cafe様</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">CMタイトル</div>
              <div>クリスマス&emsp;バーゲンセール</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">シーン</div>
              <div>開始/終了</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">説明文</div>
              <div>クリスマスのバーゲンセールにて使用</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">原稿</div>
              <div>
                いつも当店へお越しくださいましてありがとうございます。クリスマスバーゲンのお知らせです。
              </div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">読み方</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-12">言い回しの手直し</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">アナウンサーの性別</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">アナウンサーのイメージ</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">BGM</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">BGMのジャンル</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">編集方法</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">備考</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">納期</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">計上予定日</div>
            </div>
            <hr />
            <div class="d-flex" style="line-height: 40px">
              <div class="col-3">計上予定額</div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <router-link :to="{ path: '/' }">
              <button class="btn btn-light m-4" style="width: 200px">
                キャンセル
              </button>
            </router-link>
            <router-link :to="{ path: 'ordercompleted' }">
              <button class="btn btn-primary m-4" style="width: 200px">
                発注する
              </button>
            </router-link>
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
  background-color: #578ed9;
  color: #ffffff;
}
::placeholder {
  color: #cccccc;
}
</style>