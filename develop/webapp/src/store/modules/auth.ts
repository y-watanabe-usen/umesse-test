import { reactive, toRefs } from 'vue';
import * as UMesseApi from "umesseapi";
import router from '@/router';

export interface authState {
    token: string | undefined,
    error: string | undefined,
    authenticating: boolean
}

export default function authStore() {
    const state = reactive<authState>({
        token: undefined,
        error: undefined,
        authenticating: false
    });
    const getState = async () => {

    }

    const requestAuth = async () => {
        if (state.authenticating == true) return

        const custCd = router.currentRoute.value.query.custCd as string
        if (state.token) {
            // 認証済み
            return;
        }
        if (custCd == undefined) {
            if (state.authenticating) return
            return state.error = 'custCdが設定されていない'
        }

        console.log(`requestAuthorization`)
        state.authenticating = true
        try {
            const api = new UMesseApi.AuthApi();
            const response = await api.authPost();
            state.token = response.data.token
        } catch (e) {
            state.error = e.message
        } finally {
            state.authenticating = false
        }

    }

    return {
        ...toRefs(state),
        requestAuth
    };
}

export type AuthStore = ReturnType<typeof authStore>;