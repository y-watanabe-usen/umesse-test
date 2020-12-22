<template>
  <div class="bg-umesse pb-5">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          >&lt;戻る</router-link
        >
        <div class="collapse navbar-collapse justify-content-center">
          <div class="header-info bg-dark rounded">
            <div class="row">
              <div class="col">
                <button
                  class="btn btn-light m-1"
                  data-toggle="modal"
                  data-target="#playModal"
                  style="width: 140px"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="23"
                    viewBox="0 0 30 23"
                  >
                    <path
                      id="多角形_10"
                      data-name="多角形 10"
                      d="M10.1,3.654a1.5,1.5,0,0,1,2.8,0l9.319,24.309A1.5,1.5,0,0,1,20.819,30H2.181a1.5,1.5,0,0,1-1.4-2.037Z"
                      transform="translate(30) rotate(90)"
                      fill="#578ed9"
                    />
                  </svg>

                  試聴する
                </button>
              </div>
              <div class="col text-right text-white my-auto mr-3">
                約2分15秒
              </div>
            </div>
          </div>
        </div>

        <button
          class="btn btn-light"
          data-toggle="modal"
          data-target="#saveModal"
          style="width: 100px"
        >
          確定
        </button>
      </nav>

      <div class="row mt-3">
        <div class="col-2 my-auto">
          <div class="bg-white rounded open-chime py-3">
            <div class="alert alert-dark small mx-auto mb-4" role="alert">
              Openチャイム
            </div>
            <div class="text-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
              >
                <g
                  id="楕円形_5"
                  data-name="楕円形 5"
                  fill="#fff"
                  stroke="#dbdbdb"
                  stroke-width="1"
                >
                  <circle cx="50" cy="50" r="50" stroke="none" />
                  <circle cx="50" cy="50" r="49.5" fill="none" />
                </g>
                <rect
                  id="長方形_44"
                  data-name="長方形 44"
                  width="40"
                  height="8"
                  rx="1"
                  transform="translate(30 46)"
                  fill="#2d8fcc"
                />
                <rect
                  id="長方形_45"
                  data-name="長方形 45"
                  width="40"
                  height="8"
                  rx="1"
                  transform="translate(54 30) rotate(90)"
                  fill="#2d8fcc"
                />
              </svg>
            </div>
            <div class="text-center small">素材追加</div>
          </div>
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col mb-3">
              <div class="bg-white rounded bgm py-3">
                <div class="alert alert-dark small mx-auto mb-4" role="alert">
                  ナレーション 1/4
                </div>
                <div class="text-center mb-4">
                  <div class="text-center small mb-3">
                    祝日用 閉店アナウンス
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="70"
                    height="70"
                    viewBox="0 0 70 70"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <path
                          id="パス_20"
                          data-name="パス 20"
                          d="M23.655-24.332,18.725-19.4H15.931a.934.934,0,0,0-.931.931v5.588a.934.934,0,0,0,.931.931h2.794l4.929,4.929c.362.362.659.239.659-.273V-24.059c0-.512-.3-.635-.659-.273"
                          transform="translate(-15 24.54)"
                          fill="none"
                          clip-rule="evenodd"
                        />
                      </clipPath>
                      <clipPath id="clip-path-2">
                        <path
                          id="パス_24"
                          data-name="パス 24"
                          d="M0,2.748H29.271V-15.879H0Z"
                          transform="translate(0 15.879)"
                          fill="none"
                        />
                      </clipPath>
                      <clipPath id="clip-path-3">
                        <rect
                          id="長方形_12"
                          data-name="長方形 12"
                          width="31"
                          height="20"
                          transform="translate(0 -0.305)"
                          fill="none"
                        />
                      </clipPath>
                      <clipPath id="clip-path-4">
                        <path
                          id="パス_23"
                          data-name="パス 23"
                          d="M28.991-7.016A3.144,3.144,0,0,1,26.73-8L25.28-9.455V.087H3.992v-13.3H18.341A3.577,3.577,0,0,1,17.3-15.746v-.133H1.331A1.334,1.334,0,0,0,0-14.548V1.418a1.334,1.334,0,0,0,1.33,1.33h26.61a1.334,1.334,0,0,0,1.33-1.33v-8.47A2.79,2.79,0,0,1,28.991-7.016Z"
                          transform="translate(0 15.879)"
                          fill="none"
                          clip-rule="evenodd"
                        />
                      </clipPath>
                      <clipPath id="clip-path-5">
                        <path
                          id="パス_22"
                          data-name="パス 22"
                          d="M0,3.957H30.6V-16H0Z"
                          transform="translate(0 16)"
                          fill="none"
                        />
                      </clipPath>
                      <clipPath id="clip-path-6">
                        <path
                          id="パス_26"
                          data-name="パス 26"
                          d="M25.331-9.171a1.327,1.327,0,0,1-.941-.39,1.329,1.329,0,0,1,0-1.881,6.611,6.611,0,0,0,1.949-4.7,6.61,6.61,0,0,0-1.949-4.7,1.329,1.329,0,0,1,0-1.881,1.329,1.329,0,0,1,1.881,0A9.253,9.253,0,0,1,29-16.147a9.254,9.254,0,0,1-2.729,6.586,1.327,1.327,0,0,1-.941.39"
                          transform="translate(-24 23.121)"
                          fill="none"
                          clip-rule="evenodd"
                        />
                      </clipPath>
                      <clipPath id="clip-path-7">
                        <path
                          id="パス_30"
                          data-name="パス 30"
                          d="M26.878-4.389h6.586V-26H26.878Z"
                          transform="translate(-26.878 26)"
                          fill="none"
                        />
                      </clipPath>
                      <clipPath id="clip-path-8">
                        <rect
                          id="長方形_13"
                          data-name="長方形 13"
                          width="8"
                          height="24"
                          transform="translate(0.407 0.331)"
                          fill="none"
                        />
                      </clipPath>
                      <clipPath id="clip-path-9">
                        <path
                          id="パス_29"
                          data-name="パス 29"
                          d="M28.209-4.389a1.327,1.327,0,0,1-.941-.39,1.329,1.329,0,0,1,0-1.881A11.99,11.99,0,0,0,30.8-15.194a11.99,11.99,0,0,0-3.535-8.534,1.331,1.331,0,0,1,0-1.883,1.331,1.331,0,0,1,1.881,0,14.636,14.636,0,0,1,4.315,10.416A14.633,14.633,0,0,1,29.15-4.779a1.327,1.327,0,0,1-.941.39"
                          transform="translate(-26.878 26)"
                          fill="none"
                          clip-rule="evenodd"
                        />
                      </clipPath>
                      <clipPath id="clip-path-10">
                        <path
                          id="パス_28"
                          data-name="パス 28"
                          d="M26-3.382h7.983V-26H26Z"
                          transform="translate(-26 26)"
                          fill="none"
                        />
                      </clipPath>
                    </defs>
                    <g id="試聴" transform="translate(-293 -236)">
                      <g
                        id="長方形_33"
                        data-name="長方形 33"
                        transform="translate(293 236)"
                        fill="#fff"
                        stroke="#cbcbcb"
                        stroke-width="1"
                      >
                        <rect width="70" height="70" rx="35" stroke="none" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="69"
                          height="69"
                          rx="34.5"
                          fill="none"
                        />
                      </g>
                      <g
                        id="グループ_34"
                        data-name="グループ 34"
                        transform="translate(307 281)"
                      >
                        <g
                          id="グループ_22"
                          data-name="グループ 22"
                          transform="translate(19.957 -24.058)"
                          clip-path="url(#clip-path)"
                        >
                          <path
                            id="パス_19"
                            data-name="パス 19"
                            d="M10-29.54H32.619V1.491H10Z"
                            transform="translate(-16.653 22.888)"
                            fill="#578ed9"
                          />
                        </g>
                        <g
                          id="グループ_27"
                          data-name="グループ 27"
                          transform="translate(0 -12.534)"
                          clip-path="url(#clip-path-2)"
                        >
                          <g
                            id="グループ_26"
                            data-name="グループ 26"
                            transform="translate(0 -0.162)"
                            style="isolation: isolate"
                          >
                            <g
                              id="グループ_25"
                              data-name="グループ 25"
                              clip-path="url(#clip-path-3)"
                            >
                              <g
                                id="グループ_24"
                                data-name="グループ 24"
                                transform="translate(0 0.162)"
                                clip-path="url(#clip-path-4)"
                              >
                                <g
                                  id="グループ_23"
                                  data-name="グループ 23"
                                  transform="translate(0 -0.162)"
                                  clip-path="url(#clip-path-5)"
                                >
                                  <path
                                    id="パス_21"
                                    data-name="パス 21"
                                    d="M-5-20.879H37.576V11.053H-5Z"
                                    transform="translate(-1.652 14.388)"
                                    fill="#578ed9"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                        <g
                          id="グループ_28"
                          data-name="グループ 28"
                          transform="translate(31.932 -22.17)"
                          clip-path="url(#clip-path-6)"
                        >
                          <path
                            id="パス_25"
                            data-name="パス 25"
                            d="M19-28.121H37.305V-.866H19Z"
                            transform="translate(-25.652 21.469)"
                            fill="#578ed9"
                          />
                        </g>
                        <g
                          id="グループ_33"
                          data-name="グループ 33"
                          transform="translate(35.762 -26)"
                          clip-path="url(#clip-path-7)"
                        >
                          <g
                            id="グループ_32"
                            data-name="グループ 32"
                            transform="translate(-1.169 -1.331)"
                            style="isolation: isolate"
                          >
                            <g
                              id="グループ_31"
                              data-name="グループ 31"
                              clip-path="url(#clip-path-8)"
                            >
                              <g
                                id="グループ_30"
                                data-name="グループ 30"
                                transform="translate(1.169 1.331)"
                                clip-path="url(#clip-path-9)"
                              >
                                <g
                                  id="グループ_29"
                                  data-name="グループ 29"
                                  transform="translate(-1.169 0)"
                                  clip-path="url(#clip-path-10)"
                                >
                                  <path
                                    id="パス_27"
                                    data-name="パス 27"
                                    d="M21.878-31H41.77V3.916H21.878Z"
                                    transform="translate(-27.362 24.348)"
                                    fill="#578ed9"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="text-center small">00:24</div>
              </div>
              <div class="narration-footer p-1 rounded">
                <div class="row">
                  <div class="col ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28.165"
                      height="23.439"
                      viewBox="0 0 28.165 23.439"
                    >
                      <path
                        id="パス_1214"
                        data-name="パス 1214"
                        d="M12.826.884,6.815,6.9H1.136A1.139,1.139,0,0,0,0,8.03v6.815A1.138,1.138,0,0,0,1.136,15.98H6.815l6.011,6.012c.442.441.8.292.8-.332V1.215c0-.623-.361-.773-.8-.331"
                        transform="translate(0 0.28)"
                        fill="#588fd9"
                      />
                      <path
                        id="パス_1215"
                        data-name="パス 1215"
                        d="M14.811,23.439a.909.909,0,0,1-.455-1.7,11.565,11.565,0,0,0,0-20.048A.908.908,0,0,1,15.265.123a13.382,13.382,0,0,1,0,23.194.9.9,0,0,1-.454.123"
                        transform="translate(6.195 0)"
                        fill="#588fd9"
                      />
                      <path
                        id="パス_1216"
                        data-name="パス 1216"
                        d="M13.241,18.3a.908.908,0,0,1-.455-1.694,7.03,7.03,0,0,0,0-12.187A.908.908,0,0,1,13.7,2.842a8.846,8.846,0,0,1,0,15.332.906.906,0,0,1-.454.121"
                        transform="translate(5.496 1.211)"
                        fill="#588fd9"
                      />
                      <path
                        id="パス_1217"
                        data-name="パス 1217"
                        d="M11.667,13.14a.909.909,0,0,1-.457-1.7,2.47,2.47,0,0,0,0-4.3.909.909,0,0,1,.911-1.573,4.287,4.287,0,0,1,0,7.449.9.9,0,0,1-.454.123"
                        transform="translate(4.794 2.426)"
                        fill="#588fd9"
                      />
                    </svg>

                    100%
                  </div>
                  <div class="col text-right mr-2">
                    <button
                      class="btn btn-link dropdown-toggle p-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        id="メニュー"
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
                          fill="#578ed9"
                        />
                        <circle
                          id="楕円形_3"
                          data-name="楕円形 3"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(12)"
                          fill="#578ed9"
                        />
                        <circle
                          id="楕円形_4"
                          data-name="楕円形 4"
                          cx="3"
                          cy="3"
                          r="3"
                          transform="translate(24)"
                          fill="#578ed9"
                        />
                      </svg>
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#"
                        >自分で録音して音声と入れ替える</a
                      >
                      <a class="dropdown-item" href="#"
                        >他のナレーションと入れ替える</a
                      >
                      <a class="dropdown-item" href="#"
                        >合成音声(テンプレートから)入れ替える</a
                      >
                      <a class="dropdown-item" href="#"
                        >合成音声(フリー入力から)入れ替える</a
                      >
                      <a class="dropdown-item" href="#">削除</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-3">
              <div class="bg-white rounded bgm py-3" style="height: 269px">
                <div class="alert alert-dark small mx-auto mb-4" role="alert">
                  ナレーション 2/4
                </div>
                <div class="text-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <g
                      id="楕円形_5"
                      data-name="楕円形 5"
                      fill="#fff"
                      stroke="#dbdbdb"
                      stroke-width="1"
                    >
                      <circle cx="50" cy="50" r="50" stroke="none" />
                      <circle cx="50" cy="50" r="49.5" fill="none" />
                    </g>
                    <rect
                      id="長方形_44"
                      data-name="長方形 44"
                      width="40"
                      height="8"
                      rx="1"
                      transform="translate(30 46)"
                      fill="#2d8fcc"
                    />
                    <rect
                      id="長方形_45"
                      data-name="長方形 45"
                      width="40"
                      height="8"
                      rx="1"
                      transform="translate(54 30) rotate(90)"
                      fill="#2d8fcc"
                    />
                  </svg>
                </div>
                <div class="text-center small">素材追加</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <div class="bg-white rounded bgm py-3">
                <div class="alert alert-dark small mx-auto mb-4" role="alert">
                  BGM
                </div>
                <div class="text-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <g
                      id="楕円形_5"
                      data-name="楕円形 5"
                      fill="#fff"
                      stroke="#dbdbdb"
                      stroke-width="1"
                    >
                      <circle cx="50" cy="50" r="50" stroke="none" />
                      <circle cx="50" cy="50" r="49.5" fill="none" />
                    </g>
                    <rect
                      id="長方形_44"
                      data-name="長方形 44"
                      width="40"
                      height="8"
                      rx="1"
                      transform="translate(30 46)"
                      fill="#2d8fcc"
                    />
                    <rect
                      id="長方形_45"
                      data-name="長方形 45"
                      width="40"
                      height="8"
                      rx="1"
                      transform="translate(54 30) rotate(90)"
                      fill="#2d8fcc"
                    />
                  </svg>
                </div>
                <div class="text-center small">素材追加</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 my-auto">
          <div class="bg-white rounded end-chime py-3">
            <div class="alert alert-dark small mx-auto mb-4" role="alert">
              Endチャイム
            </div>
            <div class="text-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
              >
                <g
                  id="楕円形_5"
                  data-name="楕円形 5"
                  fill="#fff"
                  stroke="#dbdbdb"
                  stroke-width="1"
                >
                  <circle cx="50" cy="50" r="50" stroke="none" />
                  <circle cx="50" cy="50" r="49.5" fill="none" />
                </g>
                <rect
                  id="長方形_44"
                  data-name="長方形 44"
                  width="40"
                  height="8"
                  rx="1"
                  transform="translate(30 46)"
                  fill="#2d8fcc"
                />
                <rect
                  id="長方形_45"
                  data-name="長方形 45"
                  width="40"
                  height="8"
                  rx="1"
                  transform="translate(54 30) rotate(90)"
                  fill="#2d8fcc"
                />
              </svg>
            </div>
            <div class="text-center small">素材追加</div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div
      class="modal fade bd-try-modal-lg"
      id="playModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">試聴</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <button type="button" class="btn btn-light shadow btn-play">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-play-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                    />
                  </svg>
                  再生
                </button>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col text-left" style="font-size: 17px">
                    {{ state.playbackTimeHms }}
                  </div>
                  <div class="col text-right" style="font-size: 17px">
                    {{ state.durationHms }}
                  </div>
                </div>
                <meter
                  min="0"
                  :max="state.duration"
                  class="w-100"
                  :value="state.playbackTime"
                ></meter>
              </div>
            </div>
            <div class="row pt-5">
              <div class="col-4">
                タブレット音量<br />
                <small>タブレットのスピーカーから音が出ます。</small>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col text-left">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-volume-down-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.717 3.55A.5.5 0 0 1 9 4v8a.5.5 0 0 1-.812.39L5.825 10.5H3.5A.5.5 0 0 1 3 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                      />
                      <path
                        d="M10.707 11.182A4.486 4.486 0 0 0 12.025 8a4.486 4.486 0 0 0-1.318-3.182L10 5.525A3.489 3.489 0 0 1 11.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"
                      />
                    </svg>
                  </div>
                  <div class="col text-center">volume 32</div>
                  <div class="col text-right">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-volume-up-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                      />
                      <path
                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                      />
                      <path
                        d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                      />
                    </svg>
                  </div>
                </div>
                <meter min="0" max="15" class="w-100" value="1"></meter>
              </div>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-light btn-close"
              data-dismiss="modal"
              @click="stop"
            >
              終了
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade bd-try-modal-lg"
      id="saveModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">保存しますか?</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-2">タイトル</div>
              <div class="col-10">
                <input class="form-control" type="text" />
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-2">説明</div>
              <div class="col-10">
                <textarea class="form-control"></textarea>
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-2">シーン</div>
              <div class="col-10">
                <select class="form-control w-100">
                  <option v-for="scene in state.scenes" :key="scene">
                    {{ scene }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-2">アップロード先</div>
              <div class="col-10">
                <select class="form-control w-100">
                  <option v-for="upload in state.uploads" :key="upload">
                    {{ upload }}
                  </option>
                </select>
                あとで、管理画面からアップロード先を変更することが出来ます。
              </div>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-light btn-close"
              data-dismiss="modal"
            >
              キャンセル
            </button>
            <button
              type="button"
              class="btn btn-primary btn-save"
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#savedModal"
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="savedModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="savedModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="savedModalLabel">保存完了</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">作成が完了いたしました。</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              編集の続きをする
            </button>
            <router-link
              class="btn btn-primary btn-save"
              data-dismiss="modal"
              :to="{ name: 'Home' }"
            >
              終了する
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      scenes: ["開店", "閉店", "etc"],
      uploads: ["U MUSIC", "etc"],
    });

    return {
      state,
    };
  },
};
</script>

<style scoped>
.bg-menu {
  background: #d9d9d9;
}
.btn-menu {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  text-decoration: none;
}
.btn-try,
.btn-edit {
  width: 100px;
  height: 40px;
}
.btn-edit {
  margin-left: 20px;
}
.btn:focus {
  box-shadow: none;
}
.btn-play,
.btn-close {
  width: 200px;
}
.btn-link {
  color: #333;
}
.dropdown-toggle::after {
  content: none;
}

.header-info {
  width: 300px;
}
.narration-footer {
  background: #ecf2fa;
}
.open-chime .alert,
.narration .alert,
.bgm .alert,
.end-chime .alert {
  border-radius: 2em;
  padding: 5px;
  text-align: center;
  width: 120px;
}
</style>