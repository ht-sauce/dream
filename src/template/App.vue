<template>
  <div id="template">
    <router-view />
    <bottom>模板测试</bottom>
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
#template {
  font: 14px "Microsoft YaHei UI" sans-serif;
  color: $font_main;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
