import { computed, ref } from "vue";

export default function useLoadingModalController(apperFunc?: () => boolean) {
  const isApper = apperFunc ? computed(() => apperFunc()) : ref(false);
  const loadingMessage = ref("");

  const open = (message?: string) => {
    loadingMessage.value = message ?? "";
    isApper.value = true;
  };
  const close = () => {
    isApper.value = false;
  };
  return {
    isApper, loadingMessage, open, close
  };
}
export type useLoadingModalController = ReturnType<typeof useLoadingModalController>;
