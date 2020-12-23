import { reactive, toRefs } from 'vue'
import * as UMesseApi from "umesseapi"
import router from '@/router'

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

        const custCd = router.currentRoute.value.query.custCd as string
        if (custCd == undefined) {
            return state.error = ''
        }

        console.log(`requestAuthorization`)
        state.authenticating = true
        try {
            const api = new UMesseApi.AuthApi()
            const response = await api.auth()
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