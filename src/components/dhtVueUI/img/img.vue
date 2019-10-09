<template>
  <div class="dht-Image" @click="lazyImg">
    <img
      ref="dht_img"
      class="dht-showimg"
      :style="{ objectFit: fit }"
      v-if="isload"
      :src="lazy === true ? lazyList.img : src"
      :alt="alt"
      @error="imgErr"
      @load="imgSuccess"
    />
    <div v-else class="dht-errImgInfo">
      <img
        ref="dht_img2"
        class="dht-showimg"
        :style="{ objectFit: fit }"
        v-if="errload"
        :src="lazy === true ? lazyList.errimg : errorSrc"
        :alt="alt"
        @error="imgErr2"
        @load="imgSuccess2"
      />
      <span v-else>{{ alt }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dhtImg",
  props: {
    lazy: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ""
    },
    //最终失败提示
    alt: {
      type: String,
      default: "图片加载中……"
    },
    //错误图片
    errorSrc: {
      type: String,
      default: ""
    },
    fit: {
      type: String,
      default: "cover"
    }
  },
  filters: {},
  watch: {
    //需要实时监听数据变化，否则单纯数据变化，不会重新显示图片
    src() {
      this.isload = true;
    },
    errorSrc() {
      this.errload = true;
    }
  },
  data() {
    return {
      //图片是否加载成功
      isload: true,
      //错误图片是否加载成功
      errload: true,
      //计时器
      time: null,
      //懒加载图片展处
      lazyList: {
        img: "",
        errimg: ""
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //是否懒加载展示图片
    this.lazy && this.lazyImg();
  },
  methods: {
    //懒加载函数
    lazyImg() {
      //启动之前先清理之前的定时器
      clearInterval(this.time);
      //获得当前元素
      let dom = this.$refs.dht_img;
      //判断元素是否显示
      let isElementInViewport = el => {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      };
      this.time = setInterval(() => {
        //当元素显示则停止计时器
        isElementInViewport(dom) && this.stopLazyImg();
      }, 1000);
    },
    //停止计时器，让图片显示
    stopLazyImg() {
      clearInterval(this.time);
      //console.log("该展示图片了，并且定时器也要停止。");
      //注意让元素图片状态重新变化
      this.isload = true;
      this.errload = true;
      this.lazyList = {
        img: this.src,
        errimg: this.errorSrc
      };
    },
    //img成功
    imgSuccess() {
      this.isload = true;
    },
    //img错误加载判断
    imgErr() {
      let img = this.$refs.dht_img;
      img ? (img.onerror = null) : ""; //控制不要一直跳动
      this.isload = false;
    },
    imgSuccess2() {
      this.errload = true;
    },
    imgErr2() {
      let img2 = this.$refs.dht_img2;
      img2 ? (img2.onerror = null) : ""; //控制不要一直跳动
      this.errload = false;
    }
  }
};
</script>
