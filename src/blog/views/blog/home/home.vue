<template>
  <div id="bloghome">
    <!--首部大图广告-->
    <div class="banner">
      <home-banner></home-banner>
    </div>
    <!--中间主数据部分-->
    <div class="content">
      <div class="g-width">
        <!--      左边博客列表-->
        <div class="left">
          <!--避免页面太过复杂，抽离成为单独的模板文件-->
          <left-blog :list="leftBlogData"></left-blog>
        </div>
        <!--      右边个性推荐-->
        <div class="right">
          <!--个人信息展示-->
          <div class="right-oneself">
            <dht-img
              class="right-oneself-bgimg"
              :src="require('@/blog/assets/images/home/banner.png')"
            ></dht-img>
            <dht-img class="oneself-img" :src="oneselfData.portrait"></dht-img>
            <div class="right-oneself-cont">
              <div class="onself-name">
                {{ oneselfData.nickname }}
              </div>
              <div class="onself-icon">
                {{ oneselfData.tag }}
              </div>
              <dht-text
                class="onself-content"
                :text="oneselfData.synopsis"
              ></dht-text>
            </div>
          </div>
          <!--底部推荐-->
          <right-blog
            class="right-blog-list"
            title="点击排行"
            :list="rightBlogData"
          ></right-blog>
          <!--<right-blog
            class="right-blog-list"
            title="酱油推荐"
            :list="rightBlogData"
          ></right-blog>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftBlog from "@/blog/views/components/left_blog";
import RightBlog from "@/blog/views/components/right_blog";
export default {
  name: "blogHome",
  data() {
    return {
      //左侧博客数据流
      leftBlogData: [
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          content: "",
          classify: "",
          cover: "",
          created_at: "",
          visit: "20"
        }
      ],
      //个人面板数据
      oneselfData: this.$store.state.blogger,
      rightBlogData: [
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          content: "",
          classify: "",
          cover: "",
          created_at: "",
          visit: "20"
        }
      ]
    };
  },
  components: {
    RightBlog,
    leftBlog,
    homeBanner: () => {
      return import("../home/banner.vue");
    }
  },
  beforeCreate() {},
  created() {
    this.blog_list();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  methods: {
    // 博客列表
    blog_list(limit = 10, page = 1) {
      const data = {
        limit: limit,
        page: page
      };
      this.axios
        .ajax({
          url: this.$api.blog().article.list,
          data: data
        })
        .then(e => {
          const blog = e.data.list.map(val => {
            val.cover = val.cover ? this.$api.static().visit + val.cover : "";
            return val;
          });
          this.leftBlogData = blog;
          this.rightBlogData = blog;
        })
        .catch();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";
#bloghome {
  .content {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    > div {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      //左侧博客列表
      .left {
        width: 69%;
      }
      //右侧列表
      .right {
        width: 29%;
        display: flex;
        flex-flow: column;
        .right-oneself {
          width: 100%;
          background: #ffffff;
          height: 430px;
          display: flex;
          flex-flow: column;
          align-items: center;
          overflow: hidden;
          .right-oneself-bgimg {
            width: 100%;
            height: 145px;
          }
          .oneself-img {
            width: 110px;
            height: 110px;
            margin-top: -60px;
            /deep/ .dht-showimg {
              border-radius: 50%;
            }
          }
          .right-oneself-cont {
            width: 100%;
            height: 185px;
            box-sizing: border-box;
            padding: 25px 50px;
            margin-top: -5px;
            color: $font_main;
            text-align: center;
            .onself-name {
              font-size: 16px;
              font-weight: bold;
              width: 100%;
            }
            .onself-icon {
              font-size: 14px;
              color: $font-icon;
              margin-top: 5px;
            }
            .onself-content {
              margin-top: 17px;
              font-size: 14px;
              color: $font_main_info;
              text-align: left;
              letter-spacing: 1.5px;
            }
          }
        }
        .right-blog-list {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
