<template>
  <article class="api_field">
    <header>
      <div class="left-title">
        <span class="title">{{ apiInfo.name }}</span>
        <span>备注：{{ apiInfo.remarks }}</span>
        <span>
          <span class="url">地址：{{ apiInfo.url }}</span>
          <span class="url"
            >实际地址(项目前缀+模块前缀+接口地址)：{{
              projectInfo.prefix + modularInfo.prefix + apiInfo.url
            }}</span
          >
        </span>
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
        <dht-table-tree
          :tree-field="request"
          :api-info="apiInfo"
          reaction="request"
        ></dht-table-tree>
      </div>
      <!--响应区域-->
      <div class="response">
        <span>响应数据（response）</span>
        <dht-table-tree
          :tree-field="response"
          :api-info="apiInfo"
          reaction="response"
        ></dht-table-tree>
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
    },
    projectInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    modularInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      request: [], //请求的字段列表
      response: [] // 响应的字段列表
    };
  },
  components: {
    dhtTableTree: () => import("./table_tree/main.vue")
  },
  watch: {
    apiInfo: {
      handler() {
        console.log(this.apiInfo);
        this.field_list();
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    field_list() {
      this.axios
        .ajax({
          url: this.$api.interface().fields.list,
          data: {
            api_id: this.apiInfo.id
          },
          loading: true
        })
        .then(e => {
          this.request = [];
          this.response = [];
          e.data.map(val => {
            val.is_edit = false;
            val.isnull = val.isnull === "1";
            if (val.reaction === "request") {
              this.request.push(val);
            } else {
              this.response.push(val);
            }
          });
        })
        .catch();
    }
  }
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
        margin-right: 15px;
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
