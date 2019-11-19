<template>
  <div id="app">
    <!--不可变化部分-->
    <transition name="page-transition">
      <router-view />
    </transition>
    <dht-cat></dht-cat>
  </div>
</template>
<script>
import store from "store";
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {},
  beforeCreate() {},
  created() {
    // 将用户数据存入到vuex便于后续操作
    this.$store.commit("set_data", {
      user_info: store.get("user_info").userInfo
    });
  },
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "@/assets/css/public.scss";
//app下编写全局存在的css，进行控制
//页面宽度布局用rem进行布局，避免因为百分比导致页面缩小页面错乱
body {
  width: 100%;
  overflow-x: hidden;
}
#app {
  font: 14px "Microsoft YaHei UI" sans-serif;
  width: 100vw;
  color: $font_main;
  //控制页面全局的宽度
  .g-width {
    width: 76vw;
    height: 100%;
  }
}
//外部引入的看板娘位置设置
#waifu {
  position: fixed;
  bottom: -12px;
  left: inherit;
  right: 13px;
  z-index: 1;
  line-height: 0;
  transition: bottom 0.3s ease-in-out;
}
</style>
