import Vue from 'vue'
import vuex from '../vuex/store'
import Router from 'vue-router'
import control from '@/common/control_center/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL + 'backstage',
  routes: [
    {
      path: '/',
      meta: {
        metaInfo: {
          title: '后台管理',
          keywords: '后台管理',
          description: '后台管理',
        },
        auth: false,
      },
      //redirect: "/home"
    },
    {
      path: '/test',
      component: () => import('../views/test.vue'),
      meta: {
        metaInfo: {
          title: '测试',
          keywords: '测试',
          description: '测试',
        },
        auth: false,
      },
    },
    {
      path: '/quill',
      component: () => import('../views/Quill.vue'),
      meta: {
        metaInfo: {
          title: '测试',
          keywords: '测试',
          description: '测试',
        },
        auth: false,
      },
    },
  ],
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.metaInfo) {
    vuex.commit('getMetaInfo', to.meta.metaInfo)
  }

  next()
})
//后置守卫
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  control.go_home(to.meta.auth)
})

export default router
