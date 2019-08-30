import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL + "consumer",
  routes: [
    {
      path: "/",
      component: () => import("@/consumer/views/login.vue")
    }
  ]
});
