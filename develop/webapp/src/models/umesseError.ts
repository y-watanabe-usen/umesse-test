import { ERROR_CODE, ERROR_PATTERN } from "@/utils/constants";

export class UMesseError extends Error {
  constructor(
    public errorCode: ERROR_CODE,
    public message: string,
    public detail: string
  ) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UMesseErrorFromApiFactory = (e: any) => {
  let code: ERROR_CODE;
  const status = e.response && e.response.status ? e.response.status : 999;
  switch (status) {
    case 400: // リクエストエラー
      code = ERROR_CODE.A3002;
      break;
    case 401: // 認証エラー
      code = ERROR_CODE.A3004;
      break;
    case 403: // 認証エラー
      code = ERROR_CODE.A3001;
      break;
    case 404: // Not Found
      code = ERROR_CODE.A3000;
      break;
    case 408: // Timeout
      code = ERROR_CODE.A3003;
      break;
    case 500: // Internal Server Error
      code = ERROR_CODE.A3999;
      break;
    default:
      // 予期せぬエラー
      code = ERROR_CODE.A0001;
      break;
  }
  const errorCode = e.response?.data?.code ? `[ ${e.response.data.code} ]` : "";
  const errorMessage = e.response?.data?.message ?? ERROR_PATTERN[code];
  const msg = errorMessage + errorCode;
  return new UMesseError(code, msg, e.message ?? e.toString());
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UMesseErrorFromAuthFactory = (e: any) => {
  let code: ERROR_CODE;
  const status = e.response && e.response.status ? e.response.status : 999;
  switch (status) {
    case 400: // リクエストエラー
      code = ERROR_CODE.A4001;
      break;
    case 401: // 認証エラー
      code = ERROR_CODE.A4001;
      break;
    case 403: // 認証エラー
      code = ERROR_CODE.A4001;
      break;
    case 404: // Not Found
      code = ERROR_CODE.A4004;
      break;
    case 500: // Internal Server Error
      code = ERROR_CODE.A4999;
      break;
    default:
      // 予期せぬエラー
      code = ERROR_CODE.A0001;
      break;
  }
  return new UMesseError(code, ERROR_PATTERN[code], e.message ?? e.toString());
};
