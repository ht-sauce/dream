<template>
  <div class="dht-editor">
    <!--功能操作区域-->
    <ul class="dht-editor-operation">
      <template v-for="(item, index) in operationList">
        <li :key="index" :style="item.backgroundImg" :title="item.title"></li>
      </template>
    </ul>
    <!--主体内容区域-->
    <div class="dht-editor-content" contentEditable="true"></div>
  </div>
</template>

<script>
export default {
  name: "dhtRichEditor",
  data() {
    return {
      //功能操作列表
      operationList: [
        {
          backgroundImg: {
            backgroundImage: `url(${require("./assets/images/quanping.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "60% 60%",
            backgroundPosition: "center"
          },
          title: "全屏",
          event: "FullScreen"
        }
      ]
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
  errorCaptured() {},
  methods: {}
};
</script>

<style lang="scss">
.dht-editor {
  display: flex;
  flex-flow: column;
  width: 1000px;
  height: 1300px;
  border: #072539 1px solid;
  .dht-editor-operation,
  .dht-editor-content {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
  //操作功能区域
  .dht-editor-operation {
    width: 100%;
    min-height: 45px;
    border: #2a579a 1px solid;
    background: #2a579a;
    color: #ffffff;
    font-size: 12px;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    > li {
      width: 35px;
      height: 35px;
    }
    > li:hover {
      background: #4d77c0;
      transform: scale(1.2);
    }
  }
}
</style>
