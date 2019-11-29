<template>
  <div id="tail">
    <slot></slot>
    <div>
      <a target="_blank" href="https://github.com/ht-sauce"
        >git地址:https://github.com/ht-sauce</a
      >
    </div>
    <div class="keep-on-record">浙ICP备19045987号</div>
  </div>
</template>

<style lang="scss" scoped>
#tail {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  border-top: #e8ebf2 1px solid;
  /*background: #ffffff;*/
  padding: 15px;
  color: #a5a4a4;
  text-align: center;
  > div {
    padding: 3px;
    > a {
      font-size: 12px;
      color: #555555;
    }
  }
  .keep-on-record {
    color: #555555;
    font-size: 12px;
  }
}
</style>
