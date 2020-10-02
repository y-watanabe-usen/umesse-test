<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light nav-bg-umesse">
      <span class="navbar-brand mb-0 h1 text-white">U Messe</span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="#">設定</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link disabled text-white" to="#">Meguro Cafe</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="album py-5 bg-umesse">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card">
              <img class="card-img-top" src="../assets/_cd@2x.png" />
              <p class="title">録音する</p>
              <div class="card-body">
                <div class="list-group">
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">録音してCMを作成</h5>
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
                      <h5 class="mb-1">音声合成</h5>
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
                      <h5 class="mb-1">録音した音声を確認</h5>
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
                      <h5 class="mb-1">素材を組み合わせてCMを作成</h5>
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
                      <h5 class="mb-1">作成したCMを確認</h5>
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
                      <h5 class="mb-1">USEN提供の音源素材</h5>
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
                      <h5 class="mb-1">オーダーでCMを作成</h5>
                    </div>
                    <p class="mb-1 text-left">
                      <small class="text-muted">
                        USENがCMをオーダーメイドします。作りたいCMのイメージをお伝えください。
                      </small>
                    </p>
                  </router-link>
                  <router-link
                    to="#"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">オーダーしたCMの確認</h5>
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
.bg-umesse {
  background: -moz-linear-gradient(top, #525e72, #7c8389);
  background: -webkit-linear-gradient(top, #525e72, #7c8389);
  background: linear-gradient(to bottom, #525e72, #7c8389);
}
.nav-bg-umesse {
  background: #525e72;
}
</style>