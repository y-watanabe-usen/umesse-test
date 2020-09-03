<template>
  <div id="CM">
    <svg class="_10">
      <rect id="_10" rx="8" ry="8" x="0" y="0" width="640" height="260" />
    </svg>
    <svg class="_17">
      <rect id="_17" rx="8" ry="8" x="0" y="0" width="640" height="260" />
    </svg>
    <svg class="_19">
      <rect id="_19" rx="8" ry="8" x="0" y="0" width="268" height="260" />
    </svg>
    <svg class="_21">
      <rect id="_21" rx="8" ry="8" x="0" y="0" width="268" height="260" />
    </svg>
    <div id="_83">
      <svg class="_10_bw" viewBox="0 0 32 32">
        <path
          id="_10_bw"
          d="M 16 0 L 13.09091091156006 2.909090995788574 L 24.1038990020752 13.92207813262939 L 0 13.92207813262939 L 0 18.07792282104492 L 24.1038990020752 18.07792282104492 L 13.09091091156006 29.09090995788574 L 16 32 L 32 16 L 16 0 Z"
        />
      </svg>
    </div>
    <div id="_46">
      <div id="CM_bx">
        <span>素材選択</span>
      </div>
      <svg class="_1">
        <ellipse id="_1" rx="16" ry="16" cx="16" cy="16" />
      </svg>
    </div>
    <div onclick="application.goToTargetView(event)" id="_47">
      <div id="CM_b">
        <span>CM情報入力</span>
      </div>
      <svg class="_1_b">
        <ellipse id="_1_b" rx="16" ry="16" cx="16" cy="16" />
      </svg>
    </div>
    <div id="play">
      <svg class="Oval">
        <ellipse id="Oval" rx="27" ry="27" cx="27" cy="27" />
      </svg>
      <svg class="Shape_b" viewBox="0 0 15.709 20.197">
        <path
          id="Shape_b"
          d="M 15.49017715454102 9.70267391204834 L 0.7945759296417236 0.08462965488433838 C 0.6390053033828735 -0.01684070937335491 0.4373208284378052 -0.02742055803537369 0.2711085081100464 0.05481372028589249 C 0.1043894439935684 0.1380098015069962 0 0.3015165627002716 0 0.4804121851921082 L 0 19.71650123596191 C 0 19.89539527893066 0.1043894439935684 20.05938339233398 0.2711085081100464 20.14258003234863 C 0.3450932502746582 20.17912864685059 0.4261724352836609 20.19740295410156 0.5067448616027832 20.19740295410156 C 0.6075870990753174 20.19740295410156 0.7079225778579712 20.16854858398438 0.7945759296417236 20.11228370666504 L 15.49017715454102 10.49423885345459 C 15.6275053024292 10.40431022644043 15.70909118652344 10.25667285919189 15.70909118652344 10.09845638275146 C 15.70909118652344 9.940239906311035 15.62699794769287 9.7926025390625 15.49017715454102 9.70267391204834 Z"
        />
      </svg>
    </div>
    <div id="OP">
      <span>OPチャイム</span>
    </div>
    <div id="ED">
      <span>EDチャイム</span>
    </div>
    <div id="_cd">
      <span>ナレーション</span>
    </div>
    <div id="BGM">
      <span>BGM</span>
    </div>
    <div id="_48" @click="show">
      <svg class="_31">
        <rect id="_31" rx="4" ry="4" x="0" y="0" width="180" height="180" />
      </svg>
      <div id="_ch">
        <span>追加する</span>
      </div>
      <div id="Icon_ionic-ios-add-circle-outl">
        <svg class="_4" viewBox="10.512 10.512 20.481 20.481">
          <path
            id="_4"
            d="M 29.45402908325195 19.21364212036133 L 22.29056549072266 19.21364212036133 L 22.29056549072266 12.05018043518066 C 22.29056549072266 11.20402717590332 21.59825706481934 10.51171875 20.75210380554199 10.51171875 C 19.90595054626465 10.51171875 19.21364212036133 11.20402717590332 19.21364212036133 12.05018043518066 L 19.21364212036133 19.21364212036133 L 12.05018043518066 19.21364212036133 C 11.20402717590332 19.21364212036133 10.51171875 19.79056549072266 10.51171875 20.75210380554199 C 10.51171875 21.71364212036133 11.23287296295166 22.29056549072266 12.05018043518066 22.29056549072266 C 12.86748886108398 22.29056549072266 19.21364212036133 22.29056549072266 19.21364212036133 22.29056549072266 C 19.21364212036133 22.29056549072266 19.21364212036133 28.54056549072266 19.21364212036133 29.45402908325195 C 19.21364212036133 30.36748886108398 19.88671875 30.99248886108398 20.75210380554199 30.99248886108398 C 21.61748886108398 30.99248886108398 22.29056549072266 30.3001823425293 22.29056549072266 29.45402908325195 L 22.29056549072266 22.29056549072266 L 29.45402908325195 22.29056549072266 C 30.3001823425293 22.29056549072266 30.99248886108398 21.59825706481934 30.99248886108398 20.75210380554199 C 30.99248886108398 19.90595054626465 30.3001823425293 19.21364212036133 29.45402908325195 19.21364212036133 Z"
          />
        </svg>
        <svg class="_5" viewBox="3.375 3.375 40 40">
          <path
            id="_5"
            d="M 23.375 6.067307949066162 C 28 6.067307949066162 32.34615707397461 7.865384578704834 35.61538696289063 11.13461685180664 C 38.88461685180664 14.40384674072266 40.68269348144531 18.75 40.68269348144531 23.375 C 40.68269348144531 28 38.88461685180664 32.34615707397461 35.61538696289063 35.61538696289063 C 32.34615707397461 38.88461685180664 28 40.68269348144531 23.375 40.68269348144531 C 18.75 40.68269348144531 14.40384674072266 38.88461685180664 11.13461685180664 35.61538696289063 C 7.865384578704834 32.34615707397461 6.067307949066162 28 6.067307949066162 23.375 C 6.067307949066162 18.75000190734863 7.865384578704834 14.40384674072266 11.13461685180664 11.13461685180664 C 14.40384674072266 7.865384578704834 18.75 6.067307949066162 23.375 6.067307949066162 M 23.375 3.375 C 12.32692337036133 3.375 3.375 12.32692337036133 3.375 23.375 C 3.375 34.42308044433594 12.32692337036133 43.37500381469727 23.375 43.37500381469727 C 34.42308044433594 43.37500381469727 43.37500381469727 34.42308044433594 43.37500381469727 23.375 C 43.37500381469727 12.32692337036133 34.42308044433594 3.375 23.375 3.375 L 23.375 3.375 Z"
          />
        </svg>
      </div>
    </div>
    <div id="_51" @click="show">
      <svg class="_31_cm">
        <rect id="_31_cm" rx="4" ry="4" x="0" y="0" width="180" height="180" />
      </svg>
      <div id="_cn">
        <span>追加する</span>
      </div>
      <div id="Icon_ionic-ios-add-circle-outl_co">
        <svg class="_4_cp" viewBox="10.512 10.512 20.481 20.481">
          <path
            id="_4_cp"
            d="M 29.45402908325195 19.21364212036133 L 22.29056549072266 19.21364212036133 L 22.29056549072266 12.05018043518066 C 22.29056549072266 11.20402717590332 21.59825706481934 10.51171875 20.75210380554199 10.51171875 C 19.90595054626465 10.51171875 19.21364212036133 11.20402717590332 19.21364212036133 12.05018043518066 L 19.21364212036133 19.21364212036133 L 12.05018043518066 19.21364212036133 C 11.20402717590332 19.21364212036133 10.51171875 19.79056549072266 10.51171875 20.75210380554199 C 10.51171875 21.71364212036133 11.23287296295166 22.29056549072266 12.05018043518066 22.29056549072266 C 12.86748886108398 22.29056549072266 19.21364212036133 22.29056549072266 19.21364212036133 22.29056549072266 C 19.21364212036133 22.29056549072266 19.21364212036133 28.54056549072266 19.21364212036133 29.45402908325195 C 19.21364212036133 30.36748886108398 19.88671875 30.99248886108398 20.75210380554199 30.99248886108398 C 21.61748886108398 30.99248886108398 22.29056549072266 30.3001823425293 22.29056549072266 29.45402908325195 L 22.29056549072266 22.29056549072266 L 29.45402908325195 22.29056549072266 C 30.3001823425293 22.29056549072266 30.99248886108398 21.59825706481934 30.99248886108398 20.75210380554199 C 30.99248886108398 19.90595054626465 30.3001823425293 19.21364212036133 29.45402908325195 19.21364212036133 Z"
          />
        </svg>
        <svg class="_5_cq" viewBox="3.375 3.375 40 40">
          <path
            id="_5_cq"
            d="M 23.375 6.067307949066162 C 28 6.067307949066162 32.34615707397461 7.865384578704834 35.61538696289063 11.13461685180664 C 38.88461685180664 14.40384674072266 40.68269348144531 18.75 40.68269348144531 23.375 C 40.68269348144531 28 38.88461685180664 32.34615707397461 35.61538696289063 35.61538696289063 C 32.34615707397461 38.88461685180664 28 40.68269348144531 23.375 40.68269348144531 C 18.75 40.68269348144531 14.40384674072266 38.88461685180664 11.13461685180664 35.61538696289063 C 7.865384578704834 32.34615707397461 6.067307949066162 28 6.067307949066162 23.375 C 6.067307949066162 18.75000190734863 7.865384578704834 14.40384674072266 11.13461685180664 11.13461685180664 C 14.40384674072266 7.865384578704834 18.75 6.067307949066162 23.375 6.067307949066162 M 23.375 3.375 C 12.32692337036133 3.375 3.375 12.32692337036133 3.375 23.375 C 3.375 34.42308044433594 12.32692337036133 43.37500381469727 23.375 43.37500381469727 C 34.42308044433594 43.37500381469727 43.37500381469727 34.42308044433594 43.37500381469727 23.375 C 43.37500381469727 12.32692337036133 34.42308044433594 3.375 23.375 3.375 L 23.375 3.375 Z"
          />
        </svg>
      </div>
    </div>
    <div id="_50" @click="show">
      <svg class="_31_cs">
        <rect id="_31_cs" rx="4" ry="4" x="0" y="0" width="180" height="180" />
      </svg>
      <div id="_ct">
        <span>追加する</span>
      </div>
      <div id="Icon_ionic-ios-add-circle-outl_cu">
        <svg class="_4_cv" viewBox="10.512 10.512 20.481 20.481">
          <path
            id="_4_cv"
            d="M 29.45402908325195 19.21364212036133 L 22.29056549072266 19.21364212036133 L 22.29056549072266 12.05018043518066 C 22.29056549072266 11.20402717590332 21.59825706481934 10.51171875 20.75210380554199 10.51171875 C 19.90595054626465 10.51171875 19.21364212036133 11.20402717590332 19.21364212036133 12.05018043518066 L 19.21364212036133 19.21364212036133 L 12.05018043518066 19.21364212036133 C 11.20402717590332 19.21364212036133 10.51171875 19.79056549072266 10.51171875 20.75210380554199 C 10.51171875 21.71364212036133 11.23287296295166 22.29056549072266 12.05018043518066 22.29056549072266 C 12.86748886108398 22.29056549072266 19.21364212036133 22.29056549072266 19.21364212036133 22.29056549072266 C 19.21364212036133 22.29056549072266 19.21364212036133 28.54056549072266 19.21364212036133 29.45402908325195 C 19.21364212036133 30.36748886108398 19.88671875 30.99248886108398 20.75210380554199 30.99248886108398 C 21.61748886108398 30.99248886108398 22.29056549072266 30.3001823425293 22.29056549072266 29.45402908325195 L 22.29056549072266 22.29056549072266 L 29.45402908325195 22.29056549072266 C 30.3001823425293 22.29056549072266 30.99248886108398 21.59825706481934 30.99248886108398 20.75210380554199 C 30.99248886108398 19.90595054626465 30.3001823425293 19.21364212036133 29.45402908325195 19.21364212036133 Z"
          />
        </svg>
        <svg class="_5_cw" viewBox="3.375 3.375 40 40">
          <path
            id="_5_cw"
            d="M 23.375 6.067307949066162 C 28 6.067307949066162 32.34615707397461 7.865384578704834 35.61538696289063 11.13461685180664 C 38.88461685180664 14.40384674072266 40.68269348144531 18.75 40.68269348144531 23.375 C 40.68269348144531 28 38.88461685180664 32.34615707397461 35.61538696289063 35.61538696289063 C 32.34615707397461 38.88461685180664 28 40.68269348144531 23.375 40.68269348144531 C 18.75 40.68269348144531 14.40384674072266 38.88461685180664 11.13461685180664 35.61538696289063 C 7.865384578704834 32.34615707397461 6.067307949066162 28 6.067307949066162 23.375 C 6.067307949066162 18.75000190734863 7.865384578704834 14.40384674072266 11.13461685180664 11.13461685180664 C 14.40384674072266 7.865384578704834 18.75 6.067307949066162 23.375 6.067307949066162 M 23.375 3.375 C 12.32692337036133 3.375 3.375 12.32692337036133 3.375 23.375 C 3.375 34.42308044433594 12.32692337036133 43.37500381469727 23.375 43.37500381469727 C 34.42308044433594 43.37500381469727 43.37500381469727 34.42308044433594 43.37500381469727 23.375 C 43.37500381469727 12.32692337036133 34.42308044433594 3.375 23.375 3.375 L 23.375 3.375 Z"
          />
        </svg>
      </div>
    </div>
    <div id="_49" @click="show">
      <svg class="_31_cy">
        <rect id="_31_cy" rx="4" ry="4" x="0" y="0" width="180" height="180" />
      </svg>
      <div id="_cz">
        <span>追加する</span>
      </div>
      <div id="Icon_ionic-ios-add-circle-outl_c">
        <svg class="_4_c" viewBox="10.512 10.512 20.481 20.481">
          <path
            id="_4_c"
            d="M 29.45402908325195 19.21364212036133 L 22.29056549072266 19.21364212036133 L 22.29056549072266 12.05018043518066 C 22.29056549072266 11.20402717590332 21.59825706481934 10.51171875 20.75210380554199 10.51171875 C 19.90595054626465 10.51171875 19.21364212036133 11.20402717590332 19.21364212036133 12.05018043518066 L 19.21364212036133 19.21364212036133 L 12.05018043518066 19.21364212036133 C 11.20402717590332 19.21364212036133 10.51171875 19.79056549072266 10.51171875 20.75210380554199 C 10.51171875 21.71364212036133 11.23287296295166 22.29056549072266 12.05018043518066 22.29056549072266 C 12.86748886108398 22.29056549072266 19.21364212036133 22.29056549072266 19.21364212036133 22.29056549072266 C 19.21364212036133 22.29056549072266 19.21364212036133 28.54056549072266 19.21364212036133 29.45402908325195 C 19.21364212036133 30.36748886108398 19.88671875 30.99248886108398 20.75210380554199 30.99248886108398 C 21.61748886108398 30.99248886108398 22.29056549072266 30.3001823425293 22.29056549072266 29.45402908325195 L 22.29056549072266 22.29056549072266 L 29.45402908325195 22.29056549072266 C 30.3001823425293 22.29056549072266 30.99248886108398 21.59825706481934 30.99248886108398 20.75210380554199 C 30.99248886108398 19.90595054626465 30.3001823425293 19.21364212036133 29.45402908325195 19.21364212036133 Z"
          />
        </svg>
        <svg class="_5_c" viewBox="3.375 3.375 40 40">
          <path
            id="_5_c"
            d="M 23.375 6.067307949066162 C 28 6.067307949066162 32.34615707397461 7.865384578704834 35.61538696289063 11.13461685180664 C 38.88461685180664 14.40384674072266 40.68269348144531 18.75 40.68269348144531 23.375 C 40.68269348144531 28 38.88461685180664 32.34615707397461 35.61538696289063 35.61538696289063 C 32.34615707397461 38.88461685180664 28 40.68269348144531 23.375 40.68269348144531 C 18.75 40.68269348144531 14.40384674072266 38.88461685180664 11.13461685180664 35.61538696289063 C 7.865384578704834 32.34615707397461 6.067307949066162 28 6.067307949066162 23.375 C 6.067307949066162 18.75000190734863 7.865384578704834 14.40384674072266 11.13461685180664 11.13461685180664 C 14.40384674072266 7.865384578704834 18.75 6.067307949066162 23.375 6.067307949066162 M 23.375 3.375 C 12.32692337036133 3.375 3.375 12.32692337036133 3.375 23.375 C 3.375 34.42308044433594 12.32692337036133 43.37500381469727 23.375 43.37500381469727 C 34.42308044433594 43.37500381469727 43.37500381469727 34.42308044433594 43.37500381469727 23.375 C 43.37500381469727 12.32692337036133 34.42308044433594 3.375 23.375 3.375 L 23.375 3.375 Z"
          />
        </svg>
      </div>
    </div>
    <modal name="modal-content" width="80%" height="auto" :scrollable="true" :draggable="true">
      <p>モーダルウィンドウで表示されるコンテンツ</p>
    </modal>
  </div>
