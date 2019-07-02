<template>
  <div id="onself" class="g-width">
    <div class="left">
      <h3 class="self-tit">酱油的自语</h3>
      <dht-text :text="selfTalk"></dht-text>
      <dht-text :text="selfTalk2"></dht-text>
      <dht-text :text="selfTalk3"></dht-text>
      <div></div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "onself",
  data() {
    return {
      //自语
      selfTalk: `放后面，这里以博客富文本传值`,
      selfTalk2: `简历`,
      selfTalk3: `人生`
    };
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
#onself {
  display: flex;
  flex-flow: row;
  background: #ffffff;
  margin: 20px 0 30px 0;
  .left {
    width: 75%;
    box-sizing: border-box;
    padding: 10px 30px 30px 30px;
    color: $font_main_info;
    min-height: 85vh;
    .self-tit {
      font-size: 24px;
      font-weight: 600;
      color: $font_main;
      letter-spacing: 2px;
      padding: 15px;
    }
  }
  .right {
    width: 25%;
    height: 400px;
    border: red 1px solid;
  }
}
</style>
