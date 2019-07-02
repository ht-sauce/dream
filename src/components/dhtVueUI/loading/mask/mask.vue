<template>
  <div
    :class="fullscreen ? 'dhtMask-FullScreen' : 'dhtMask'"
    :style="{
      zIndex: this.$dhtUI.zIndex,
      background: 'rgba(' + background + ')',
      fontSize: fontSize + 'px',
      color: color
    }"
  >
    <img
      class="dht-loading-icon"
      :src="iconSrc"
      alt="loading"
      :style="{ width: iconWidth + 'px', height: iconHeight + 'px' }"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "dhtMask",
  data() {
    return {
      fullscreen: false,
      background: "0, 0, 0, 0.5",
      text: "加载中…",
      iconSrc: null,
      iconWidth: null,
      iconHeight: null,
      color: null,
      fontSize: null
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    if (this.fullscreen) {
      document.body.style.overflow = "hidden";
    }
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {
    document.body.style.overflowX = "hidden";
  },
  errorCaptured() {},
  methods: {}
};
</script>

<style lang="scss">
.dhtMask {
  position: absolute;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  flex-flow: column;
}
.dhtMask-FullScreen {
  @extend .dhtMask;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: (0, 0, 0, 0.5);
}
.dht-loading-icon {
  width: 25px;
  height: 25px;
  object-fit: cover;
  margin-bottom: 5px;
  animation: dht-rotate 2s linear infinite;
  @keyframes dht-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