</template>

<script>
import api from '@/plugins/axios/api'

export default {
  methods: {
    show() {
      this.$modal.show("modal-content");
      // api.list().then((response) => {
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // });
    },
    hide() {
      this.$modal.hide("modal-content");
    },
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
}
#CM {
  position: absolute;
  width: 1280px;
  height: 800px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  --web-view-name: CM作成;
  --web-view-id: CM;
  --web-scale-on-resize: true;
  --web-enable-deep-linking: true;
}
#_10 {
  fill: rgba(210, 210, 210, 1);
}
._10 {
  position: absolute;
  overflow: visible;
  width: 640px;
  height: 260px;
  left: 320px;
  top: 96px;
}
#_17 {
  fill: rgba(210, 210, 210, 1);
}
._17 {
  position: absolute;
  overflow: visible;
  width: 640px;
  height: 260px;
  left: 320px;
  top: 376px;
}
#_19 {
  fill: rgba(210, 210, 210, 1);
}
._19 {
  position: absolute;
  overflow: visible;
  width: 268px;
  height: 260px;
  left: 980px;
  top: 237px;
}
#_21 {
  fill: rgba(210, 210, 210, 1);
}
._21 {
  position: absolute;
  overflow: visible;
  width: 268px;
  height: 260px;
  left: 32px;
  top: 237px;
}
#_83 {
  transform: matrix(1, 0, 0, 1, 28, 36) rotate(180deg);
  transform-origin: center;
  position: absolute;
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
  overflow: visible;
}
#_10_bw {
  fill: rgba(128, 128, 128, 1);
}
._10_bw {
  overflow: visible;
  position: absolute;
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_46 {
  position: absolute;
  width: 136px;
  height: 32px;
  left: 249px;
  top: 36px;
  overflow: visible;
}
#_1 {
  fill: rgba(89, 89, 89, 1);
}
._1 {
  position: absolute;
  overflow: visible;
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
}
#_47 {
  position: absolute;
  width: 172px;
  height: 32px;
  left: 889px;
  top: 36px;
  overflow: visible;
  --web-animation: fadein 0.3s ease-out;
  --web-action-type: page;
  --web-action-target: CM____.html;
  cursor: pointer;
}
#CM_b {
  left: 40px;
  top: 0px;
  position: absolute;
  overflow: visible;
  width: 133px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: rgba(210, 210, 210, 1);
}
#CM_bx {
  left: 40px;
  top: 0px;
  position: absolute;
  overflow: visible;
  width: 135px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: rgba(89, 89, 89, 1);
}
#_1_b {
  fill: rgba(210, 210, 210, 1);
}
._1_b {
  position: absolute;
  overflow: visible;
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
}
#play {
  position: absolute;
  width: 54px;
  height: 54px;
  left: 613px;
  top: 686px;
  overflow: visible;
}
#Oval {
  fill: rgba(188, 188, 188, 1);
}
.Oval {
  position: absolute;
  overflow: visible;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 0px;
}
#Shape_b {
  fill: rgba(255, 255, 255, 1);
}
.Shape_b {
  overflow: visible;
  position: absolute;
  width: 15.709px;
  height: 20.197px;
  left: 20.618px;
  top: 16.691px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#OP {
  left: 52px;
  top: 255px;
  position: absolute;
  overflow: visible;
  width: 86px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(38, 38, 38, 1);
}
#ED {
  left: 1012px;
  top: 255px;
  position: absolute;
  overflow: visible;
  width: 84px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(38, 38, 38, 1);
}
#_cd {
  left: 340px;
  top: 114px;
  position: absolute;
  overflow: visible;
  width: 87px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(38, 38, 38, 1);
}
#BGM {
  left: 353px;
  top: 394px;
  position: absolute;
  overflow: visible;
  width: 44px;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(38, 38, 38, 1);
}
#_48 {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 546px;
  top: 158px;
  overflow: visible;
}
#_31 {
  fill: transparent;
  stroke: rgba(255, 255, 255, 1);
  stroke-width: 2px;
  stroke-linejoin: miter;
  stroke-linecap: butt;
  stroke-dasharray: 12;
  stroke-dashoffset: 0;
  stroke-miterlimit: 4;
  shape-rendering: auto;
}
._31 {
  position: absolute;
  overflow: visible;
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
}
#_ch {
  left: 58px;
  top: 106px;
  position: absolute;
  overflow: visible;
  width: 73px;
  white-space: nowrap;
  text-align: center;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
}
#Icon_ionic-ios-add-circle-outl {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 74px;
  top: 48px;
  overflow: visible;
}
#_4 {
  fill: rgba(255, 255, 255, 1);
}
._4 {
  overflow: visible;
  position: absolute;
  width: 20.481px;
  height: 20.481px;
  left: 9.76px;
  top: 9.76px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_5 {
  fill: rgba(255, 255, 255, 1);
}
._5 {
  overflow: visible;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0px;
  top: 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_51 {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 546px;
  top: 438px;
  overflow: visible;
}
#_31_cm {
  fill: transparent;
  stroke: rgba(255, 255, 255, 1);
  stroke-width: 2px;
  stroke-linejoin: miter;
  stroke-linecap: butt;
  stroke-dasharray: 12;
  stroke-dashoffset: 0;
  stroke-miterlimit: 4;
  shape-rendering: auto;
}
._31_cm {
  position: absolute;
  overflow: visible;
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
}
#_cn {
  left: 58px;
  top: 106px;
  position: absolute;
  overflow: visible;
  width: 73px;
  white-space: nowrap;
  text-align: center;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
}
#Icon_ionic-ios-add-circle-outl_co {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 74px;
  top: 48px;
  overflow: visible;
}
#_4_cp {
  fill: rgba(255, 255, 255, 1);
}
._4_cp {
  overflow: visible;
  position: absolute;
  width: 20.481px;
  height: 20.481px;
  left: 9.76px;
  top: 9.76px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_5_cq {
  fill: rgba(255, 255, 255, 1);
}
._5_cq {
  overflow: visible;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0px;
  top: 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_50 {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 76px;
  top: 299px;
  overflow: visible;
}
#_31_cs {
  fill: transparent;
  stroke: rgba(255, 255, 255, 1);
  stroke-width: 2px;
  stroke-linejoin: miter;
  stroke-linecap: butt;
  stroke-dasharray: 12;
  stroke-dashoffset: 0;
  stroke-miterlimit: 4;
  shape-rendering: auto;
}
._31_cs {
  position: absolute;
  overflow: visible;
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
}
#_ct {
  left: 58px;
  top: 106px;
  position: absolute;
  overflow: visible;
  width: 73px;
  white-space: nowrap;
  text-align: center;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
}
#Icon_ionic-ios-add-circle-outl_cu {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 74px;
  top: 48px;
  overflow: visible;
}
#_4_cv {
  fill: rgba(255, 255, 255, 1);
}
._4_cv {
  overflow: visible;
  position: absolute;
  width: 20.481px;
  height: 20.481px;
  left: 9.76px;
  top: 9.76px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_5_cw {
  fill: rgba(255, 255, 255, 1);
}
._5_cw {
  overflow: visible;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0px;
  top: 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_49 {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 1024px;
  top: 299px;
  overflow: visible;
}
#_31_cy {
  fill: transparent;
  stroke: rgba(255, 255, 255, 1);
  stroke-width: 2px;
  stroke-linejoin: miter;
  stroke-linecap: butt;
  stroke-dasharray: 12;
  stroke-dashoffset: 0;
  stroke-miterlimit: 4;
  shape-rendering: auto;
}
._31_cy {
  position: absolute;
  overflow: visible;
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
}
#_cz {
  left: 58px;
  top: 106px;
  position: absolute;
  overflow: visible;
  width: 73px;
  white-space: nowrap;
  text-align: center;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
}
#Icon_ionic-ios-add-circle-outl_c {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 74px;
  top: 48px;
  overflow: visible;
}
#_4_c {
  fill: rgba(255, 255, 255, 1);
}
._4_c {
  overflow: visible;
  position: absolute;
  width: 20.481px;
  height: 20.481px;
  left: 9.76px;
  top: 9.76px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
#_5_c {
  fill: rgba(255, 255, 255, 1);
}
._5_c {
  overflow: visible;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0px;
  top: 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>