// TODO: 実際には使わないので後で消す
export default class LoginAuthRequest {
  constructor(
    public loginId: string,
    public password: string,
    public identifier: string,
    public iv: string,
  ) { }

  toSendParams(): URLSearchParams {
    let params = new URLSearchParams()
    params.append('login_id', this.loginId)
    params.append('password', this.password)
    params.append('identifier', this.identifier)
    params.append('iv', this.iv)
    return params
  }
}