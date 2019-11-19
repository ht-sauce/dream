<template>
  <div id="interface">
    <!--头部-->
    <interface-head></interface-head>
    <!--内容-->
    <router-view class="interface-content" />
    <!--底部-->
    <bottom>海天酱油接口平台</bottom>
    <dht-cat></dht-cat>
  </div>
</template>
<script>
import store from "store";
export default {
  name: "interface",
  data() {
    return {};
  },
  components: {
    interfaceHead: () => import("@/interface/components/header/header.vue"),
    bottom: () => import("@/components/copyright/tail.vue")
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
#interface {
  font: 14px "Microsoft YaHei UI" sans-serif;
  color: $font_main;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .interface-content {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: 10px 15px 0 15px;
  }
}
</style>
