<template>
  <div class="tree-main">
    <twig-node
      v-for="(item, index) in data"
      :key="index"
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
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.tree-main {
  position: relative;
}
</style>
