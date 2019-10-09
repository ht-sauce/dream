<template>
  <div class="index">
    <!--顶部操作项-->
    <header-options class="header-options"></header-options>
    <div class="content">
      <!--左侧菜单-->
      <left-menu class="left-menu"></left-menu>
      <!--操作区域-->
      <right-content class="right-content"></right-content>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    leftMenu: () => import("@/nosqlModel/views/left-menu/left-menu.vue"),
    headerOptions: () =>
      import("@/nosqlModel/views/header-options/header-options.vue"),
    rightContent: () =>
      import("@/nosqlModel/views/right-content/right-content.vue")
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
@import "@/nosqlModel/common/style/let.scss";
.index {
  .header-options {
    width: 100vw;
    height: 60px;
    background: #ffc45f;
  }
  .content {
    width: 100vw;
    height: calc(100vh - 60px);
    display: flex;
    flex-flow: row;
    .left-menu {
      width: 200px;
      height: 100%;
      border-right: $border_one 1px solid;
    }
    .right-content {
      width: calc(100vw - 200px);
      height: 100%;
      background: #1abc9c;
    }
  }
}
</style>
