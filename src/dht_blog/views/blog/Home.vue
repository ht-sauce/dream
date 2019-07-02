<template>
  <div id="dht_blog">
    <!--顶部导航部分-->
    <navigation></navigation>
    <!--嵌套路由部分都在这里展示-->
    <router-view></router-view>
    <!--底部版权说明-->
    <tail></tail>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    navigation: () => {
      return import("./navigation/head.vue");
    },
    tail: () => {
      return import("@/dht_blog/views/blog/navigation/tail.vue");
    }
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
//注意全局列表排列和左右居中
#dht_blog {
  display: flex;
  flex-flow: column;
  align-items: center;
  background: #e3f6ff;
}
</style>
