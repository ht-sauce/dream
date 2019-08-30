<template>
  <div>
    <div class="drag">
      <div class="title">
        <div class="tip">
          <a class="min" href="javascript:;" title="最小化">-</a>
          <a class="max" href="javascript:;" title="最大化">口</a>
          <a class="revert" href="javascript:;" title="还原">回</a>
          <a class="close" href="javascript:;" title="关闭">X</a>
        </div>
      </div>
      <div class="resizeL"></div>
      <div class="resizeT"></div>
      <div class="resizeR"></div>
      <div class="resizeB"></div>
      <div class="resizeLT"></div>
      <div class="resizeRT"></div>
      <div class="resizeRB"></div>
      <div class="resizeLB"></div>
      <slot>
        <div class="content" id="drag">拖动、最大化、最小化、关闭等效果</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-toast",
  data() {
    return {};
  },
  mounted() {
    this.realconsole();
  },
  methods: {
    realconsole() {
      var dragMinWidth = 300;
      var dragMinHeight = 300;
      var oDrag = document.querySelector(".drag");
      var oTitle = document.querySelector(".drag .title");
      var min = document.querySelector(".min");
      var max = document.querySelector(".max");
      var revert = document.querySelector(".revert");
      var close = document.querySelector(".close");
      var resizeL = document.querySelector(".resizeL");
      var resizeB = document.querySelector(".resizeB");
      var resizeR = document.querySelector(".resizeR");
      var resizeT = document.querySelector(".resizeT");
      var resizeLT = document.querySelector(".resizeLT");
      var resizeLB = document.querySelector(".resizeLB");
      var resizeRT = document.querySelector(".resizeRT");
      var resizeRB = document.querySelector(".resizeRB");
      //拖拉函数
      function drag(oDrag, handle) {
        var disX = 0;
        var disY = 0;
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function(e) {
          e = e || event;
          e.preventDefault();
          disX = e.clientX - oDrag.offsetLeft;
          disY = e.clientY - oDrag.offsetTop;
          document.onmousemove = function(e) {
            e = e || event;
            var Left = e.clientX - disX;
            var Top = e.clientY - disY;
            var maxleft =
              document.documentElement.offsetWidth - oDrag.offsetWidth;
            var maxtop =
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

        //最大化按钮
        max.onclick = function() {
          var maxwidth = document.documentElement.clientWidth - 2;
          var maxheight = document.documentElement.clientHeight - 2;
          oDrag.style.top = 0;
          oDrag.style.left = 0;
          oDrag.style.width = maxwidth + "px";
          oDrag.style.height = maxheight + "px";
          this.style.display = "none";
          revert.style.display = "block";
        };

        //还原按钮
        revert.onclick = function() {
          var width = 300;
          var height = 300;
          oDrag.style.top = "100px";
          oDrag.style.left = "100px";
          oDrag.style.width = width + "px";
          oDrag.style.height = height + "px";
          this.style.display = "none";
          max.style.display = "block";
        };

        //最小化按钮和关闭
        min.onclick = close.onclick = function() {
          oDrag.style.display = "none";
        };
      }
      //改变大小函数
      function resize(oparent, handle, isleft, istop, lookx, looky) {
        var disX = 0;
        var disY = 0;
        handle = handle || oDrag;

        handle.onmousedown = function(e) {
          e = e || event;
          e.preventDefault();
          disX = e.clientX - this.offsetLeft;
          disY = e.clientY - this.offsetTop;
          var iparenttop = oparent.offsetTop;
          var iparentleft = oparent.offsetLeft;
          var iparentwidth = oparent.offsetWidth;
          var iparentheight = oparent.offsetHeight;

          document.onmousemove = function(e) {
            e = e || event;
            var iL = e.clientX - disX;
            var iT = e.clientY - disY;
            var maxw =
              document.documentElement.clientWidth - oparent.offsetLeft - 2;
            var maxh =
              document.documentElement.clientHeight - oparent.offsetTop - 2;
            var iw = isleft ? iparentwidth - iL : handle.offsetWidth + iL;
            var ih = istop ? iparentheight - iT : handle.offsetHeight + iT;
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
      }

      //调用
      (function() {
        drag(oDrag, oTitle);
        //四边变大
        resize(oDrag, resizeB, false, false, false, true);
        resize(oDrag, resizeR, false, false, true, false);
        resize(oDrag, resizeT, false, true, false, true);
        resize(oDrag, resizeL, true, false, true, false);
        //四角变大
        resize(oDrag, resizeRB, false, false, true, true);
        resize(oDrag, resizeRT, false, true, true, true);
        resize(oDrag, resizeLT, true, true, true, true);
        resize(oDrag, resizeLB, true, false, true, true);
      })();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
  color: #000;
  text-decoration: none;
}
.drag {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  position: absolute;
  top: 100px;
  left: 100px;
  font-size: 14px;
  box-shadow: 2px 2px 5px gray;
}
.title {
  height: 35px;
  width: 100%;
  border-bottom: 1px solid #dddddd;
}
.min {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 50px;
}
.max {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 30px;
}
.revert {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 30px;
  display: none;
}
.close {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
}

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
</style>
