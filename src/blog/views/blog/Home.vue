<template>
  <div id="blog">
    <!--顶部导航部分-->
    <navigation></navigation>
    <!--嵌套路由部分都在这里展示-->
    <transition name="page-transition">
      <router-view class="router-view"></router-view>
    </transition>
    <!--底部版权说明-->
    <tail>海天酱油的个人博客</tail>
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
      return import("@/components/copyright/tail.vue");
    }
  },
  data() {
    return {};
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
//注意全局列表排列和左右居中
#blog {
  display: flex;
  flex-flow: column;
  align-items: center;
  background: #e3f6ff;
  .router-view {
    min-height: 80vh;
  }
}
</style>
