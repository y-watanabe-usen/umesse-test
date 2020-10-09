import ApiAdapter from './apiAdapter';
import LoginAuthRequest from '@/model/loginAuthRequest'
import { Convert, LoginAuthResponse } from '@/model/loginAuthResponse'

// とりあえずUSEN MEMBERSのログインAPIをコールしてみる
// TODO: 実際には使わないので後で消す
class UsenMembersRepository {
  async loginAuth(loginId: string, password: string, identifier: string, iv: string): Promise<LoginAuthResponse> {
    const endpoint = '/loginAuth'
    const request = new LoginAuthRequest(loginId, password, identifier, iv)
    return ApiAdapter.post(endpoint, request).then(response => {
      return Convert.toLoginAuthResponse(JSON.stringify(response.data))
    }).catch(err => {
      // TODO: error処理
      throw new Error(err)
    })
  }
}

export default new UsenMembersRepository()