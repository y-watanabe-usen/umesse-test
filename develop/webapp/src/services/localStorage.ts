import { umesseLocalStorage } from "@/repository/localStorage/localStorage";

export function useLocalStorageService(localStorage: umesseLocalStorage) {
  const getItem = (key: string) => {
    return localStorage.get(key);
  };

  const setItem = (key: string, value: string) => {
    localStorage.set(key, value);
  };

  return {
    getItem,
    setItem,
  };
}
