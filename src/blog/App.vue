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
    const user = store.get("user_info");
    // 将用户数据存入到vuex便于后续操作
    this.$store.commit("set_data", {
      user_info: user ? user.userInfo : null
    });
    this.classify_list_all();
    this.blogger();
    this.getIP();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 文章所有分类列表
    classify_list_all() {
      this.axios
        .ajax({
          url: this.$api.blog().article.classify.list
        })
        .then(e => {
          this.$store.commit("set_data", {
            all_class: e.data
          });
        })
        .catch();
    },
    // 博主信息接口
    blogger() {
      this.axios
        .ajax({
          url: this.$api.consumer().user.blogger
        })
        .then(e => {
          console.log(e.data);
          e.data.portrait = this.$api.static().visit + e.data.portrait;
          this.$store.commit("set_data", {
            blogger: e.data
          });
        })
        .catch();
    },
    // 获取用户ip信息，匿名用户有用
    getIP() {
      this.$store.commit("set_data", {
        // eslint-disable-next-line no-undef
        ip: returnCitySN
      });
    }
  }
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
