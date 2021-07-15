<template>
  <ModalDialog size="large">
    <template #header>
      <ModalHeader title="禁止事項" :hideBorder="true" :showClose="false" />
    </template>
    <template #contents>
      <div class="contents">
        <p>
          ・当社もしくは第三者の著作権、商標権などの知的財産権その他の権利を侵害する行為、<br />または侵害する恐れのある行為<br />
          ・他人の名誉、社会的信用、プライバシーを侵害する恐れのある音声を送信する行為<br />
          ・法令若しくは公序良俗に違反し、当社若しくは第三者に不利益を与える行為<br />
          ・第三者になりすまして本サービスを利用する行為<br />
          ・第三者が嫌悪感を抱く、もしくはその恐れのある音声を送信する行為<br />
          ・本サービスの利用若しくは運営に支障を与える行為、または与える恐れのある行為<br />
          ・本サービスを通じて提供した文字情報（原稿）を他媒体に転用する行為<br />
          <br />
          ※上記の様な事項に該当する場合、サービス利用停止の措置を取らせていただきます。<br />
          &emsp;詳細内容は、「USEN IoT
          PLATFORMサービス契約約款」をご確認ください。<br />
          <br />
        </p>
        <div class="confirm">
          ※
          <img src="@/assets/icon_setting_black.png" />
          <p>設定画面にて、禁止事項のご確認を行うことができます。</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="prohibited-matter-checkbox">
        <input
          type="checkbox"
          id="is-Agree"
          v-model="isAgree"
          :value="isAgree"
        />
        <label for="is-Agree">同意する</label>
      </div>
      <ModalFooter :hideBorder="true">
        <Button type="primary" @click="confirm(isAgree)" :isDisabled="!isAgree"
          >利用する</Button
        >
      </ModalFooter>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";

export default defineComponent({
  name: "ModalAgreeDialog",
  components: {
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
  },
  props: {
    confirm: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      isAgree: false,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.contents {
  border: 2px solid rgb(190, 190, 190);
  border-radius: 6px;
  margin: -40px 130px;
  padding: 36px 65px;
  ::v-deep p {
    display: inline;
    color: black;
    font-size: 16px;
    font-weight: medium;
    text-align: center;
    line-height: 1.5;
  }
  .confirm {
    vertical-align: middle;
    align-items: center;
    display: flex;
    img {
      margin: 0 5px;
    }
  }
}
.prohibited-matter-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
  margin-top: 1em;
  width: 8em;
  padding-left: 10px;
  cursor: pointer;
  input[type="checkbox"] {
    top: -6px;
    right: -5px;
    outline: none;
    border: none;
    line-height: 20px;
    vertical-align: middle;
    background-color: white;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 16px;
      height: 16px;
      border: 2px solid rgb(192, 192, 191);
      border-radius: 3px;
      box-sizing: content-box;
    }
    &:checked {
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 20px;
        height: 20px;
        border: none;
        background-image: url("~@/assets/icon_checked.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  label {
    text-align: center;
    display: block;
    width: 100%;
    color: black;
    font-size: 16px;
    font-weight: medium;
  }
}
</style>
