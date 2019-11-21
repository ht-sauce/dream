import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  metaInfo: {
    title: "海天酱油博客",
    keywords: "玉树临风,风流倜傥,英俊潇洒,才高八斗,貌似番安",
    description: "这么神奇吗？都已经很难用言语来描述了"
  },
  core: "consumer"
};
const mutations = {
  getMetaInfo(state, metaInfo) {
    state.metaInfo = metaInfo;
  }
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions: {}
});
