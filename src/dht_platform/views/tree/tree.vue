<template>
  <div class="twoli">
    <template v-for="(item, index) in node">
      <div class="two" :key="index">{{ item.text }}</div>
      <template v-if="item.children && item.children.length > 0">
        <tree-li :key="index" :node="item.children"></tree-li>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "treeUl",
  components: {
    treeLi: () => {
      return import("./treeLi.vue");
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
.twoli {
  display: flex;
  flex-flow: column;
}
.two {
  padding: 2px;
  width: 50px;
  background: #bfe9ff;
  display: inline-block;
  margin-left: 20px;
  margin-top: 1px;
}
</style>
