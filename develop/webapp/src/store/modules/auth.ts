import { userService } from '@/services';
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

    // const unisCustomerCd = router.currentRoute.value.query.unisCustomerCd as string
    // if (unisCustomerCd == undefined) {
    //     return state.error = ''
    // }
    const unisCustomerCd = "1111";

    console.log(`requestAuthorization`);
    state.authenticating = true;
    try {
      state.token = await userService.auth(unisCustomerCd);
      state.user = await userService.getInfo(state.token);
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