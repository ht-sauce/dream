<template>
  <div class="dht-editor">
    <!--功能操作区域-->
    <div class="dht-editor-operation">
      <template v-for="(item, index) in operationList">
        <template v-if="item.rel === 'fontBigSmall'">
          <span :key="index" class="dht-editor-a dht-fontBigSmall">
            <label>
              <input
                maxlength="2"
                v-model="fontSie"
                class="dht-fontBigSmall-input"
                type="text"
              />
            </label>
            <a :key="index" @click="item.event" :title="item.title">
              <img
                class="dht-editor-icon"
                :src="item.iconUrl"
                :style="item.backgroundImg"
                alt=""
              />
            </a>
          </span>
        </template>
        <!--非自定义操作部分-->
        <template v-else>
          <a
            class="dht-editor-a"
            :key="index"
            @click="item.event"
            :title="item.title"
          >
            <img
              class="dht-editor-icon"
              :src="item.iconUrl"
              :style="item.backgroundImg"
              alt=""
            />
          </a>
        </template>
      </template>
    </div>
    <!--主体内容区域-->
    <div
      id="dht-editor-content"
      @keydown.enter.prevent="preventEnter($event)"
      contentEditable="true"
    ></div>
  </div>
</template>

<script>
export default {
  name: "dhtRichEditor",
  data() {
    return {
      fontSie: 14, //字体大小
      //功能操作列表
      operationList: [
        {
          backgroundImg: {
            background: "black"
          },
          title: "颜色选择器",
          event: this.colorSelect,
          rel: "dht_Editor_colorSelect"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/Underline.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/fontColor.png"),
          title: "修改当前文字颜色",
          event: this.fontColor,
          rel: "fontColor"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/Underline.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/fontBigSmall.png"),
          title: "修改文字字体大小",
          event: this.fontBigSmall,
          rel: "fontBigSmall"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/Thickening.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Thickening.png"),
          title: "加粗",
          event: this.Thickening,
          rel: "Thickening"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/Underline.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Underline.png"),
          title: "下划线",
          event: this.undo,
          rel: "Underline"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/DeleteLine.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/DeleteLine.png"),
          title: "删除线",
          event: {},
          rel: "DeleteLine"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/h1.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h1.png"),
          title: "1号字体",
          event: "",
          rel: "H1"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/h2.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h2.png"),
          title: "2号字体",
          event: "",
          rel: "H2"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/h3.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h3.png"),
          title: "3号字体",
          event: "",
          rel: "H3"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/textIndent.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/textIndent.png"),
          title: "首行缩进",
          event: "",
          rel: "textIndent"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/code.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/code.png"),
          title: "插入代码块",
          event: "",
          rel: "insertCode"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/Hyperlinks.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Hyperlinks.png"),
          title: "增加超链接",
          event: "",
          rel: "Hyperlinks"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/insertImage.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/insertImage.png"),
          title: "插入图片",
          event: "",
          rel: "insertImage"
        },
        {
          backgroundImg: {
            //backgroundImage: `url(${require("./assets/images/quanping.png")})`,
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/quanping.png"),
          title: "全屏",
          event: this.FullScreen,
          rel: "dht_Editor_FullScreen"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    document.getElementById("dht-editor-content").focus();
  },
  beforeUpdate() {},
  methods: {
    //获取当前选区,选区处理
    CursorAcquisition() {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      return {
        selection,
        range
      };
    },
    //全屏
    FullScreen() {
      alert("不知道干嘛");
      //不知道全屏干嘛暂未定义
    },
    //字体颜色修改
    fontColor() {
      let fontColor = this.operationList[0].backgroundImg.background;
      let bool = document.execCommand("foreColor", false, fontColor);
      console.log(fontColor, bool);
      return bool;
    },
    //设置字体大小
    fontBigSmall() {
      console.log(this.fontSie);
      //let bool = document.execCommand("fontSize", false, 1);
      let range = this.CursorAcquisition().range;
      let rangeText = range.extractContents();
      //创建新的dom并且结合
      let span = document.createElement("span");
      span.appendChild(rangeText);
      span.style.fontSize = this.fontSie + "px";
      //先移除选中节点
      range.deleteContents();
      //再插入节点
      range.insertNode(span);
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
        that.operationList[0].backgroundImg = {
          background: color
        };
        //移除监听
        input.removeEventListener("input", watchColorPicker, false);
        input = "";
      }
    },
    //文字加粗
    Thickening() {
      //let selection = window.getSelection();
      //取得选择的文本
      //let selectionText = selection.toString();
      //取得代表选区的范围
      let range = this.CursorAcquisition().range;
      //突出显示选择的文本
      //let rangeClone = range.cloneRange();
      //获得选中区域dom袁术
      let rangeText = range.extractContents();

      //创建新的dom并且结合
      let span = document.createElement("span");
      span.appendChild(rangeText);
      span.style.fontWeight = "bold";
      console.log(span);
      //先移除选中节点
      range.deleteContents();
      //再插入节点
      range.insertNode(span);
    },
    //阻止默认回车事件并进行处理
    preventEnter() {
      /*event.cancelBubble = false;
      event.stopPropagation();*/
      //event.preventDefault();
      //console.log(event);
      let range = this.CursorAcquisition().range;
      let span = document.createElement("span");
      let rangeText = range.extractContents();
      span.appendChild(rangeText);
      span.innerHTML += "<br>" + "<br>";
      //先移除选中节点
      range.deleteContents();
      //再插入节点
      range.insertNode(span);
      //核心光标定位
      range.collapse(false);

      //let dom = document.querySelector("#dht-editor-content");
      //感谢https://www.jianshu.com/p/50c433ec1c32
      //来源：https://www.jianshu.com/p/5997a90aab64
      /*let textEle = range.commonAncestorContainer;
      range.setEnd(range.endContainer, textEle.length * 2);*/
    },
    //撤销最近操作
    undo() {
      //放弃撤销功能，暂时不做考虑
      /*思考思路，每一次函数点击操作都记录下操作轨迹，保存数组，然后撤销的时候找数组最后一次操作反操作。
      麻烦点：每一步操作都需要记录原情况，并且进行还原。
      可行考虑：
      每次操作都保存最近一次的全内容，然后撤销则用上一次的全内容。*/
      document.execCommand("undo", false, null);
    },
    //光标定位到最后
    placeCaretAtEnd(jsDom) {
      //来源：https://blog.csdn.net/gyq04551/article/details/80175326
      //传入光标要去的jsDom节点
      jsDom.focus();
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        var range = document.createRange();
        range.selectNodeContents(jsDom);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(jsDom);
        textRange.collapse(false);
        textRange.select();
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
  #dht-editor-content {
    width: 100%;
    box-sizing: border-box;
    padding: 25px 25px;
  }
  //操作功能区域dht-editor-operation
  .dht-editor-operation {
    width: 100%;
    min-height: 45px;
    border: #2a579a 1px solid;
    background: #2a579a;
    color: #ffffff;
    font-size: 14px;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    .dht-editor-a {
      width: 35px;
      height: 35px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 2px;
      //图片icon
      .dht-editor-icon {
        display: inline-block;
        width: 26px;
        height: 26px;
      }
      //字体大小输入框
      .dht-fontBigSmall-input {
        height: 24px;
        width: 30px;
        margin-right: 10px;
        text-align: center;
        font-size: 12px;
      }
    }
    //鼠标经过icon变化
    .dht-editor-a:hover {
      background: #4d77c0;
      transform: scale(1.2);
    }
    /*输入字体大小*/
    .dht-fontBigSmall {
      width: 80px;
    }
  }
  #dht-editor-content {
    outline: #2a579a groove 2px;
  }
}
</style>
