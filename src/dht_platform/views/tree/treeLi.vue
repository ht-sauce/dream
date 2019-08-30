<template>
  <div class="sanli">
    <template v-for="(item, index) in node">
      <div class="san" :key="index">{{ item.text }}</div>
      <template v-if="item.children && item.children.length > 0">
        <tree-ul :key="index" :node="item.children"></tree-ul>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "treeLi",
  components: {
    treeUl: () => {
      return import("./tree.vue");
    }
  },
  props: {
    node: Array
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped>
.sanli {
  display: flex;
  flex-flow: column;
  position: relative;
  margin-left: 30px;
}
.san {
  padding: 2px;
  background: aquamarine;
  margin-top: 1px;
  width: 50px;
}
</style>
