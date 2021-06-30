import { UMesseError } from '@/models/umesseError';
import router from '@/router';
import { userService } from '@/services';
import { ERROR_CODE, ERROR_PATTERN } from '@/utils/constants';
import analytics from '@/utils/firebaseAnalytics';
import { User } from 'umesseapi/models';
import { reactive, toRefs } from 'vue';

export interface authState {
  token: string | undefined,
  user: User | undefined,
  authenticating: boolean
}

export default function authStore() {
  const state = reactive<authState>({
    token: undefined,
    user: undefined,
    authenticating: false
  });

  const getToken = () => state.token;
  const getUserInfo = () => state.user;
  const isAuthenticating = () => state.authenticating;

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
      state.token = await userService.auth(unisCustomerCd, contractCd);
      state.user = await userService.getInfo(unisCustomerCd, state.token);
      analytics.setUserId(state.user.unisCustomerCd);
    } finally {
      state.authenticating = false;
    }
  };

  const getUnisCustomerCd = () => {
    let unisCustomerCd = router.currentRoute.value.query.unisCustomerCd as string;
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
    state.token = "";
  };

  return {
    ...toRefs(state),
    requestAuth,
    getToken,
    getUserInfo,
    isAuthenticating,
    resetToken,
  };
}

export type AuthStore = ReturnType<typeof authStore>;