<template>
  <div class="dht-swiper-side-item" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "dhtSwiperSideItem",
  data() {
    return {
      show: false,
      defaultStyle: {},
      itemStyle: {}
    };
  },
  watch: {},
  beforeCreate() {},
  created() {
    //元素创建和需要更新父元素属性
    this.$parent && this.$parent.updateItems();
  },
  beforeMount() {},
  mounted() {},
  destroyed() {
    //元素销毁和需要更新父元素属性
    this.$parent && this.$parent.updateItems();
  },
  methods: {}
};
</script>
