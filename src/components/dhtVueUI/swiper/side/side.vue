<template>
  <div
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    class="dht-swiper-side"
    :style="{ zIndex: zIndex }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "dhtSwiperSide",
  props: {
    // 时间间隔
    interval: {
      type: Number,
      default: 8000
    },
    //是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    // x轴变化
    axisx: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    autoplay(val) {
      val ? this.startTimer() : this.stopTimer();
    }
  },
  data() {
    return {
      // 计时器
      timer: "",
      //子元素
      items: [],
      // 当前显示的元素
      active: 0
    };
  },
  beforeCreate() {},
  created() {
    this.$nextTick(() => {
      this.updateItems();
      this.startTimer();
      this.$children[0].show = true;
    });
  },
  beforeMount() {},
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    handleMouseEnter() {
      this.stopTimer();
    },

    handleMouseLeave() {
      this.startTimer();
    },
    //开始计时器
    startTimer() {
      //预先执行一次，保证不会出现第一次运行延迟双倍实际
      this.play();
      // 拦截处理
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(() => {
        this.play();
      }, this.interval);
    },
    // 停止计时器
    stopTimer() {
      clearInterval(this.timer);
    },
    // 更新元素
    updateItems() {
      this.items = this.$children.filter(
        // 更新元素需要确认为指定的子元素
        child => child.$options.name === "dhtSwiperSideItem"
      );
    },
    //播放实际运行函数
    play() {
      let len = this.items.length - 1;
      let now = this.active > len ? 0 : this.active;
      let old = this.active - 1 < 0 ? 0 : this.active - 1;
      //console.log("当前", now, "老的", old);
      //关闭老元素
      this.items[old].show = false;
      this.items[old].itemStyle = {
        transition: "all 1.5s ease",
        transform: `translateX(${this.axisx}px)`
      };
      //显示新元素
      this.items[now].show = true;
      this.items[now].itemStyle = {
        transition: "all 1.5s ease",
        transform: "translateX(0)",
        animation: "mymove 1.5s 2"
      };
      //记录数据
      this.active = now + 1;
    }
  }
};
</script>
