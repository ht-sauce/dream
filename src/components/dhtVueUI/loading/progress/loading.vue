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
