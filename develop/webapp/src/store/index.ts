import { InjectionKey, inject } from 'vue'
import authStore from '@/store/modules/auth'
import baseStore from '@/store/base'
import cmStore from '@/store/cm'
import { config } from "@/utils/UMesseApiConfiguration"


// Provide: globalで使うものを定義.
export default function globalStore() {
  return {
    auth: authStore(config),
    base: baseStore(),
    // TODO: glocalにあるべきではない
    cm: cmStore(),
  }
}

// Inject.
type GlobalStore = ReturnType<typeof globalStore>
export const GlobalStoreKey: InjectionKey<GlobalStore> = Symbol('GlobalStore')
export function useGlobalStore() {
  const store = inject(GlobalStoreKey)
  if (!store) {
    throw new Error(`${GlobalStoreKey} is not provided`)
  }
  return store
}
