import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

import Login from '@/store/Login'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },

  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          title: '用户管理',
          keepAlive: true
        },
      },
      {
        path: '/role',
        name: 'role',

        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          title: '角色管理',
          keepAlive: true
        },
      },
      {
        path: '/resource',
        name: 'resource',

        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: {
          title: '资源管理',
          keepAlive: true
        },
      },
      {
        path: '/course',
        name: 'course',
        meta: {
          title: '课程管理',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        meta: {
          title: '广告列表',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        meta: {
          title: '广告位列表',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/menu-create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/menu-edit.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errPage',
    component: () => import(/* webpackChunkName: 'errPage' */ '@/views/err-page/index.vue')
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  debugger
  // if (to.meta.requiresAuth && !store.state.Login.userLoginData) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { : to.fullPath },
  //   }
  // } else {
  //   next()
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    debugger
    if (!Login.state.userLoginData) {
      debugger
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    } else { next() }
  } else { next() }
})
export default router
