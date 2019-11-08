import Vue from "vue";
import vuex from "../vuex/store";
import Router from "vue-router";
import control from "@/common/control_center/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL + "interface",
  routes: [
    {
      path: "/",
      redirect: "/project",
      meta: {
        metaInfo: {
          title: "接口平台",
          keywords: "接口平台",
          description: "接口平台"
        },
        auth: true
      }
    },
    {
      path: "/project",
      component: () => import("@/interface/views/projects/project.vue"),
      meta: {
        metaInfo: {
          title: "接口项目列表",
          keywords: "接口项目列表",
          description: "接口项目列表"
        },
        auth: true
      }
    },
    {
      path: "/modular",
      name: "/modular",
      component: () => import("@/interface/views/modular/modular.vue"),
      meta: {
        metaInfo: {
          title: "项目模块",
          keywords: "项目模块",
          description: "项目模块"
        },
        auth: true
      }
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
//后置守卫
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  control.go_home(to.meta.auth);
});

export default router;
