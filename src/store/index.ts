import { createStore } from 'vuex'
import Login from './Login'
const store = createStore({
  state: {
    name: 'zlk'
  },
  getters: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Login
  }
})

export function setupStore() {

  store.dispatch('Login/loadLogin')
}

export default store