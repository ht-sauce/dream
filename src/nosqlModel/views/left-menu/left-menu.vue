<template>
  <div class="left-menu">
    <!--操作菜单-->
    <tree class="left-menu-tree" :data="treeData"></tree>
  </div>
</template>

<script>
export default {
  components: {
    tree: () => import("@/nosqlModel/components/tree/main.vue")
  },
  data() {
    return {
      treeData: [
        {
          label: "建模",
          icon: "iconfont icon-shujujianmo",
          type: "main",
          children: []
        },
        {
          label: "表",
          icon: "iconfont icon-zu",
          type: "table",
          children: [
            {
              label: "table1",
              icon: "iconfont icon-zu",
              type: "table",
              children: []
            }
          ]
        },
        {
          label: "视图",
          icon: "iconfont icon-shipinshitu",
          type: "view",
          children: []
        }
      ]
    };
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
.left-menu {
  display: flex;
  flex-flow: column;
  font-size: $size-main;
  .left-menu-tree {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
