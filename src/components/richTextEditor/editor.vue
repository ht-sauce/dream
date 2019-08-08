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
                v-model="fontSize"
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
      @paste.prevent="Stick"
    ></div>
  </div>
</template>

<script>
import {
  execOperation,
  getSelectionText,
  combinationHtml
} from "./util/coreDom";
import { CursorAcquisition } from "./util/selection";
export default {
  name: "dhtRichEditor",
  data() {
    return {
      jumpUrl: "", //绑定的地址
      fontSize: 14, //字体大小
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
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/fontBigSmall.png"),
          title: "修改文字字体大小",
          event: this.fontBigSmall,
          rel: "fontBigSmall"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Thickening.png"),
          title: "加粗",
          event: this.Thickening,
          rel: "Thickening"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Underline.png"),
          title: "下划线",
          event: this.underline,
          rel: "underline"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/DeleteLine.png"),
          title: "删除线",
          event: this.strikeThrough,
          rel: "strikeThrough"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h1.png"),
          title: "1号字体",
          event: () => {
            this.HFont(1);
          },
          rel: "H1"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h2.png"),
          title: "2号字体",
          event: () => {
            this.HFont(2);
          },
          rel: "H2"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/h3.png"),
          title: "3号字体",
          event: () => {
            this.HFont(3);
          },
          rel: "H3"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/textIndent.png"),
          title: "文档缩进",
          event: this.indent,
          rel: "textIndent"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/code.png"),
          title: "插入代码块",
          event: this.insertPre,
          rel: "insertCode"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/Hyperlinks.png"),
          title: "增加超链接",
          event: this.createLink,
          rel: "Hyperlinks"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/insertImage.png"),
          title: "插入图片",
          event: this.insertImg,
          rel: "insertImage"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/quanping.png"),
          title: "全屏",
          event: this.FullScreen,
          rel: "dht_Editor_FullScreen"
        },
        {
          backgroundImg: {
            backgroundSize: "100% 100%"
          },
          iconUrl: require("./assets/images/clear.png"),
          title: "还原普通文字",
          event: this.reduction,
          rel: "reduction"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //document.getElementById("dht-editor-content").focus();
    document.execCommand("styleWithCSS", false, true);
  },
  beforeUpdate() {},
  methods: {
    //阻止默认回车事件并进行处理
    preventEnter() {
      //屏蔽默认回车，插入换行符
      document.execCommand("insertHTML", false, `<br><br>`);
    },
    //撤销最近操作
    undo() {
      //放弃撤销功能，暂时不做考虑
      /*思考思路，每一次函数点击操作都记录下操作轨迹，保存数组，然后撤销的时候找数组最后一次操作反操作。
      麻烦点：每一步操作都需要记录原情况，并且进行还原。
      可行考虑：
      每次操作都保存最近一次的全内容，然后撤销则用上一次的全内容。*/
      execOperation("undo");
    },
    //全屏
    FullScreen() {
      alert("还没想好怎么做");
      //不知道全屏干嘛暂未定义
    },
    //字体颜色修改
    fontColor() {
      let fontColor = this.operationList[0].backgroundImg.background;
      let bool = execOperation("foreColor", fontColor);
      console.log(fontColor, bool);
      return bool;
    },
    //设置字体大小
    fontBigSmall() {
      if (this.fontSize === 14 || !this.fontSize) {
        return false;
      }
      let style = {
        del: "font-size", //需要剔除的老css元素
        css: `font-size: ${this.fontSize}px`, //新放入的css
        node: "span" //当前插入的span，最终取决于老节点
      };
      let html = combinationHtml(style);
      execOperation("insertHTML", html);
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
      const bool = execOperation("bold");
      console.log(bool);
    },
    //下划线
    underline() {
      execOperation("underline");
    },
    //删除线
    strikeThrough() {
      execOperation("strikeThrough");
    },
    //h123字体
    HFont(type) {
      const { innerhtml, cssText } = getSelectionText();
      let h2 = `<h2 style="${cssText} font-size: 24px; font-weight: bold;">${innerhtml}</h2>`;
      let h3 = `<h3 style="${cssText} font-size: 20px; font-weight: bold;">${innerhtml}</h3>`;
      let h4 = `<h4 style="${cssText} font-size: 16px; font-weight: bold;">${innerhtml}</h4>`;
      let html = "";
      if (type === 1) {
        html = h2;
      }
      if (type === 2) {
        html = h3;
      }
      if (type === 3) {
        html = h4;
      }
      execOperation("insertHTML", html);
    },
    //缩进
    indent() {
      execOperation("indent");
    },
    //创建连接
    createLink() {
      let style = {
        url: "https:www.baidu.com",
        del: "font-size", //需要剔除的老css元素
        css: `font-size: ${this.fontSize}px`, //新放入的css
        node: "a" //当前插入的span，最终取决于老节点
      };
      let html = combinationHtml(style);
      execOperation("insertHTML", html);
    },
    //插入代码块
    insertPre() {
      const { range } = CursorAcquisition();

      //获取需要操作的元素进行处理
      let domst = range.commonAncestorContainer;
      domst = domst.nodeType === 1 ? domst : domst.parentNode;
      console.log(domst.nodeName);
      if (domst.nodeName !== "PRE") {
        let html = `<pre style="font-size:13px;font-family: Menlo,Monaco,Consolas,Courier New,monospace;margin-bottom:15px; border: #d1d4da 1px solid; border-radius: 3px; width: 100%;min-height: 35px;background: #f8f8f8; padding: 10px 10px;box-sizing: border-box;"><code></code></pre><br>`;
        document.execCommand("insertHTML", false, html);
      }
    },
    //插入图片
    insertImg(imgurl) {
      document.execCommand("insertImage", false, imgurl);
    },
    //还原为普通文字
    reduction() {
      const { innerhtml } = getSelectionText();
      execOperation("insertHTML", innerhtml);
    },
    //监听当前富文本的黏贴效果
    Stick(e) {
      const { range } = CursorAcquisition();
      let domst = range.commonAncestorContainer;
      domst = domst.nodeType === 1 ? domst : domst.parentNode;
      let nodeName = domst.nodeName;

      let text = e.clipboardData.getData("text/plain");

      // code 中只能粘贴纯文本
      if (text) {
        if (nodeName === "CODE" || nodeName === "PRE") {
          document.execCommand("insertHTML", false, text);
          return;
        } else {
          document.execCommand("insertHTML", false, `<p>${text}</p>`);
          return;
        }
      }
      //获取图片
      if (e.clipboardData) {
        console.log("进入图片流程");
        //某些chrome版本使用的是event.originalEvent
        var clipboardData = e.clipboardData;
        if (clipboardData.items) {
          // for chrome
          var items = clipboardData.items,
            len = items.length,
            blob = null;
          for (var i = 0; i < len; i++) {
            //判断为图片才插入
            if (items[i].type.indexOf("image") !== -1) {
              //getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile();
              let blobUrl = URL.createObjectURL(blob);
              //console.log(blobUrl);
              this.insertImg(blobUrl);
            }
          }
        }
      }
      //多插入一个回车
      document.execCommand("insertHTML", false, `<br>`);
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
