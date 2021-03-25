import { UMesseErrorFromAuthFactory } from "@/models/UMesseError";
import { AuthApi, UserApi } from "umesseapi";

export function useUserService(
  authRepository: AuthApi,
  userRepository: UserApi
) {
  const auth = async (unisCustomerCd: string): Promise<string> => {
    try {
      console.log(unisCustomerCd);
      const response = await authRepository.auth();
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