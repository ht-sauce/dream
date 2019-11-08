<template>
  <div id="tail">
    <slot></slot>
    <div class="keep-on-record">浙ICP备19045987号</div>
  </div>
</template>

<style lang="scss" scoped>
#tail {
  width: 100%;
  box-sizing: border-box;
  border-top: #e8ebf2 1px solid;
  /*background: #ffffff;*/
  padding: 15px;
  color: #a5a4a4;
  text-align: center;
  .keep-on-record {
    color: #555555;
    font-size: 12px;
  }
}
</style>
