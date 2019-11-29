import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
import axios from "@/common/ajax/axios-ajax";

import "@/assets/css/restCss.css"; //全局css样式重置
//组件注册全部依赖于该文件
import gcomponents from "./components/components.js"; //全局组件
Vue.use(gcomponents);

//vuemeta头部标签管理
import VueMeta from "vue-meta";
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  //VueMeta自定义部分
  metaInfo() {
    return {
      title: this.$store.state.metaInfo.title,
      meta: [
        {
          name: "keywords",
          content: this.$store.state.metaInfo.keywords
        },
        {
          name: "description",
          content: this.$store.state.metaInfo.description
        }
      ]
    };
  },
  render: h => h(App)
}).$mount("#app");
