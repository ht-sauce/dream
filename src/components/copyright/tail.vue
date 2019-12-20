<template>
  <div id="tail">
    <slot></slot>
    <div>
      <a target="_blank" href="https://github.com/ht-sauce"
        >git地址:https://github.com/ht-sauce</a
      >
    </div>
    <div class="keep-on-record">
      <span style="margin-right: 10px"
        >Copyright © 2019-{{ year.getFullYear() }} dht.red
        AllRightsReserved</span
      >
      <a target="_blank" href="http://www.beian.miit.gov.cn"
        >ICP证：浙ICP备19045987号</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date()
    };
  }
};
</script>
<style lang="scss" scoped>
#tail {
  width: 100%;
  box-sizing: border-box;
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
