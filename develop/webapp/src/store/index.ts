import { InjectionKey, inject } from 'vue';
import authStore from '@/store/modules/auth';
import cmStore from '@/store/cm';


// Provide: globalで使うものを定義.
export default function globalStore() {
  return {
    auth: authStore(),
    cm: cmStore(),
  };
}

// Inject.
type GlobalStore = ReturnType<typeof globalStore>
export const GlobalStoreKey: InjectionKey<GlobalStore> = Symbol('GlobalStore');
export function useGlobalStore() {
  const store = inject(GlobalStoreKey);
  if (!store) {
    throw new Error(`${GlobalStoreKey} is not provided`);
  }
  return store;
}
