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
      //redirect: "/home"
      meta: {
        metaInfo: {
          title: "接口平台",
          keywords: "接口平台",
          description: "接口平台"
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
