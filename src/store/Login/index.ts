import { createStore, Module } from 'vuex'
import { loginRequest, getInfoRequest } from '../../services/login'
import router from '@/router'

import { ElMessage } from 'element-plus'
import LocalCache from '@/utils/cache'


const Login: Module<any, any> = ({
  namespaced: true,
  state: {
    userLoginData: JSON.parse(LocalCache.getCache('user') || null),
    userInfoData: {}
    //LocalCache.getCache('userinfo') || null
  },
  getters: {

  },
  mutations: {
    userLoginData(state, userLoginData: any) {
      debugger
      state.userLoginData = JSON.parse(userLoginData)
    },
    getInfoData(state, getInfoData) {
      state.userInfoData = getInfoData
    }
  },
  actions: {


    async loginAction({ commit }, payload: any) {
      debugger
      let payloadLogin = Object.assign({}, payload)
      delete payloadLogin.isbtnLoading
      //获取token
      const LoginRequest = await loginRequest(payloadLogin)
      console.log(LoginRequest.data);
      let loginActionREQ = LoginRequest.data.content
      LocalCache.setCache('user', LoginRequest.data.content)
      if (LoginRequest.data.state !== 1) {

        ElMessage.error(LoginRequest.data.message)

      } else {

        router.push(router.currentRoute.value.query.redirect as string || '/');
        ElMessage({
          message: '登录成功',
          type: 'success',
        })

      }
      payload.isbtnLoading.value = false
      commit('userLoginData', LoginRequest.data.content)

      //获取用户信息

    },
    async userinfoAction({ commit }) {
      debugger
      const getInfoAction = await getInfoRequest()
      const userinfoData = getInfoAction.data.content
      LocalCache.setCache('userinfo', userinfoData)
      console.log(getInfoAction.data);
      commit('getInfoData', userinfoData)
    },
    //刷新重新获取vuex数据
    loadLogin({ commit }) {
      debugger
      const user = LocalCache.getCache('user')
      if (user) {
        commit('userLoginData', user)
      }
      const userInfo = LocalCache.getCache('userinfo')
      if (userInfo) {
        commit('getInfoData', userInfo)
      }

    }
  },
  modules: {
  }
})


export default Login