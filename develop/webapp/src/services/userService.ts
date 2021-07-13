import { UMesseErrorFromAuthFactory } from "@/models/umesseError";
import { AuthApi, UserApi } from "umesseapi";
import { umesseLocalStorage, LOCAL_STORAGE_KEY } from "@/repository/storage/localStorage";
import { umesseSessionStorage, SESSION_STORAGE_KEY } from "@/repository/storage/sessionStorage";

export function useUserService(
  authRepository: AuthApi,
  userRepository: UserApi,
  localStorage: umesseLocalStorage,
  sessionStorage: umesseSessionStorage,
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

  const getLocalStorageTutorial = (key: LOCAL_STORAGE_KEY) => {
    return localStorage.get(key);
  };

  const setLocalStorageTutorial = (key: LOCAL_STORAGE_KEY, setValue: string) => {
    localStorage.set(key, setValue);
  };

  const getSessionStorageTutorial = (key: SESSION_STORAGE_KEY) => {
    return sessionStorage.get(key);
  };

  const setSessionStorageTutorial = (key: SESSION_STORAGE_KEY, setValue: string) => {
    sessionStorage.set(key, setValue);
  };

  return {
    auth,
    getInfo,
    getLocalStorageTutorial,
    setLocalStorageTutorial,
    getSessionStorageTutorial,
    setSessionStorageTutorial,
  };
}
