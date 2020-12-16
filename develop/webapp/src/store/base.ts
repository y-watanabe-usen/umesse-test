import { reactive } from 'vue'

export default function baseStore() {
  const state = reactive({
    isDarkTheme: false
  });

  return {
    get isDarkTheme() {
      return state.isDarkTheme
    },

    toggleDarkTheme() {
      state.isDarkTheme = !state.isDarkTheme
    }
  }
}
export type BaseStore = ReturnType<typeof baseStore>;