<template>
  <ModalDialog @close="$emit('close')">
    <template #header>
      <ModalHeader title="エラー" @close="$emit('close')" />
    </template>
    <template #contents>
      <MessageDialogContents>
        {{ errorCode }} <br />
        {{ errorMessage }}
      </MessageDialogContents>
    </template>
    <template #footer>
      <ModalFooter>
        <Button type="secondary" @click="$emit('close')">閉じる</Button>
      </ModalFooter>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Button from "@/components/atoms/Button.vue";
import ModalDialog from "@/components/organisms/ModalDialog.vue";
import ModalHeader from "@/components/molecules/ModalHeader.vue";
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import MessageDialogContents from "@/components/molecules/MessageDialogContents.vue";

export default defineComponent({
  name: "ModalErrorDialog",
  components: {
    Button,
    ModalDialog,
    ModalHeader,
    ModalFooter,
    MessageDialogContents,
  },
  props: {
    errorCode: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
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
