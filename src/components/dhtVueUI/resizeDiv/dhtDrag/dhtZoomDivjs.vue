<template>
  <div class="drag" ref="drag">
    <div class="resizeL"></div>
    <div class="resizeT"></div>
    <div class="resizeR"></div>
    <div class="resizeB"></div>
    <div class="resizeLT"></div>
    <div class="resizeRT"></div>
    <div class="resizeRB"></div>
    <div class="resizeLB"></div>
    <slot>
      <!--<div class="content" id="drag">拖动、最大化、最小化、关闭等效果</div>-->
    </slot>
  </div>
</template>

<script>
export default {
  name: "dhtZoomDivjs",
  props: {
    minWidth: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    //哪个方向可以拉伸
    direction: {
      type: Array
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.realconsole();
  },
  methods: {
    //拖拉函数,传入拖拽的元素，绑定的按钮元素,第二个元素不传递则直接拖拽本身
    drag(oDrag, handle) {
      let disX = 0;
      let disY = 0;
      handle = handle || oDrag;
      handle.style.cursor = "move";
      handle.onmousedown = function(e) {
        e = e || event;
        e.preventDefault();
        disX = e.clientX - oDrag.offsetLeft;
        disY = e.clientY - oDrag.offsetTop;
        document.onmousemove = function(e) {
          e = e || event;
          let Left = e.clientX - disX;
          let Top = e.clientY - disY;
          let maxleft =
            document.documentElement.offsetWidth - oDrag.offsetWidth;
          let maxtop =
            document.documentElement.clientHeight - oDrag.offsetHeight;
          if (Left < 0) {
            Left = 0;
          } else if (Left > maxleft) {
            Left = maxleft;
          }
          if (Top < 0) {
            Top = 0;
          } else if (Top > maxtop) {
            Top = maxtop;
          }
          oDrag.style.left = Left + "px";
          oDrag.style.top = Top + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    //改变大小函数
    resize(oparent, handle, isleft, istop, lookx, looky) {
      let dragMinWidth = this.minWidth;
      let dragMinHeight = this.minHeight;
      let disX = 0;
      let disY = 0;

      handle.onmousedown = function(e) {
        e = e || event;
        e.preventDefault();
        disX = e.clientX - this.offsetLeft;
        disY = e.clientY - this.offsetTop;
        let iparenttop = oparent.offsetTop;
        let iparentleft = oparent.offsetLeft;
        let iparentwidth = oparent.offsetWidth;
        let iparentheight = oparent.offsetHeight;

        document.onmousemove = function(e) {
          e = e || event;
          let iL = e.clientX - disX;
          let iT = e.clientY - disY;
          let maxw =
            document.documentElement.clientWidth - oparent.offsetLeft - 2;
          let maxh =
            document.documentElement.clientHeight - oparent.offsetTop - 2;
          let iw = isleft ? iparentwidth - iL : handle.offsetWidth + iL;
          let ih = istop ? iparentheight - iT : handle.offsetHeight + iT;
          if (isleft) {
            oparent.style.left = iparentleft + iL + "px";
          }
          if (istop) {
            oparent.style.top = iparenttop + iT + "px";
          }
          if (iw < dragMinWidth) {
            iw = dragMinWidth;
          } else if (iw > maxw) {
            iw = maxw;
          }
          if (lookx) {
            oparent.style.width = iw + "px";
          }
          if (ih < dragMinHeight) {
            ih = dragMinHeight;
          } else if (ih > maxh) {
            ih = maxh;
          }
          if (looky) {
            oparent.style.height = ih + "px";
          }
          if (
            (isleft && iw == dragMinWidth) ||
            (istop && ih == dragMinHeight)
          ) {
            document.onmousemove = null;
          }
          return false;
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    realconsole() {
      console.log(this.$refs.drag);
      let oDrag = this.$refs.drag;
      let resizeL = document.querySelector(".resizeL");
      let resizeB = document.querySelector(".resizeB");
      let resizeR = document.querySelector(".resizeR");
      let resizeT = document.querySelector(".resizeT");
      let resizeLT = document.querySelector(".resizeLT");
      let resizeLB = document.querySelector(".resizeLB");
      let resizeRT = document.querySelector(".resizeRT");
      let resizeRB = document.querySelector(".resizeRB");

      this.resize(oDrag, resizeB, false, false, false, true);
      this.resize(oDrag, resizeR, false, false, true, false);
      this.resize(oDrag, resizeT, false, true, false, true);
      this.resize(oDrag, resizeL, true, false, true, false);
      //四角变大
      this.resize(oDrag, resizeRB, false, false, true, true);
      this.resize(oDrag, resizeRT, false, true, true, true);
      this.resize(oDrag, resizeLT, true, true, true, true);
      this.resize(oDrag, resizeLB, true, false, true, true);
    }
  }
};
</script>

<style lang="scss">
.drag {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  position: absolute;
  top: 100px;
  left: 100px;
  .resizeB {
    width: 100%;
    height: 10px;
    position: absolute;
    bottom: 0;
    cursor: n-resize;
  }
  .resizeL {
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    cursor: w-resize;
  }
  .resizeT {
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    cursor: n-resize;
  }
  .resizeR {
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    cursor: w-resize;
  }

  .resizeLT {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: nw-resize;
  }
  .resizeLB {
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    cursor: ne-resize;
  }
  .resizeRT {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    cursor: ne-resize;
  }
  .resizeRB {
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    cursor: nw-resize;
  }
  .content {
    margin: 10px;
    font-size: 15px;
  }
}
</style>
