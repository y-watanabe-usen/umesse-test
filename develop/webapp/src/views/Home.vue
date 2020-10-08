<template>
  <div>
    <div class="bg-umesse">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <span class="navbar-brand mb-0 h1 text-white">U Messe {{ custCd }}</span>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link class="nav-link text-white" to="#"
                  ><svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-gear-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
                    />
                  </svg>
                  設定</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link disabled text-white" to="#"
                  ><svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-person-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                  </svg>
                  Meguro Cafe</router-link
                >
              </li>
            </ul>
          </div>
        </nav>
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card">
              <img class="card-img-top" src="../assets/_cd@2x.png" />
              <p class="title">録音する</p>
              <div class="card-body">
                <div class="list-group">
                  <router-link
                    :to="{ path: 'narration' }"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-plus-circle"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                        録音してCMを作成
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        自分で音声を録音してCM作成します。録音には外部マイクが必要になります。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-plus-circle"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                        音声合成
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        自分で音声を録音してCM作成します。録音には外部マイクが必要になります。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-play-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                          />
                        </svg>
                        録音した音声を確認
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        録音した音声やUSENの音源/BGMを組み合わせてCMを作成します。
                      </small>
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card">
              <img class="card-img-top" src="../assets/_dv@2x.png" />
              <p class="title">CMを作成する</p>
              <div class="card-body">
                <div class="list-group">
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-plus-circle"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                        素材を組み合わせてCMを作成
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        録音した音声素材や、USENの音源/BGM素材を組み合わせてCMを作成します。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-play-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                          />
                        </svg>
                        作成したCMを確認
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        オリジナルCMを確認することが出来ます。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-play-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                          />
                        </svg>
                        USEN提供の音源素材
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        USENが提供しているナレーション、BGMなどの音源素材を試聴できます。
                      </small>
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card">
              <img class="card-img-top" src="../assets/_dg@2x.png" />
              <p class="title">オーダーメイド</p>
              <div class="card-body">
                <div class="list-group">
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-plus-circle"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                        オーダーでCMを作成
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        USENがCMをオーダーメイドします。作りたいCMのイメージをお伝えください。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    :to="{ path: 'ordervoicebgm' }"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-play-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                          />
                          <path
                            d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                          />
                        </svg>
                        オーダーしたCMの確認
                      </h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        USENが提供しているナレーション、BGMなどの音源素材を試聴できます。
                      </small>
                    </p>
                    <button type="button" class="btn btn-success badge-pill">
                      <span class="badge badge-light">i</span>
                      オーダーCMが完成しました。5件
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  created () {
    store.commit('setCustCd', this.$route.query.custCd || '')
  },
  computed: {
    custCd() {
      return this.$store.state.custCd
    }
  }
};
</script>

<style scoped>
.custom-card {
  position: relative;
}
.custom-card p.title {
  position: absolute;
  color: white;
  font-size: 24px;
  top: 100px;
  left: 30%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}
.custom-card .card-body {
  position: absolute;
  padding: 0;
  top: 200px;
}
.custom-card.card {
  border: none;
  background-color: transparent;
}
</style>