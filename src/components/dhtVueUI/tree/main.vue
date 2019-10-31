<template>
  <div class="dht-tree-main">
    <twig-node
      v-for="(item, index) in data"
      :key="getNodeKey(item, index)"
      :child="item"
      :level="1"
      :data-location="[1, index]"
      :indent="indent"
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
    },
    indent: {
      // 每一层缩进多少像素
      type: Number,
      default: 18
    }
  },
  data() {
    return {
      active: true
    };
  },
  beforeCreate() {},
  created() {
    this.isTree = true;
  },
  beforeMount() {},
  mounted() {
    //是否有子元素作为模板
    this.slot = !!this.$scopedSlots.default;
  },
  destroyed() {},
  methods: {
    getNodeKey(node, index) {
      return node.id ? node.id : index;
    }
  }
};
</script>
