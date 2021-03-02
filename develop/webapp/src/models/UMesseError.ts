import { ERROR_CODE, ERROR_PATTERN } from "@/utils/Constants"

export class UMesseError extends Error {
  constructor(
    public errorCode: ERROR_CODE,
    public message: string,
    public detail: string
  ) {
    super(message)
  }
}

export const UMesseErrorFromApiFactory = (e: any) => {
  let code: ERROR_CODE
  let status = (e.response && e.response.status) ? e.response.status : 999
  switch (status) {
    case 400: // リクエストエラー
      code = ERROR_CODE.A3002
      break;
    case 401: // 認証エラー
      code = ERROR_CODE.A3001
      break;
    case 403: // 認証エラー
      code = ERROR_CODE.A3001
      break;
    case 404: // Not Found
      code = ERROR_CODE.A3000
      break;
    case 500: // Internal Server Error
      code = ERROR_CODE.A3999
      break;
    default: // 予期せぬエラー
      code = ERROR_CODE.A0001
      break;
  }
  return new UMesseError(code, ERROR_PATTERN[code], e.message ?? e.toString())
}