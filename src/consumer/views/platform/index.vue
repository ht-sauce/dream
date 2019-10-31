<template>
  <div class="platform">
    <platform-head></platform-head>
    <transition name="page-transition">
      <router-view class="platform-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    platformHead: () => import("./components/platform-head.vue")
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
  errorCaptured() {}
};
</script>

<style scoped lang="scss">
.platform {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  .platform-view {
    width: 70vw;
    min-width: 960px;
    margin: 10px 0;
    min-height: calc(100vh - 85px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: #ffffff 0 0 3px;
    padding: 25px 20px;
  }
}
</style>
