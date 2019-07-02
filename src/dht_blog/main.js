import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
//个人开发ui组件，以插件方式开发
import dhtui from "@/components/dhtVueUI/index";
Vue.use(dhtui, { zIndex: 4000 });

//css导入部分
import "../assets/css/restCss.css"; //全局css样式重置

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
