import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
