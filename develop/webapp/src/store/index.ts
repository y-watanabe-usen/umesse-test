import { createStore } from 'vuex'

export default createStore({
  state: {
    custCd: ''
  },
  mutations: {
    setCustCd(state, value) {
      state.custCd = value
    }
  },
  actions: {
  },
  modules: {
  }
})
