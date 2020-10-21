import { InjectionKey, inject } from 'vue';                                                                                                               
import authStore from '@/store/modules/auth';


// Provide.
export default function globalStore() {
  return {
    auth: authStore(),
  };
 }
 
 // Inject.
 type GlobalStore = ReturnType<typeof globalStore>;
 export const GlobalStoreKey: InjectionKey<GlobalStore> = Symbol('GlobalStore');
 export function useGlobalStore() {
   const store = inject(GlobalStoreKey);
   if (!store) {
     throw new Error(`${GlobalStoreKey} is not provided`);
   }
   return store;
 }
