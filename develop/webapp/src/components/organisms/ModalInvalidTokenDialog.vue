<template>
  <ModalDialog size="small">
    <template #contents>
      <MessageDialogContents>
        セッションの有効期限が切れています。
      </MessageDialogContents>
    </template>
    <template #footer>
      <ModalFooter>
        <Button type="primary" @click="onClick">ホーム画面へ戻る</Button>
      </ModalFooter>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";

export default defineComponent({
  name: "ModalInvalidTokenDialog",
  components: {
    Button,
    ModalDialog,
    ModalFooter,
    MessageDialogContents,
  },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const state = reactive({});
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
</style>
