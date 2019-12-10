<template>
  <div class="img-magnifier">
    <div class="main-img">
      <img src="../../assets/img/icon/dogHead.jpg" alt="" />
      <div v-dht-move="true" class="mask"></div>
    </div>
    <div class="preview">
      <img src="../../assets/img/icon/dogHead.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    ceshi(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
.img-magnifier {
  display: flex;
  justify-content: center;
  align-items: center;
  .main-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      top: 0;
      position: absolute;
      width: 20px;
      height: 20px;
      background: red;
    }
  }
}
</style>
