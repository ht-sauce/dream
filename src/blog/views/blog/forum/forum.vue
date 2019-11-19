<template>
  <div id="enjoyLife" class="g-width">
    <ul class="left">
      <template v-for="(item, index) in leftData">
        <li :key="index">
          <span>{{ item.name }}</span>
        </li>
      </template>
    </ul>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "enjoyLife",
  data() {
    return {
      leftData: [
        { name: "测试", url: "" },
        { name: "测试", url: "" },
        { name: "测试", url: "" },
        { name: "测试", url: "" },
        { name: "测试", url: "" },
        { name: "测试", url: "" }
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
  errorCaptured() {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
#enjoyLife {
  display: flex;
  flex-flow: row;
  margin: 20px 0 30px 0;
  justify-content: space-between;
  .left {
    width: 200px;
    > li {
      padding: 20px;
      box-sizing: border-box;
      height: 40px;
      width: 100%;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      color: #072539;
      > span {
        font-weight: bold;
      }
    }
    > li:nth-child(3n) {
      border-bottom: #bfe9ff 1px solid;
    }
    > li:hover {
      background: rgba(151, 228, 255, 0.1);
    }
  }
  .right {
    width: calc(100% - 225px);
    min-height: 100vh;
    border: red 1px solid;
  }
}
</style>
