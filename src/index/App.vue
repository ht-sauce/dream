<template>
  <!--该页面仅仅是做分发使用。不做任何页面-->
  <div id="app">
    <a :href="prefix + blog">博客中心</a><br />
    <a :href="prefix + platform">后台管理系统</a>
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
<style></style>
