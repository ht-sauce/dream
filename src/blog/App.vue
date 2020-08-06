<template>
  <div id="app">
    <!--不可变化部分-->
    <transition name="page-transition">
      <router-view />
    </transition>
    <dht-cat></dht-cat>
  </div>
</template>
<script>
import store from 'store'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'App',
  data() {
    return {
      observer: null,
      firedNum: 0,
      recordOldValue: {
        // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0',
      },
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
    const user = store.get('user_info')
    // 将用户数据存入到vuex便于后续操作
    this.$store.commit('set_data', {
      user_info: user ? user.userInfo : null,
    })
    this.classify_list_all()
    this.blogger()
    this.getIP()
    // 按页面加载计算计算
    this.blog_visit()
  },
  beforeMount() {},
  mounted() {
    // 监听元素变化
    /*let MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    let element = document.querySelector("#app");
    // eslint-disable-next-line no-unused-vars
    this.observer = new MutationObserver(mutationList => {
      /!*for (let mutation of mutationList) {
        console.log(111111, mutation);
      }*!/
      let width = getComputedStyle(element).getPropertyValue("width");
      let height = getComputedStyle(element).getPropertyValue("height");
      if (
        width === this.recordOldValue.width &&
        height === this.recordOldValue.height
      )
        return;
      this.recordOldValue = {
        width,
        height
      };
      this.firedNum += 1;
    });
    this.observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["style"],
      attributeOldValue: true
    });*/
    // 执行canvas动画
    // let canvas = document.getElementById("canvas");
    // let spaceboi = new Thpace(canvas);
    // spaceboi.start();
  },
  beforeDestroyed() {
    // 监听元素变化
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
    }
  },
  methods: {
    // 文章所有分类列表
    classify_list_all() {
      this.axios
        .ajax({
          url: this.$api.blog().article.classify.list,
        })
        .then(e => {
          this.$store.commit('set_data', {
            all_class: e.data,
          })
        })
        .catch()
    },
    // 博主信息接口
    blogger() {
      this.axios
        .ajax({
          url: this.$api.consumer().user.blogger,
        })
        .then(e => {
          // console.log(e.data);
          e.data.portrait = this.$api.static().visit + e.data.portrait
          this.$store.commit('set_data', {
            blogger: e.data,
            // 博主状态
            is_blogger:
              this.$store.state.user_info && this.$store.state.user_info.account === e.data.account,
          })
        })
        .catch()
    },
    // 获取用户ip信息，匿名用户有用
    getIP() {
      let isU = e => {
        return e ? e : ''
      }
      this.axios
        .ajax({
          url: this.$api.blog().blog.ip,
        })
        .then(e => {
          this.$store.commit('set_data', {
            ip: {
              cip: isU(e.data.ip),
              cname: isU(e.data.country) + isU(e.data.area) + isU(e.data.region),
            },
          })
        })
        .catch()
    },
    // 博客站点访问量统计
    blog_visit() {
      this.axios
        .ajax({
          url: this.$api.blog().blog.visit,
        })
        .then()
        .catch()
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/css/public.scss';
//app下编写全局存在的css，进行控制
//页面宽度布局用rem进行布局，避免因为百分比导致页面缩小页面错乱
body {
  width: 100%;
  overflow-x: hidden;
}
#app {
  font-size: 14px;
  width: 100vw;
  color: $font_main;
  min-height: 100%;
  //background-color: #f9f9f9;
  background-image: url('./assets/paper.png');
  //控制页面全局的宽度
  .g-width {
    width: 80vw;
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
