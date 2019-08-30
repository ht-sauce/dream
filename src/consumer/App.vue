<template>
  <!--该页面仅仅是做分发使用。仅做登录使用-->
  <div id="consumer">
    <!--<router-view style="min-height: 100vh"></router-view>-->
    <router-view style="min-height: 100vh;"></router-view>
    <tail>海天酱油平台</tail>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      blog: "/dht_blog/index",
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
  font: 14px alpht sans-serif;
  color: $font_main;
}
</style>
