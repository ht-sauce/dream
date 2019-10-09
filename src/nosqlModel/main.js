import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";

//css导入部分
import "../assets/css/restCss.css"; //全局css样式重置

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
