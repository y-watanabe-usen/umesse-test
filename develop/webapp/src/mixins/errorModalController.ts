import { UMesseError } from "@/models/UMesseError";
import { ref } from "vue";

export default function useErrorModalController() {
  const isApper = ref(false);
  const errorCode = ref("");
  const errorMessage = ref("");

  const open = (e: UMesseError) => {
    errorCode.value = e.errorCode;
    errorMessage.value = e.message;
    isApper.value = true;
  };
  const close = () => {
    isApper.value = false;
  };
  return {
    isApper, errorCode, errorMessage, open, close
  };
}
export type useErrorModalController = ReturnType<typeof useErrorModalController>;