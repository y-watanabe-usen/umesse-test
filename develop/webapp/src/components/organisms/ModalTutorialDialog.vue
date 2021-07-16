<template>
  <ModalDialog size="xLarge">
    <template #header>
      <div class="modal-header">
        <p class="title">音声CM作成の流れ</p>
      </div>
    </template>
    <template #contents>
      <img src="@/assets/tutorial.png" />
    </template>
    <template #footer>
      <div class="tutorial-checkbox">
        <input
          type="checkbox"
          id="tutorial-check"
          v-model="state.isCheck"
          :value="state.isCheck"
        />
        <label for="tutorial-check">次回以降表示しない</label>
        <div class="tutorial-check-sub-parts">
          <img src="@/assets/icon_setting_grey.png" />
          <p>設定画面にて、再度内容を確認することができます</p>
        </div>
      </div>

      <div class="modal-footer">
        <Button type="primary" @click="closeModal(state.isCheck)"
          >確認しました</Button
        >
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import Button from "@/components/atoms/Button.vue";

export default defineComponent({
  name: "ModalTutorialDialog",
  components: {
    ModalDialog,
    Button,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      isCheck: false,
    });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.modal-header {
  position: relative;
  height: 80px;
  display: block;
  padding: 0;
  caret-color: transparent;
  .title {
    color: black;
    font-size: 20px;
    font-weight: medium;
    line-height: 80px;
    text-align: center;
  }
}
.modal-footer {
  @include flex_center;
  padding: 0;
  height: 100px;
  caret-color: transparent;
  ::v-deep button {
    width: 242px;
    margin-left: 14px;
    margin-right: 14px;
    &.rectangle {
      width: 88px;
    }
  }
}
.contents img {
  display: block;
  margin: -40px auto;
  width: 1060px;
}
.tutorial-checkbox {
  display: flex;
  position: relative;
  margin: 1em 0 0 456px;
  padding-left: 28px;
  cursor: pointer;
  img {
    float: left;
  }
  input[type="checkbox"] {
    top: -6px;
    right: -5px;
    outline: none;
    border: none;
    line-height: 20px;
    vertical-align: middle;
    margin: 0;
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
    text-align: left;
    font-size: 16px;
    font-weight: medium;
    display: block;
    width: 160px;
    padding-left: 5px;
    color: black;
  }
  .tutorial-check-sub-parts {
    margin: 0 23px 0 auto;
    width: 348.4px;
    p {
      padding-left: 25px;
      font-size: 14px;
      color: rgb(128, 128, 128); // #808080
    }
  }
}
</style>
