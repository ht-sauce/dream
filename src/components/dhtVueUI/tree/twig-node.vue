<template>
  <div class="dht-tree-twig-one">
    <div
      class="dht-tree-node-content"
      :style="{ paddingLeft: level * indent + 'px' }"
    >
      <!--箭头-->
      <span class="arrow-main">
        <span
          v-if="child.children.length > 0"
          @click="
            () => {
              const show = (child.isShow = !child.isShow);
              showNode(show, child, dataLocation);
            }
          "
          class="iconfont icon-jiantou arrow"
          :style="{
            transform: child.isShow ? 'rotate(90deg)' : 'rotate(0deg)'
          }"
        ></span>
      </span>
      <!--icon图标-->
      <span v-if="child.icon" :class="child.icon" class="icon"></span>
      <!--可自定义部分-->
      <node-content
        :node="child"
        v-if="show"
        :data-location="dataLocation"
        :parent-data="parentData"
      ></node-content>
    </div>
    <transition-group name="dht-tree-node">
      <twig-node
        v-for="(item, index) in child.children"
        v-show="child.isShow"
        :key="getNodeKey(item, index)"
        :child="item"
        :parent-data="child"
        :level="level + 1"
        :data-location="[dataLocation[0], index]"
        :indent="indent"
      ></twig-node>
    </transition-group>
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
        },
        dataLocation: Array,
        parentData: Object // 父级数据
      },
      render(ce) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const location = this.dataLocation;
        const parentData = this.parentData;

        if (tree.slot) {
          return tree.$scopedSlots.default
            ? tree.$scopedSlots.default({ node, location, parentData })
            : (parent.$scopedSlots = {
                default: () => {
                  return { node, location, parentData };
                }
              });
        } else {
          return ce("span", node.label);
        }
      }
    }
  },
  computed: {},
  data() {
    return {
      tree: {},
      show: false //控制渲染的节点数据不要过早渲染，导致slot为空
    };
  },
  props: {
    indent: {
      // 缩进
      type: Number,
      default: 18
    },
    parentData: Object, // 父级数据
    dataLocation: Array, //数据定位，属于父级的第几项数据
    level: Number, //当前层级
    child: Object //子节点数据
  },
  beforeCreate() {},
  created() {
    const parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.$parent.tree;
    }
  },
  beforeMount() {},
  mounted() {
    this.show = true;
  },
  destroyed() {},
  methods: {
    getNodeKey(node, index) {
      return node.id ? node.id : index;
    },
    //打开或者关闭节点返回数据
    showNode(isShow, node, location) {
      this.$emit("open", { isShow, node, location });
    }
  }
};
</script>
