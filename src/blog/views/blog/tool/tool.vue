<template>
  <div class="tool">
    <template v-for="(item, index) in list">
      <router-link :key="index" :to="item.url" class="tool-li">
        <span>{{ item.title }}</span>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 工具列表
      list: [{ title: "接口测试工具", url: "/tool/api_test" }]
    };
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>

<style scoped lang="scss">
.tool {
  width: 100%;
  margin-top: 15px;
  .tool-li {
    display: inline-block;
    width: 250px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 16px;
    background: #ffffff;
    box-shadow: #efefef 0 0 5px;
    font-weight: 600;
    &:hover {
      background: rgba(14, 188, 255, 0.1);
    }
  }
}
</style>
