<template>
  <div class="dht-tree-main">
    <twig-node
      v-for="(item, index) in data"
      :key="getNodeKey(item, index)"
      :child="item"
    >
    </twig-node>
  </div>
</template>

<script>
export default {
  name: "dhtTree",
  components: {
    twigNode: () => import("./twig-node.vue")
  },
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      renderContent: Function
    };
  },
  beforeCreate() {},
  created() {
    this.isTree = true;
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    getNodeKey(node, index) {
      return node.id ? node.id : index;
    }
  }
};
</script>
