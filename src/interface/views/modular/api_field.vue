<template>
  <article class="api_field">
    <header>
      <div class="left-title">
        <span class="title">{{ apiInfo.name }}</span>
        <span
          >地址：<span class="url">{{ apiInfo.url }}</span></span
        >
        <span>headers：{{ apiInfo.headers }}</span>
        <span class="tag">
          <span>类型：{{ apiInfo.type }}</span>
          <span>状态码：{{ apiInfo.state }}</span>
        </span>
      </div>
      <!--预留左侧操作-->
      <div></div>
    </header>
    <section>
      <!--请求区域-->
      <div class="request">
        <span>请求数据（request）</span>
        <dht-table-tree></dht-table-tree>
      </div>
      <!--响应区域-->
      <div class="response">
        <span>响应数据（response）</span>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    apiInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: {
    dhtTableTree: () => import("./table_tree/main.vue")
  },
  watch: {
    apiInfo: {
      handler() {
        console.log(this.apiInfo);
      },
      immediate: true
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  destroyed() {}
};
</script>

<style scoped lang="scss">
.api_field {
  padding-left: 20px;
  header {
    display: flex;
    .left-title {
      display: flex;
      flex-flow: column;
      font-size: 12px;
      color: #363636;
      > span {
        margin-bottom: 3px;
      }
      .title {
        font-size: 16px;
        margin-bottom: 10px;
        color: #323232;
      }
      .url {
        color: #0057ff;
      }
      .tag {
        span {
          margin-right: 20px;
        }
      }
    }
  }
  section {
    margin-top: 10px;
    .request,
    .response {
      margin-bottom: 10px;
      > span {
        font-size: 14px;
        color: #1c1c1c;
      }
    }
  }
}
</style>
