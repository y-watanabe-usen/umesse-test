import { createStore } from 'vuex'

export default createStore({
  state: {
    custCd: '',
    token: '',
  },
  getters: {
    custCd: state => state.custCd,
    token: state => state.token
  },
  mutations: {
    setCustCd(state, value) {
      state.custCd = value
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
