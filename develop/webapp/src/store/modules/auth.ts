import { UMesseError } from "@/models/umesseError";
import router from "@/router";
import { userService } from "@/services";
import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";
import analytics from "@/utils/firebaseAnalytics";
import { User } from "umesseapi/models";
import { reactive, toRefs } from "vue";

export interface authState {
  token: string | undefined;
  user: User | undefined;
  authenticating: boolean;
  agree: boolean | undefined;
}

export default function authStore() {
  const state = reactive<authState>({
    token: undefined,
    user: undefined,
    authenticating: false,
    agree: undefined,
  });

  const getToken = () => state.token;
  const getUserInfo = () => state.user;
  const isAuthenticating = () => state.authenticating;
  const getAgree = () => state.agree;

  const requestAuth = async () => {
    if (state.authenticating) return;
    // 認証済み
    if (state.token) return;
    const unisCustomerCd = getUnisCustomerCd();
    const contractCd = getUnisContractCd();
    if (unisCustomerCd == undefined || contractCd == undefined) {
      throw new UMesseError(ERROR_CODE.A4002, ERROR_PATTERN.A4002, "");
    }

    try {
      state.authenticating = true;
      const resAuth = await userService.auth(unisCustomerCd, contractCd);
      state.token = resAuth.token;
      state.user = await userService.getInfo(unisCustomerCd, resAuth.token);
      state.agree = resAuth.agree;
      analytics.setUserId(state.user.unisCustomerCd);
    } finally {
      state.authenticating = false;
    }
  };

  const getUnisCustomerCd = () => {
    let unisCustomerCd = router.currentRoute.value.query
      .unisCustomerCd as string;
    if (unisCustomerCd == undefined && process.env.NODE_ENV !== "production") {
      // unisCustomerCdが空で、かつ本番環境でなければデバッグ値をセット
      unisCustomerCd = "123456789";
    }
    return unisCustomerCd;
  };

  const getUnisContractCd = () => {
    let contractCd = router.currentRoute.value.query.contractCd as string;
    if (contractCd == undefined && process.env.NODE_ENV !== "production") {
      // contractCdが空で、かつ本番環境でなければデバッグ値をセット
      contractCd = "N01234567890123456789";
    }
    return contractCd;
  };

  const resetToken = () => {
    state.token = undefined;
  };

  const agree = async () => {
    const unisCustomerCd = getUserInfo()?.unisCustomerCd;
    const token = getToken() ?? "";

    try {
      await userService.agree(unisCustomerCd, token);
      state.agree = true;
    } finally {
      state.authenticating = false;
    }
  };

  return {
    ...toRefs(state),
    requestAuth,
    getToken,
    getUserInfo,
    isAuthenticating,
    resetToken,
    agree,
    getAgree,
  };
}

export type AuthStore = ReturnType<typeof authStore>;
