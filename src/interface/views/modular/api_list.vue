<template>
  <ul class="modular-api-list">
    <li class="add-api">新建接口</li>
    <template v-for="(item, index) in api_list">
      <li :key="index" class="api-li">
        <div class="tag"></div>
        <div class="api">
          <div>测试接口数据</div>
          <div class="api-url">/1231/32/fdss/fds</div>
        </div>
        <div class="icon">
          <i class="el-icon-edit edit"></i>
          <i class="el-icon-delete del"></i>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      api_list: [1, 2, 3]
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style scoped lang="scss">
.modular-api-list {
  width: 100%;
  $border: 1px solid rgba(63, 81, 181, 0.5);
  li {
    border-top: $border;
    border-right: $border;
    border-left: $border;
    &:hover {
      background: rgba(63, 81, 181, 0.1);
    }
    &:first-child {
      border-bottom: $border;
      border-radius: 3px;
    }
    &:nth-child(2) {
      border-radius: 3px 3px 0 0;
    }
    &:last-child {
      border-bottom: $border;
      border-radius: 0 0 3px 3px;
    }
  }
  .add-api {
    width: 100%;
    height: 35px;
    color: #08287b;
    text-align: center;
    line-height: 35px;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .api-li {
    width: 100%;
    height: 55px;
    font-size: 12px;
    color: #0057ff;
    display: flex;
    justify-content: space-between;
    .tag {
      height: 100%;
      width: 3px;
      background: #545454;
    }
    .api {
      cursor: pointer;
      width: 100%;
      font-size: 13px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 10px;
      .api-url {
        color: #6e6e6e;
        font-size: 10px;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      color: #6e6e6e;
      font-size: 14px;
      padding-right: 10px;
      height: 100%;
      i {
        cursor: pointer;
        margin: 0 3px;
        &:hover {
          color: #0597ff;
        }
      }
    }
  }
}
</style>
