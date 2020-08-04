<template>
  <div class="dht-rendering-echarts" ref="echarts"></div>
</template>

<script>
import echarts from "echarts";
// import "echarts-gl";
import chinaJson from "./china";
export default {
  name: "dhtRenderingEcharts",
  props: {
    chinajson: {
      type: Boolean,
      default: false
    },
    options: Object
  },
  data() {
    return {
      echarts: null
    };
  },
  watch: {
    //数据变化则重新渲染
    options: function() {
      this.renderingEcharts();
    }
  },
  beforeCreate() {},
  mounted() {
    this.$nextTick(() => {
      this.renderingEcharts();
      this.onresize()
    });
  },
  methods: {
    // 监听页面大小变化
    onresize() {
      const resize = () => {
        this.echarts && this.echarts.resize()
      }
      window.addEventListener('resize', resize)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resize)
      })
    },
    //渲染echarts
    renderingEcharts() {
      let dom = null;
      let timer = setInterval(() => {
        dom = this.$refs.echarts
        this.chinajson && echarts.registerMap("china", chinaJson);
        if (dom && this.options) {
          //将数据返回出去标识加载完成
          this.$emit('loadFinish')

          let myChart = echarts.init(dom);
          window.onresize = myChart.resize;
          myChart.setOption(this.options);
          this.echarts = myChart;
          clearInterval(timer);
        }
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.dht-rendering-echarts {
  width: 100%;
  height: 100%;
}
</style>
