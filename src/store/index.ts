import { createStore } from 'vuex'
import Login from './Login'
interface stateType {
  name: string,
  editableTabs: any,
  editableTabsValue: any,
  tabIndex: number
  i: number
}
const store = createStore<stateType>({
  state: {
    name: 'zlk',
    i: 0,
    editableTabs: [
      {
        title: '首页',
        name: 'home',
        content: 'Tab 1 content',
      },
      {
        title: '角色管理',
        name: 'role',
        content: 'Tab 1 content',
      },
    ],
    editableTabsValue: 'home',
    tabIndex: 2
  },
  getters: {
  },
  mutations: {


    deleteTabs(state, id) {
      state.editableTabs.map((v: any, i: any) => {
        debugger
        if (i == id) {
          state.editableTabs.splice(i, 1)
        }
      })
    },
    setupTable(state) {
      debugger
      if (window.sessionStorage.getItem('editableTabs') !== null) {
        state.editableTabs = JSON.parse(window.sessionStorage.getItem('editableTabs') || '')
        state.editableTabsValue = window.sessionStorage.getItem('path')
      } else {
        window.sessionStorage.setItem(
          'editableTabs',
          JSON.stringify(state.editableTabs)
        );
        // window.sessionStorage.setItem('path', state.editableTabsValue);
      }


    }




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
export function setupTable() {
  store.commit('setupTable')
}

export default store