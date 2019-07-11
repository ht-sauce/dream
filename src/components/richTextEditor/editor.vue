<template>
  <div class="dht-editor">
    <!--功能操作区域-->
    <ul class="dht-editor-operation">
      <template v-for="(item, index) in operationList">
        <li :key="index" @click="item.event" :title="item.title">
          <span :style="item.backgroundImg"></span>
        </li>
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
            backgroundSize: "100% 100%"
          },
          title: "全屏",
          event: this.FullScreen,
          rel: "dht_Editor_FullScreen"
        },
        {
          backgroundImg: {
            background: "black"
          },
          title: "颜色选择器",
          event: this.colorSelect,
          rel: "dht_Editor_colorSelect"
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
  methods: {
    //富文本编辑函数
    //全屏
    FullScreen() {
      alert("不知道干嘛");
      //不知道全屏干嘛暂未定义
    },
    //颜色选择器
    colorSelect() {
      let input = document.createElement("input");
      let that = this;
      input.type = "color";
      input.click();
      input.addEventListener("input", watchColorPicker, false);
      function watchColorPicker(event) {
        //console.log(event.target.value);
        let color = event.target.value;
        that.operationList[1].backgroundImg = {
          background: color
        };
        //移除监听
        input.removeEventListener("input", watchColorPicker, false);
        input = "";
      }
    }
  }
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
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        display: inline-block;
        width: 26px;
        height: 26px;
      }
    }
    > li:hover {
      background: #4d77c0;
      transform: scale(1.2);
    }
  }
}
</style>
