<template>
  <div class="dht-tree-twig-one">
    <div class="dht-tree-node-content">
      <node-content :node="child"></node-content>
    </div>
    <twig-node
      v-for="(item, index) in child.children"
      :key="getNodeKey(item, index)"
      :child="item"
    ></twig-node>
  </div>
</template>

<script>
export default {
  name: "twigNode",
  components: {
    nodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render() {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;

        return tree.$scopedSlots.default
          ? tree.$scopedSlots.default({ node })
          : (parent.$scopedSlots = {
              default: () => {
                return node;
              }
            });
      }
    }
  },
  data() {
    return {
      tree: null
    };
  },
  props: {
    child: {
      default() {
        return {
          tree: null
        };
      }
    }
  },
  beforeCreate() {},
  created() {
    const parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
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
