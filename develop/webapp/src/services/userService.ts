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

  const getDontShowForeverTutorial = () => {
    return localStorage.get(LOCAL_STORAGE_KEY.DONT_SHOW_FOREVER_TUTORIAL);
  };

  const dontShowForeverTutorial = () => {
    localStorage.set(LOCAL_STORAGE_KEY.DONT_SHOW_FOREVER_TUTORIAL, "true");
  };

  const isAlreadyShowTutorial = () => {
    return sessionStorage.get(SESSION_STORAGE_KEY.ALREADY_SHOW_TUTORIAL);
  };

  const showTutorial = () => {
    sessionStorage.set(SESSION_STORAGE_KEY.ALREADY_SHOW_TUTORIAL, "true");
  };

  return {
    auth,
    getInfo,
    getDontShowForeverTutorial,
    dontShowForeverTutorial,
    isAlreadyShowTutorial,
    showTutorial,
  };
}
