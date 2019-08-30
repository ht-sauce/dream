<template>
  <div class="dht-zoom-div-webkit" :style="{ resize: resize }">
    <div class="content">
      <slot></slot>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
/*
功能缺陷，内部内容元素需要自己设置
pointer-events: auto;
否则所有鼠标事件失效
注意点2，设置了上述元素，内部元素不能覆盖拖动线，必须预留出拖动线
如果需要修改内部样式，则请使用样式覆盖的方式
* */
export default {
  name: "dhtZoomDivw",
  props: {
    //both 用户可调整元素的高度和宽度。
    //horizontal 元素宽度。
    //vertical 调整高度。
    resize: {
      type: String,
      default: "horizontal"
    }
  }
};
</script>

<style lang="scss">
.dht-zoom-div-webkit {
  width: 100%;
  height: 100%;
  resize: horizontal;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 3px;
    height: inherit;
  }
  &::-webkit-resizer {
    background: #409eff;
  }
  &:hover {
    .content {
      .line {
        background: #1a87ff;
      }
    }
  }
  .content {
    pointer-events: none;
    width: inherit;
    height: inherit;
    position: absolute;
    display: flex;
    flex-flow: row;
    .line {
      pointer-events: none;
      position: absolute;
      width: 3px;
      height: 100%;
      background: #095a49;
      right: 0;
    }
  }
}
</style>
