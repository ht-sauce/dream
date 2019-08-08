<template>
  <div class="div1">
    <img src="./img/1.jpg" height="411" width="658" alt="" />
    <div class="div1_1">1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.div1 {
  margin-left: 500px;
  margin-top: 100px;
  width: 800px;
  height: 400px;
  transform: perspective(800px);
  transform-style: preserve-3d;
}
img {
  box-shadow: #2a579a 0 0 50px;
  transform: rotateY(30deg);
  width: 100%;
  height: 100%;
}
</style>
