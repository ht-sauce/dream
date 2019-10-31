<template>
  <div class="dht-cat-container" v-show="isLoaded">
    <canvas
      id="dht-cat"
      :width="style.width"
      :height="style.height"
      class="live2d"
    ></canvas>
  </div>
</template>

<script>
//源码来自：https://github.com/QiShaoXuan/vuepress-plugin-cat
import live2dJSString from "./live2d";

export default {
  name: "dhtCat",
  data() {
    return {
      isLoaded: true,
      model: {
        blackCat:
          "https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json",
        whiteCat:
          "https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json"
      },
      style: {
        width: 280,
        height: 250
      }
    };
  },
  mounted() {
    this.initCat();

    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        this.initCat();
      }
    });
  },
  methods: {
    initCat() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        this.isLoaded = false;
        return console.log("mobile do not load model");
      }

      if (!window.loadlive2d) {
        const script = document.createElement("script");
        script.innerHTML = live2dJSString;
        document.body.appendChild(script);
      }

      this.style = {
        width: (150 / 1424) * document.body.clientWidth,
        height: ((150 / 1424) * document.body.clientWidth) / 0.8
      };

      setTimeout(() => {
        window.loadlive2d("dht-cat", this.model.blackCat);
      }, 500);
    }
  }
};
</script>
<style lang="scss">
.dht-cat-container {
  position: fixed;
  right: 50px;
  bottom: 100px;
  color: #00adb5;
  #dht-cat {
    position: fixed;
    opacity: 0.9;
    right: 0;
    bottom: -20px;
    z-index: 99999;
    pointer-events: none;
  }
}
</style>
