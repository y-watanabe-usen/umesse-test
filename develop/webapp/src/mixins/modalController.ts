import { ref } from "vue";

export default function useModalController() {
  const isApper = ref(false);
  const open = () => {
    isApper.value = true;
  };
  const close = () => {
    isApper.value = false;
  };
  return {
    isApper, open, close
  };
}
export type useModalController = ReturnType<typeof useModalController>;


