<template>
  <div class="dht-rendering-echarts" :id="id"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
import chinaJson from "./china";
export default {
  name: "dhtRenderingEcharts",
  props: {
    id: String,
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
  created() {},
  beforeMount() {},
  mounted() {
    this.$nextTick(() => {
      //将数据返回出去标识加载完成
      this.$emit("loadFinish", this.id);
      this.renderingEcharts();
    });
    //this.echarts.resize();
    //IntersectionObserver尝试用这个来做监听
  },
  methods: {
    //渲染echarts
    renderingEcharts() {
      let dom = null;
      let timer = setInterval(() => {
        dom = document.querySelector(`#${this.id}`);
        this.chinajson && echarts.registerMap("china", chinaJson);
        if (dom && this.options) {
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
