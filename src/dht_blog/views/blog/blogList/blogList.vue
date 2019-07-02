<template>
  <div id="blogList" class="g-width">
    <div class="left">
      <left-blog :list="leftBlogData"></left-blog>
    </div>
    <div class="right">
      <div class="operation">
        <div class="self">
          <dht-img class="headPortrait" :src="onselfData.img"></dht-img>
          <span>{{ onselfData.name }}</span>
        </div>
        <div class="share">
          <div>原创：45</div>
          <div>转载：10</div>
        </div>
        <div class="census">
          <div>访问量：10</div>
          <div>访问人：3</div>
        </div>
        <div class="writing">
          <div><router-link to="/richTextEditor">写博客</router-link></div>
          <div>编辑</div>
        </div>
      </div>
      <right-blog title="点击排行" :list="rightBlogData"></right-blog>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogList",
  data() {
    return {
      onselfData: {
        img: require("@/dht_blog/assets/images/home/avatar.jpg"),
        name: "海天酱油"
      },
      //左侧博客数据流
      leftBlogData: [
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          icon: ["css", "html", "javascript"],
          img: require("../../../assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        }
      ],
      //右侧点击量排行
      rightBlogData: [
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          img: require("@/dht_blog/assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          img: require("@/dht_blog/assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        },
        {
          id: 1,
          title: "陌上花开，缓缓归矣",
          text:
            "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板",
          img: require("@/dht_blog/assets/images/home/text01.jpg"),
          time: "2019-05-20",
          browse: "20"
        }
      ]
    };
  },
  components: {
    leftBlog: () => {
      return import("@/dht_blog/views/components/left_blog.vue");
    },
    rightBlog: () => {
      return import("@/dht_blog/views/components/right_blog.vue");
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {}
};
</script>

<style scoped lang="scss">
@import "@/dht_blog/common/style/public.scss";
#blogList {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 20px 0 30px 0;
  .left {
    width: 69%;
    box-sizing: border-box;
  }
  .right {
    width: 29%;
    .operation {
      width: 100%;
      display: flex;
      flex-flow: column;
      background: #ffffff;
      box-sizing: border-box;
      margin-bottom: 20px;
      padding: 20px;
      font-size: 16px;
      color: $font_main_info;
      > div {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: $border_main 1px solid;
      }
      .self {
        .headPortrait {
          width: 55px;
          height: 55px;
          margin-right: 20px;
          /deep/ .dht-showimg {
            border-radius: 50%;
          }
        }
      }
      .share {
        height: 30px;
        padding: 10px 0;
        justify-content: space-around;
      }
      .census {
        @extend .share;
      }
      .writing {
        @extend .share;
      }
    }
  }
}
</style>
