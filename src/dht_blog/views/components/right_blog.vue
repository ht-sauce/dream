<template>
  <div class="right_blog">
    <div class="title">{{ title }}</div>
    <ul class="blog-list">
      <template v-for="(item, index) in list">
        <li :key="index">
          <div class="li-tit">{{ item.title }}</div>
          <div class="li-cont">
            <dht-img class="li-img" :src="item.img"></dht-img>
            <dht-text class="li-text" :text="item.text" :num="57"></dht-text>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "right_blog",
  data() {
    return {};
  },
  props: {
    title: String,
    list: Array
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
  errorCaptured() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/dht_blog/common/style/public.scss";
.right_blog {
  width: 100%;
  background: #ffffff;
  .title {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 10px 15px;
    border-bottom: $border_main 1px solid;
  }
  .blog-list {
    width: 100%;
    > li {
      width: 100%;
      height: 140px;
      overflow: hidden;
      border-bottom: $border_main 1px solid;
      box-sizing: border-box;
      padding: 0 10px 10px 10px;
      display: flex;
      flex-flow: column;
      .li-tit {
        width: 100%;
        font-size: 14px;
        padding-top: 7px;
        padding-bottom: 7px;
        color: $font_main-info;
        font-weight: bold;
      }
      .li-cont {
        width: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        height: 100%;
        .li-img {
          width: 100px;
          height: 90px;
        }
        .li-text {
          width: calc(100% - 100px);
          height: 90px;
          color: $font_info;
          box-sizing: border-box;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
