import { reactive, toRefs } from 'vue'
import router from '@/router'
import UMesseApi from '@/repository/UMesseApi';

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
    const getToken = () => state.token;
    const requestAuth = async () => {
        if (state.authenticating) return
        // 認証済み
        if (state.token) return

        const unisCustomerCd = router.currentRoute.value.query.unisCustomerCd as string
        // if (unisCustomerCd == undefined) {
        //     return state.error = ''
        // }

        console.log(`requestAuthorization`)
        state.authenticating = true
        try {
            const response = await UMesseApi.authApi.auth()
            state.token = response.data.token
        } catch (e) {
            state.error = e.message
        } finally {
            state.authenticating = false
        }

    }

    return {
        ...toRefs(state),
        requestAuth,
        getToken
    };
}

export type AuthStore = ReturnType<typeof authStore>;