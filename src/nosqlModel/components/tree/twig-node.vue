<template>
  <div class="tree-twig-one" :style="{ height: height + 'px' }">
    <div
      class="tree-node-content"
      v-show="isShow"
      :style="{ paddingLeft: level * indent + 'px' }"
      @click="showNode"
    >
      <span
        v-show="child.children.length > 0"
        class="iconfont icon-jiantou arrow"
        :style="{ transform: 'rotate(' + rotate + 'deg)' }"
      ></span>
      <span :class="child.icon" class="icon"></span>
      <span>{{ child.label }}</span>
    </div>
    <twig-node
      v-for="(item, index) in child.children"
      :key="index"
      :child="item"
      :level="level + 1"
      :data-location="[level + 1, index]"
      :indent="indent"
      :aheight="aheight"
    ></twig-node>
  </div>
</template>

<script>
export default {
  name: "twigNode",
  components: {},
  data() {
    return {
      rotate: 0, // 三角形标记
      isShow: true, //操作子元素关闭,注意该参数废弃，保留不删除
      height: this.aheight, // 通过动画来显示和关闭
      nowActive: false //当前菜单操作状态
    };
  },
  props: {
    indent: {
      // 缩进
      type: Number,
      default: 18
    },
    aheight: {
      // 动画效果下，每一级的高度
      type: Number,
      default: 25
    },
    dataLocation: Array, //数据定位，表示层级和数据位置
    level: Number, //当前层级
    child: Object //子节点数据
  },
  beforeCreate() {},
  created() {
    //console.log(this.dataLocation);
    if (this.child.children.length > 0 || this.level === 1) {
      this.isShow = true;
    }
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    //打开或者关闭节点
    showNode() {
      if (this.child.children.length <= 0) return false;

      if (this.height === this.aheight) {
        this.height = this.aheight * (this.$children.length + 1);
        this.rotate = 90;
      } else {
        this.height = this.aheight;
        this.rotate = 0;
      }
      //操作子元素方式开启关闭
      /*let operationNode = (show = false) => {
        this.$children.map(val => {
          val.isShow = show;
          return val;
        });
        this.nowActive = show;
      };
      if (this.nowActive) {
        operationNode(false);
      } else {
        operationNode(true);
      }*/
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/nosqlModel/common/style/let.scss";
.tree-twig-one {
  position: relative;
  transition: height 0.5s ease;
  overflow: hidden;
  .tree-node-content {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-left: 18px;
    height: 25px;
    &:hover,
    &:active {
      background: rgba(15, 128, 255, 0.1);
    }
    .arrow {
      font-size: 12px;
      color: $font_info;
      margin-right: 5px;
      transition: transform 0.5s ease;
      //transform: rotate(90deg);
    }
    .icon {
      font-size: $size-main;
      color: $icon-main;
      margin-right: 5px;
    }
  }
}
</style>
