<template>
  <div id="app">
    <!--不可变化部分-->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  beforeCreate() {},
  created() {
    this.responsive();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    responsive() {
      //响应式rem函数
      rem();
      //响应式代码解决方案，rem处理
      //rem事件监听，保证响应式触发
      window.addEventListener("resize", rem);
      window.addEventListener("pageshow", function(e) {
        //前进后退事件,移动端，暂时没啥用
        if (e.persisted) {
          rem();
        }
      });
      function rem() {
        //rem修改
        //多减去1，不行则2，因为浏览器滚动条会更宽1像素
        let innerwindth = window.innerWidth; //总宽度
        let width = innerwindth - getScrollWidth() - 1;
        document.getElementsByTagName("html")[0].style.fontSize =
          width / 100 + "px";
        /*
                document.body.clientWidth,document.body.offsetWidth
                document.body.offsetWidth 获取body元素对象的宽度，
                即offsetWidth=width+padding+border，
                也可以写成offsetWidth=clientWidth+border
                */
        function getScrollWidth() {
          //获取页面滚动条宽度
          var noScroll,
            scroll,
            oDiv = document.createElement("DIV");
          oDiv.style.cssText =
            "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
          noScroll = document.body.appendChild(oDiv).clientWidth;
          oDiv.style.overflowY = "scroll";
          scroll = oDiv.clientWidth;
          document.body.removeChild(oDiv);
          return noScroll - scroll;
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/dht_blog/common/style/public.scss";
//app下编写全局存在的css，进行控制
//页面宽度布局用rem进行布局，避免因为百分比导致页面缩小页面错乱
body {
  width: 100%;
  overflow-x: hidden;
}
#app {
  font: 14px alpht;
  width: 100rem;
  min-height: 100vh;
  color: $font_main;
  //控制页面全局的宽度
  .g-width {
    width: 76rem;
    height: 100%;
  }
}
//外部引入的看板娘位置设置
#waifu {
  position: fixed;
  bottom: -12px;
  left: inherit;
  right: 13px;
  z-index: 1;
  line-height: 0;
  transition: bottom 0.3s ease-in-out;
}
</style>
