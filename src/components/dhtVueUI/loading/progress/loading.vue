<template>
  <div
    class="dht-loading"
    :style="{ width: value + 'vw', background: background }"
  >
    <div class="dht-loading-animation"></div>
    <div
      v-if="mask"
      class="dht-loading-mask"
      :style="{ zIndex: this.$dhtUI.zIndex }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "dhtLoading",
  data() {
    return {
      mask: false,
      value: 0,
      group: [5, 15, 30, 55, 60, 75, 80, 85, 93],
      background: "#07b970"
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeDestroy() {},
  destroyed() {
    document.body.style.overflowX = "hidden";
  },
  mounted() {
    if (this.mask) {
      document.body.style.overflow = "hidden";
    }
    this.gradual();
  },
  methods: {
    //分组分组渐进
    gradual() {
      let len = this.group.length;
      let self = this;
      if (this.group.length > 0) {
        for (let i = 0; i < len; i++) {
          (function(i) {
            setTimeout(() => {
              self.value = self.group[i];
            }, 500 * i);
          })(i);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.dht-loading {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 3px;
  border-radius: 1.5px;
  background: #07b970;
  transition: width 500ms;
  .dht-loading-animation {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    animation: load 1s ease infinite;
    @keyframes load {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
  }
  //触摸穿透蒙版
  .dht-loading-mask {
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    pointer-events: auto;
  }
}
</style>
