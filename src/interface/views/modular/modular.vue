<template>
  <div class="modular">
    <header class="header">
      <i class="el-icon-s-order"></i>
      <h2 class="title">{{ params.name }}</h2>
      <span>前缀：{{ params.prefix }}</span>
    </header>
    <nav>
      <el-tabs v-model="nav_name" class="nav">
        <template v-for="(item, index) in nav_module_list">
          <el-tab-pane :key="index">
            <span slot="label" class="module_li">
              <span>新建模块</span>
              <i class="el-icon-edit edit"></i>
              <i class="el-icon-delete del"></i>
            </span>
          </el-tab-pane>
        </template>
        <el-tab-pane name="new_module">
          <span slot="label" class="new_module">
            <i class="el-icon-suitcase-1"></i>
            <span>新建模块</span>
          </span>
        </el-tab-pane>
      </el-tabs>
    </nav>
    <div class="hr"></div>
    <section class="content">
      <!--左侧接口列表-->
      <api-list class="api-list"></api-list>
      <!--右侧该接口下的字段-->
      <api-field class="api_field"></api-field>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.$store.state.modular_params,
      nav_name: "new_module",
      nav_module_list: [1]
    };
  },
  components: {
    apiList: () => import("./api_list.vue"),
    apiField: () => import("./api_field.vue")
  },
  beforeCreate() {},
  created() {
    console.log(this.params);
    // 页面参数校验，如果没有参数则返回
    if (!this.params) {
      this.$router.go(-1);
    }
  },
  mounted() {},
  destroyed() {}
};
</script>

<style scoped lang="scss">
.modular {
  .header {
    display: flex;
    align-items: flex-end;
    i {
      color: #1abc9c;
      font-size: 24px;
      margin-right: 10px;
    }
    h2 {
      font-size: 20px;
      color: #212121;
    }
    span {
      margin-left: 20px;
      font-size: 12px;
      color: #409eff;
    }
  }
  nav {
    padding: 5px 20px 0 20px;
    .nav {
      /deep/ .el-tabs__header {
        margin: 0;
      }
      /deep/ .el-tabs__nav-wrap::after {
        width: 0;
      }
      .module_li {
        i {
          margin-left: 6px;
          font-size: 14px;
        }
        .edit:hover {
          color: #ffb237;
        }
        .del:hover {
          color: #ff1e36;
        }
      }
      .new_module {
        color: #09a07f;
        i {
          margin-right: 3px;
        }
      }
    }
  }
  .hr {
    width: calc(100% - 40px);
    background: #e4e7ed;
    height: 2px;
    margin: 0;
    position: absolute;
    z-index: -10;
    margin-top: -1px;
  }
  .content {
    padding-top: 15px;
    .api-list {
      width: 250px;
      height: 100%;
    }
  }
}
</style>
