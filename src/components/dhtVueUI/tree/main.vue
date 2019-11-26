<template>
  <div class="dht-tree-main">
    <twig-node
      v-for="(item, index) in data"
      :key="getNodeKey(item, index)"
      :child="item"
      :level="1"
      :data-location="[index]"
      :indent="indent"
      @open="
        e => {
          $emit('open', e);
        }
      "
    >
    </twig-node>
  </div>
</template>

<script>
// 前置条件没条数据都需要有isShow（是否展示当前列表），child（子项数据）
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
