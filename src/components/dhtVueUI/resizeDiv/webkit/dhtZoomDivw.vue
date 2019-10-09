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
