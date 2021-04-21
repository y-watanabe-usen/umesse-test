import { UMesseErrorFromAuthFactory } from "@/models/umesseError";
import { AuthApi, UserApi } from "umesseapi";

export function useUserService(
  authRepository: AuthApi,
  userRepository: UserApi
) {
  const auth = async (unisCustomerCd: string): Promise<string> => {
    try {
      console.log(unisCustomerCd);
      const requestModel = {
        unisCustomerCd: unisCustomerCd
      };
      const response = await authRepository.auth(requestModel);
      return response.data.token;
    } catch (e) {
      throw UMesseErrorFromAuthFactory(e);
    }
  };

  const getInfo = async (authToken: string) => {
    try {
      const response = await userRepository.getUser(authToken);
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
