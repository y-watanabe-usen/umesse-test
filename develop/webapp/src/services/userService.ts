import { UMesseErrorFromAuthFactory } from "@/models/umesseError";
import { AuthApi, UserApi } from "umesseapi";
import { umesseLocalStorage, LOCAL_STORAGE_KEY } from "@/repository/localStorage/localStorage";

export function useUserService(
  authRepository: AuthApi,
  userRepository: UserApi,
  localStorage: umesseLocalStorage
) {
  const auth = async (
    unisCustomerCd: string,
    contractCd: string
  ): Promise<string> => {
    try {
      const requestModel = {
        unisCustomerCd: unisCustomerCd,
        contractCd: contractCd,
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

  const getTutorial = (key: LOCAL_STORAGE_KEY) => {
    return localStorage.get(key);
  };

  const setTutorial = (key: LOCAL_STORAGE_KEY, setValue: string) => {
    localStorage.set(key, setValue);
  };

  return {
    auth,
    getInfo,
    getTutorial,
    setTutorial,
  };
}
