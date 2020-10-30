<template>
  <div
    class="modal fade"
    id="modal-save"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header" style="height: 70px">
          <div class="modal-title text-center" style="margin: auto">
            保存しますか？
          </div>
          <button data-dismiss="modal" class="bg-white mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.769"
              height="15.366"
              viewBox="0 0 14.769 15.366"
            >
              <g transform="translate(-1385.086 -129.086)">
                <line
                  x1="11.941"
                  y2="12.539"
                  transform="translate(1386.5 130.5)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-width="2"
                />
                <line
                  x2="11.941"
                  y2="12.539"
                  transform="translate(1386.5 130.5)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </g>
            </svg>
          </button>
        </div>
        <div class="modal-body col-11 m-auto pt-4">
          <div class="d-flex justify-content-between mb-3">
            <div>
              <p class="mb-0">タイトル</p>
              <p class="m-0 text-primary" style="font-size: 0.9em">※必須</p>
            </div>
            <div class="col-10 pr-0">
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <p class="mt-2">説明</p>
            <div class="col-10 pr-0">
              <textarea class="form-control" style="height: 120px"></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <p>開始/終了</p>
            <div class="col-10 pr-0">
              <form action="" class="form-control" style="padding: 14px">
                <select name="year" class="select-time">
                  <option v-for="year in 5" :key="year">
                    {{ year + 2019 }}
                  </option>
                </select>
                年
                <select name="month" class="select-time">
                  <option v-for="month in 12" :key="month">{{ month }}</option>
                </select>
                月
                <select name="day" class="select-time">
                  <option v-for="day in 31" :key="day">{{ day }}</option>
                </select>
                日
                <select name="hour" class="select-time">
                  <option v-for="number in numbers" :key="number">
                    {{ number }}
                  </option>
                  <option v-for="hour in 14" :key="hour">{{ hour + 9 }}</option>
                </select>
                時
                <select name="minute" class="select-time">
                  <option v-for="number in numbers" :key="number">
                    {{ number }}
                  </option>
                  <option v-for="minute in 50" :key="minute">
                    {{ minute + 9 }}
                  </option>
                </select>
                分 -
                <select name="year" class="select-time">
                  <option v-for="year in 5" :key="year">
                    {{ year + 2019 }}
                  </option>
                </select>
                年
                <select name="month" class="select-time">
                  <option v-for="month in 12" :key="month">{{ month }}</option>
                </select>
                月
                <select name="day" class="select-time">
                  <option v-for="day in 31" :key="day">{{ day }}</option>
                </select>
                日
                <select name="hour" class="select-time">
                  <option v-for="number in numbers" :key="number">
                    {{ number }}
                  </option>
                  <option v-for="hour in 14" :key="hour">{{ hour + 9 }}</option>
                </select>
                時
                <select name="minute" class="select-time">
                  <option v-for="number in numbers" :key="number">
                    {{ number }}
                  </option>
                  <option v-for="minute in 50" :key="minute">
                    {{ minute + 9 }}
                  </option>
                </select>
                分
              </form>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <p>配信先</p>
            <div class="col-10 pr-0">
              <input type="text" class="form-control" value="U-MUSIC" />
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button class="btn-edit shadow" data-dismiss="modal">
            キャンセル
          </button>
          <button class="btn-edit btn-save shadow">保存する</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      numbers: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
    };
  },
};
</script>
<style scoped>
p {
  vertical-align: middle;
  margin-top: 15px;
}
button {
  border: none;
  background-color: #ffffff;
}
svg {
  margin: auto;
}
.select-time {
  border: none;
  -webkit-appearance: none;
}
button:focus {
  outline: 0;
}
option {
  text-decoration: none;
}
.form-control {
  height: 55px;
}
.modal-dialog {
  max-width: 800px;
}
.modal-content {
  height: 560px;
}
button.btn-tag {
  background-color: transparent;
  padding: 0;
  line-height: 0.5em;
}
button.add-tag {
  height: 45px;
  width: 125px;
  background-color: #ebebeb;
  border-radius: 3px;
}
.btn-edit {
  font-size: 13px;
  width: 210px;
  height: 40px;
  margin: 8px;
  border-radius: 3px;
}
.btn-save {
  color: #ffffff;
  /* background-color: #578ed9; */
  background-color: #adadad;
}
.col-10 {
  padding: 0;
  margin-right: 0;
}
</style>