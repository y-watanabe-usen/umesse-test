import { UMesseErrorFromAuthFactory } from "@/models/umesseError";
import { AuthApi, UserApi } from "umesseapi";

export function useUserService(
  authRepository: AuthApi,
  userRepository: UserApi
) {
  const auth = async (unisCustomerCd: string): Promise<string> => {
    try {
      const requestModel = {
        unisCustomerCd: unisCustomerCd
      };
      const response = await authRepository.auth(requestModel);
      return response.data.token;
    } catch (e) {
      throw UMesseErrorFromAuthFactory(e);
    }
  };

  const getInfo = async (unisCustomerCd: string, authToken: string) => {
    try {
      const response = await userRepository.getUser(unisCustomerCd, authToken);
      return response.data;
    } catch (e) {
      throw UMesseErrorFromAuthFactory(e);
    }
  };

  return {
    auth,
    getInfo,
  };
}
