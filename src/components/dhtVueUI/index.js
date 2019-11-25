//批量注册部分
import Img from "./img/index"; //替代img标签
import Text from "./text/index"; //替代p标签
import resizeDiv from "./resizeDiv/index"; //替代p标签
import swiper from "./swiper/index"; //轮播组件
import tree from "./tree/index"; //树形组件
//需要独立注册部分
import Loading from "./loading/install"; //加载标签
//批量注册部分
const components = [
  Img,
  Text,
  resizeDiv.resizeDivWebkit,
  swiper.side,
  swiper.sideItem,
  tree
];

// eslint-disable-next-line no-unused-vars
const install = function(vue, opts = {}) {
  //初始化部分
  vue.prototype.$dhtUI = {
    zIndex: opts.zIndex || 2000
  };
  //指令注册部分
  vue.use(Loading.directive);
  vue.use(resizeDiv.directive);
  //批量组件注册
  components.forEach(component => {
    vue.component(component.name, component);
  });
  //挂载到vue原型上
  vue.prototype.$dhtLoading = Loading.service;
};

//代码意思上是指必须要vue已经存在才可以
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  //版本
  version: "1.0.0",
  //全注册
  install,
  //局部注册
  Img,
  Text,
  Loading,
  tree
};
