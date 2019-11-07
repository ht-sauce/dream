import Vue from "vue";
import vuex from "./vuex/store";
import Router from "vue-router";
import control from "@/common/control_center/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL + "consumer",
  routes: [
    {
      path: "/",
      redirect: "/user_center",
      meta: {
        metaInfo: {
          title: "海天酱油用户平台",
          keywords: "海天酱油用户平台",
          description: "海天酱油用户平台"
        },
        auth: false
      }
    },
    {
      path: "/login",
      component: () => import("@/consumer/views/login.vue"),
      meta: {
        metaInfo: {
          title: "登录中心",
          keywords: "登录中心",
          description: "登录中心"
        },
        auth: false
      }
    },
    {
      path: "/create-user",
      component: () =>
        import("@/consumer/views/login/create-user/create-user.vue"),
      meta: {
        metaInfo: {
          title: "新建用户",
          keywords: "新建用户",
          description: "新建用户"
        },
        auth: false
      }
    },
    {
      path: "/platform",
      component: () => import("@/consumer/views/platform/index.vue"),
      meta: {
        metaInfo: {
          title: "用户操作中心",
          keywords: "用户操作中心",
          description: "用户操作中心"
        },
        auth: false
      },
      children: [
        {
          path: "/user_center",
          component: () =>
            import("@/consumer/views/platform/user_center/user_center.vue"),
          meta: {
            metaInfo: {
              title: "用户中心",
              keywords: "用户中心",
              description: "用户中心"
            },
            auth: true
          }
        }
      ]
    }
  ]
});

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.metaInfo) {
    vuex.commit("getMetaInfo", to.meta.metaInfo);
  }

  next();
});
// 路由后置守卫
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  control.go_home(to.meta.auth);
});

export default router;
