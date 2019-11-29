<template>
  <div id="enjoyLife" class="g-width">
    <ul class="left">
      <template v-for="(item, index) in leftData">
        <li :key="index">
          <span>{{ item.name }}</span>
        </li>
      </template>
    </ul>
    <div class="right">
      <div class="release">
        <textarea ref="textarea" v-model="content" maxlength="1100"></textarea>
        <span class="word-number">{{ textNum }}</span>
        <div class="img-list">
          <template v-for="(item, index) in imgList">
            <images
              :key="index"
              class="u-img"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574832520329&di=df3bafc74a9f787c53653d6438ea4888&imgtype=0&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170506%2F0212064U7-3.jpg"
            ></images>
          </template>
        </div>
        <div class="operation">
          <el-button type="warning">图片</el-button>
          <el-button type="primary">发表</el-button>
        </div>
      </div>
      <ul class="dynamic">
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from "@/common/tool/util.js";
const store = require("store");
export default {
  name: "enjoyLife",
  components: {
    images: () => import("./components/img.vue")
  },
  data() {
    return {
      leftData: [{ name: "生活动态", url: "" }, { name: "相册动态", url: "" }],
      content: "",
      imgList: [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 33, 33, 3, 3]
    };
  },
  computed: {
    textNum() {
      return 1100 - this.content.length;
    }
  },
  created() {
    const temporary_dynamic = store.get("temporary_dynamic");
    if (temporary_dynamic) {
      this.content = temporary_dynamic.content;
      this.imgList = temporary_dynamic.imgList;
    }
  },
  mounted() {
    util.autoTextarea(this.$refs.textarea);
  },
  methods: {
    // 临时存储动态
    temporary_save_dynamic() {
      store.set("temporary_dynamic", {
        content: this.content,
        imgList: this.imgList
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
#enjoyLife {
  display: flex;
  flex-flow: row;
  margin: 20px 0 30px 0;
  justify-content: space-between;
  .left {
    width: 200px;
    > li {
      padding: 20px;
      box-sizing: border-box;
      height: 40px;
      width: 100%;
      background: #ffffff;
      display: flex;
      align-items: center;
      color: #072539;
      border-bottom: #d2eaea 1px solid;
      > span {
        font-weight: bold;
      }
    }
    > li:hover {
      background: rgba(151, 228, 255, 0.1);
    }
  }
  .right {
    width: calc(100% - 225px);
    background: #ffffff;
    min-height: 80vh;
    .release {
      padding: 15px;
      border-bottom: #f1f1f1 1px solid;
      > textarea {
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
          Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial,
          sans-serif;
        text-rendering: optimizeLegibility;
        width: 100%;
        color: $font_main;
        border: $border_main;
        outline: none;
        border-radius: 0;
        resize: none;
        overflow: hidden;
        background: #fbfbfb;
        font-size: 14px;
        padding: 10px;
        line-height: 25px;
        height: 140px;
        display: inline-block;
        // 纸页效果
        position: relative;
        border: 1px solid #efefef;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27),
          0 0 40px rgba(0, 0, 0, 0.06) inset;
      }
      .word-number {
        position: absolute;
        margin-top: 120px;
        margin-left: -40px;
      }
      .img-list {
        display: flex;
        flex-flow: row wrap;
        .u-img {
          width: 80px;
          height: 80px;
          margin-right: 3px;
          margin-top: 3px;
          font-size: 30px;
          color: #1abc9c;
        }
      }
      .operation {
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
