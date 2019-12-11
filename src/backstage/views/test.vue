<template>
  <div class="img-magnifier">
    <div
      ref="zoom"
      class="main-img"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <img src="../../assets/img/icon/dogHead.jpg" alt />
      <div
        ref="mask"
        class="mask"
        :style="{ top: mask.top + 'px', left: mask.left + 'px' }"
      ></div>
    </div>
    <div class="preview">
      <img src="../../assets/img/icon/dogHead.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mask: {
        top: null,
        left: null
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    // 鼠标移出
    mouseleave() {},
    // 鼠标移入
    mouseenter(e) {
      const mask = this.$refs["mask"];
      const zoom = this.$refs["zoom"];
      const endY = zoom.offsetHeight - mask.offsetHeight;
      const endX = zoom.offsetWidth - mask.offsetWidth;
      const Y =
        e.clientY - zoom.offsetTop - zoom.clientTop - mask.offsetHeight / 2;
      const X =
        e.clientX - zoom.offsetLeft - zoom.clientLeft - mask.offsetWidth / 2;
      this.mask = {
        top: Y > endY ? endY : Y < 0 ? 0 : Y,
        left: X > endX ? endX : X < 0 ? 0 : X
      };
    }
  }
};
</script>

<style scoped lang="scss">
.img-magnifier {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .main-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      top: 0;
      position: absolute;
      width: 50px;
      height: 50px;
      background: #409eff;
      opacity: 0.5;
    }
  }
  .preview img {
    position: absolute;
    margin-top: 0;
    margin-left: 0;
  }
}
</style>
