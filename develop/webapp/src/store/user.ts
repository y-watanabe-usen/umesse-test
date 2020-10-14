import { reactive } from 'vue';
import UsenMembersRepository from "@/repository/usenMembersRepository";
import User from '@/model/user'

export default function userStore() {
  const state = reactive({
    user: null as User | null
  });

  return {
    get user() {
      return state.user;
    },

    async login(loginId: string, password: string, identifier: string, iv: string) {
      try {
        const response = await UsenMembersRepository.loginAuth(
          loginId,
          password,
          identifier,
          iv
        )
        console.log(response)

        state.user = {
          custCd: response.custCd,
          token: response.token
        }
      } catch (e) {
        console.log(e)
      }
    },
  };
}

export type UserStore = ReturnType<typeof userStore>;