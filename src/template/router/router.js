import Vue from "vue";
import vuex from "../vuex/store";
import Router from "vue-router";
import control from "@/common/control_center/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL + "你的项目名称",
  routes: [
    {
      path: "/"
      //redirect: "/home"
    }
    /*{
      path: "/home",
      component: () => import("../views/Home.vue")
    }*/
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
