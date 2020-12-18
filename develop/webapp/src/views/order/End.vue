<template>
  <div class="bg-umesse">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div
          class="collapse navbar-collapse justify-content-center h4"
        >
          店内アナウンスを発注する
        </div>
        <div style="width: 116px; height: 46px"></div>
      </nav>
      <div class="rounded bg-white" style="height: 600px;">
        <div style="padding: 190px">
          <div class="m-auto" style="width: 550px">
            <div
              class="bg-light d-flex mx-auto mb-4 rounded"
              style="height: 150px"
            >
              <div class="m-auto" style="display: inline-block">
                <div>
                  発注が完了いたしました。ありがとうございます。<br />
                  納品予定日は、2021年10月17日になります。
                </div>
                <div class="text-center">もうしばらくお待ちください。</div>
              </div>
            </div>
            <div class="d-flex">
              <router-link
                :to="{ name: 'OrderFlow1' }"
                class="w-50"
              >
                <button class="w-100 btn mr-3 shadow">
                  別のアナウンスを発注する
                </button>
              </router-link>
              <div style="width: 15px"></div>
              <router-link :to="{ name: 'Home' }" class="w-50">
                <button class="w-100 btn shadow">トップへ戻る</button>
              </router-link>
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