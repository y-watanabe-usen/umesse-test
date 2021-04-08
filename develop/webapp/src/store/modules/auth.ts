import { UMesseError } from '@/models/UMesseError';
import router from '@/router';
import { userService } from '@/services';
import { ERROR_CODE, ERROR_PATTERN } from '@/utils/Constants';
import analytics from '@/utils/firebaseAnalytics';
import { User } from 'umesseapi/models';
import { reactive, toRefs } from 'vue';

export interface authState {
  token: string | undefined,
  user: User | undefined,
  error: string | undefined,
  authenticating: boolean
}

export default function authStore() {
  const state = reactive<authState>({
    token: undefined,
    user: undefined,
    error: undefined,
    authenticating: false
  });

  const getToken = () => state.token;
  const getUserInfo = () => state.user;

  const requestAuth = async () => {
    if (state.authenticating) return;
    // 認証済み
    if (state.token) return;

    const unisCustomerCd = router.currentRoute.value.query.unisCustomerCd as string;
    if (unisCustomerCd == undefined) {
      throw new UMesseError(ERROR_CODE.A4002, ERROR_PATTERN.A4002, "");
    }

    console.log(`requestAuthorization`);
    state.authenticating = true;
    try {
      state.token = await userService.auth(unisCustomerCd);
      state.user = await userService.getInfo(state.token);
      analytics.setUserId(state.user.unisCustomerCd);
    } catch (e) {
      state.error = e.message;
    } finally {
      state.authenticating = false;
    }

  };

  return {
    ...toRefs(state),
    requestAuth,
    getToken,
    getUserInfo,
  };
}

export type AuthStore = ReturnType<typeof authStore>;