import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "../assets/css/restCss.css"; //全局css样式重置

//组件注册全部依赖于该文件
import gcomponents from "./components/components.js"; //全局组件
Vue.use(gcomponents);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
