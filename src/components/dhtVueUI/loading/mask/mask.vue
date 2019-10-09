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
