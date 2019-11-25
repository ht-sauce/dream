import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  metaInfo: {
    title: "海天酱油博客",
    keywords: "玉树临风,风流倜傥,英俊潇洒,才高八斗,貌似番安",
    description: "这么神奇吗？都已经很难用言语来描述了"
  },
  core: "blog",
  ip: {},
  user_info: {}, // 登录用户数据
  blogger: {}, //博主信息
  all_class: {} //文章所有分类
};
const mutations = {
  getMetaInfo(state, metaInfo) {
    state.metaInfo = metaInfo;
  },
  // 数据统一修改，避免多操作函数情况，缺陷：无法精细化操作变量，操作方式类似微信小程序操作
  set_data(state, data) {
    for (let key in data) {
      state[key] = data[key];
    }
  }
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions: {}
});
