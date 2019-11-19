<template>
  <ul class="left_blog">
    <template v-for="(item, index) in list">
      <li :key="index">
        <div class="top">
          <dht-img class="blog_img" :src="item.img"></dht-img>
          <div class="top-text">
            <h3>{{ item.title }}</h3>
            <dht-text :text="item.text" :num="150" class="blog_p"></dht-text>
          </div>
        </div>
        <!--底部标签-->
        <ul class="bottom">
          <li>
            <dht-img
              class="icon_img"
              :src="require('../../assets/images/home/newsbg01.png')"
            ></dht-img>
            <span class="icon_text">{{ item.icon | blogIconTaps }}</span>
          </li>
          <li>
            <dht-img
              class="icon_img"
              :src="require('../../assets/images/home/newsbg02.png')"
            ></dht-img>
            <span class="icon_text2">{{ item.time }}</span>
          </li>
          <li class="readText">
            <dht-img
              class="icon_img2"
              :src="require('../../assets/images/home/newsbg04.png')"
            ></dht-img>
            <span class="icon_text">( {{ item.browse }} )</span>
          </li>
          <li class="icon_text readText2">阅读原文</li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "left_blog",
  props: {
    list: Array
  },
  data() {
    return {};
  },
  filters: {
    blogIconTaps(val) {
      let nval = "";
      val.map(li => {
        nval = nval + " | " + li;
      });
      return nval.substring(2, nval.length);
    }
  },
  beforeCreate() {},
  created() {
    //console.log(this.leftBlogData[0].text.length);
  },
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
.left_blog {
  > li {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    height: 225px;
    background: #ffffff;
    display: flex;
    flex-flow: column;
    margin-bottom: 15px;
    .top {
      display: flex;
      flex-flow: row;
      .blog_img {
        width: 240px;
        height: 160px;
        /deep/ .dht-showimg {
          border-radius: 5px;
        }
      }
      .top-text {
        width: calc(100% - 240px);
        height: 160px;
        box-sizing: border-box;
        padding-left: 18px;
        > h3 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 10px;
          color: $font_main;
        }
        .blog_p {
          color: $font_main_info;
        }
      }
    }
    .bottom {
      width: 100%;
      height: calc(100% - 160px);
      display: flex;
      flex-flow: row;
      align-items: flex-end;
      font-size: 12px;
      color: $font_info;
      > li {
        display: flex;
        flex-flow: row;
        align-items: center;
        margin-right: 10px;
      }
      .icon_img {
        width: 0.9vw;
        height: 0.9vw;
      }
      .icon_img2 {
        width: 1.1vw;
        height: 0.9vw;
      }
      .icon_text {
        color: #096;
        margin-left: 5px;
      }
      .icon_text2 {
        margin-left: 5px;
      }
      .readText {
        margin-right: auto;
      }
      .readText2 {
        cursor: pointer;
      }
    }
  }
}
</style>
