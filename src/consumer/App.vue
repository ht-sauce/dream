<template>
  <!--该页面仅仅是做分发使用。仅做登录使用-->
  <div id="consumer">
    <dht-cat></dht-cat>
    <transition name="page-transition">
      <router-view class="consumer-page"></router-view>
    </transition>
    <tail>海天酱油用户分发平台</tail>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      blog: "/blog/index",
      platform: "/dht_platform/home",
      prefix: ""
    };
  },
  components: {
    tail: () => {
      return import("@/components/copyright/tail.vue");
    }
  },
  beforeCreate() {},
  created() {
    this.prefix = process.env.NODE_ENV === "production" ? "/public" : "";
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/public.scss";
#consumer {
  font: 14px "Microsoft YaHei UI" sans-serif;
  color: $font_main;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .consumer-page {
    min-height: 100vh;
    width: 100%;
    background-image: url("./assets/images/back.jpg");
    background-size: 100% 100%;
  }
}
</style>
