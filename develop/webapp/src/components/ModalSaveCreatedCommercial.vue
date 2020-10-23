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
            作成したCMを保存
          </div>
        </div>
        <div class="modal-body col-10 m-auto pt-4">
          <div class="d-flex justify-content-between mb-4">
            <p>ファイル名</p>
            <div class="col-10 pr-0">
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="d-flex mb-3">
            <div class="col-2"></div>
            <div class="col-10 tags d-flex">
              <div class="tag">
                <div class="tag-box d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-check-1"
                    />
                    <label
                      class="custom-control-label mr-2"
                      for="custom-check-1"
                      >タグ1</label
                    >
                  </div>
                  <button class="btn-tag">
                    <svg
                      id="グループ_42"
                      data-name="グループ 42"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="6"
                      viewBox="0 0 30 6"
                    >
                      <circle
                        id="楕円形_2"
                        data-name="楕円形 2"
                        cx="3"
                        cy="3"
                        r="3"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_3"
                        data-name="楕円形 3"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(12)"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_4"
                        data-name="楕円形 4"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(24)"
                        fill="#555"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="tag">
                <div class="tag-box d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-check-2"
                    />
                    <label
                      class="custom-control-label mr-2"
                      for="custom-check-2"
                      >タグ2</label
                    >
                  </div>
                  <button class="btn-tag">
                    <svg
                      id="グループ_42"
                      data-name="グループ 42"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="6"
                      viewBox="0 0 30 6"
                    >
                      <circle
                        id="楕円形_2"
                        data-name="楕円形 2"
                        cx="3"
                        cy="3"
                        r="3"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_3"
                        data-name="楕円形 3"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(12)"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_4"
                        data-name="楕円形 4"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(24)"
                        fill="#555"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="tag">
                <div class="tag-box d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-check-3"
                    />
                    <label
                      class="custom-control-label mr-2"
                      for="custom-check-3"
                      >タグ3</label
                    >
                  </div>
                  <button class="btn-tag">
                    <svg
                      id="グループ_42"
                      data-name="グループ 42"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="6"
                      viewBox="0 0 30 6"
                    >
                      <circle
                        id="楕円形_2"
                        data-name="楕円形 2"
                        cx="3"
                        cy="3"
                        r="3"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_3"
                        data-name="楕円形 3"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(12)"
                        fill="#555"
                      />
                      <circle
                        id="楕円形_4"
                        data-name="楕円形 4"
                        cx="3"
                        cy="3"
                        r="3"
                        transform="translate(24)"
                        fill="#555"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex" style="margin-bottom: 70px">
            <div class="col-2"></div>
            <div class="col-10">
              <button class="add-tag">
                <svg
                  class="mb-1 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                >
                  <g transform="translate(-866 -179)">
                    <rect
                      width="20"
                      height="4"
                      rx="1"
                      transform="translate(866 187)"
                      fill="#007bff"
                    />
                    <rect
                      width="20"
                      height="4"
                      rx="1"
                      transform="translate(878 179) rotate(90)"
                      fill="#007bff"
                    />
                  </g>
                </svg>

                タグ追加
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <p>配信先</p>
            <div class="col-10 pr-0">
              <select class="form-control">
                <option>--------</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <p>保存先</p>
            <div class="col-10 pr-0">
              <input type="text" class="form-control" value="作成したCM2" />
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
<style scoped>
p {
  vertical-align: middle;
  margin: auto 20px auto auto;
}
button {
  border: none;
  background-color: #ffffff;
}
svg {
  margin: auto;
}
button:focus {
  outline: 0;
}
.form-control {
  height: 55px;
}
.modal-dialog {
  max-width: 800px;
}
.modal-content {
  height: 630px;
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
  width: 160px;
  height: 40px;
  border-radius: 2em;
  margin: 8px;
}
.btn-save {
  color: #ffffff;
  background-color: #578ed9;
}
.tag {
  width: 160px;
  height: 45px;
  margin-right: 12px;
  background-color: #ebebeb;
  border-radius: 3px;
}
.tag-box {
  padding: 11px 15px 10px 15px;
}
p.tag-box {
  color: #000000;
  margin-right: 20px;
}
.col-10 {
  padding: 0;
  margin-right: 0;
}
</style>