<template>
  <div id="head" class="shadow">
    <div class="g-width h-nav">
      <h1 @click="pageJump()">
        海天酱油博客
      </h1>
      <ul class="navigation">
        <template v-for="(item, index) in h2List">
          <li :key="index" @click="pageJump(index)">
            <span :class="{ nav_isactive: item.isActive }">
              <h2>{{ item.title }}</h2>
            </span>
          </li>
        </template>
      </ul>
    </div>
    <herader-user :noshow="$store.state.core"></herader-user>
  </div>
</template>

<script>
export default {
  components: {
    heraderUser: () =>
      import("@/components/project/header_user/header-user.vue")
  },
  data() {
    return {
      h2List: [
        { title: "首页", url: "/home", isActive: true },
        { title: "关于我", url: "/onself", isActive: false },
        { title: "学海无涯", url: "/blogList", isActive: false },
        { title: "享受生活", url: "/enjoyLife", isActive: false },
        { title: "口下留情", url: "/forum", isActive: false }
      ]
    };
  },
  beforeCreate() {},
  created() {
    this.onloadPage();
  },
  methods: {
    //页面跳转
    pageJump(index) {
      this.h2List.map(val => {
        val.isActive = false;
      });
      if (index) {
        this.h2List[index].isActive = true;
        let url = this.h2List[index].url;
        this.$router.push({ path: url, query: { page: index } });
      } else {
        this.$router.push({ path: "/" });
        this.h2List[0].isActive = true;
      }
    },
    //刷新的时候需要保持状态
    onloadPage() {
      let index = this.$route.query.page;
      if (index) {
        this.h2List[0].isActive = false;
        this.h2List[index].isActive = true;
        let url = this.h2List[index].url;
        this.$router.push({ path: url, query: { page: index } });
      } else {
        this.$router.push({ path: "/" });
        this.h2List[0].isActive = true;
      }
    }
  }
};
</script>

<style lang="scss">
#head {
  width: 100%;
  $height: 65px;
  background: #ffffff;
  height: $height;
  display: flex;
  justify-content: center;
  //内部导航控制
  .h-nav {
    display: flex;
    flex-flow: row;
    line-height: $height - 3px;
    margin-right: 20px;
    h1 {
      font-size: 28px;
      margin-right: auto;
    }
    //导航栏
    .navigation {
      display: flex;
      flex-flow: row;
      align-items: center;
      //每个列的控制
      li {
        cursor: pointer;
        user-select: none;
        margin-left: 40px;
        font-size: 16px;
        color: #555;
      }
      //当点击之后的效果
      .nav_isactive {
        display: inline-block;
        height: 50px;
        font-size: 17px;
        color: #000000;
        border-bottom: #333 2px solid;
      }
    }
  }
}
</style>
