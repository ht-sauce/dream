<template>
  <div class="api_test">
    <div class="api-address">
      <span>接口地址：</span>
      <div class="api">
        <el-select
          class="sel-api-type"
          v-model="form.method"
          placeholder="请选择"
        >
          <el-option
            v-for="item in api_type"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-input
          class="url"
          placeholder="请记得填写http或者webscoket开头前缀"
          v-model="form.url"
        ></el-input>
        <el-button type="primary">发 送</el-button>
      </div>
    </div>
    <div class="flied">
      <span>字段列表：</span>
      <el-button type="primary" @click="add_filed">添 加</el-button>
      <template v-for="(item, index) in fileds">
        <div :key="index" class="flied-li">
          <el-input class="name" v-model="item.name"></el-input>
          <el-input class="value" v-model="item.value"></el-input>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // https://www.php.cn/website-design-ask-413913.html
      api_type: [
        "GET",
        "POST",
        "HEAD",
        "PUT",
        "DELETE",
        "CONNECT",
        "OPTIONS",
        "TRACE"
      ],
      // 将要组织的数据
      form: {
        method: "GET",
        url: ""
      },
      fileds: []
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    add_filed() {
      this.fileds.push({ name: "", value: "" });
    }
  }
};
</script>

<style scoped lang="scss">
.api_test {
  margin-top: 15px;
  font-size: 14px;
  .api-address {
    display: flex;
    flex-flow: column;
    .api {
      margin-top: 10px;
      display: flex;
      .sel-api-type {
        width: 170px;
      }
      .url {
        margin: 0 10px;
      }
    }
  }
  .flied {
    > span {
      margin: 10px 0;
      display: inline-block;
    }
    .flied-li {
      display: flex;
      margin-bottom: 5px;
      .name {
        width: 160px;
      }
      .value {
        margin-left: 10px;
      }
    }
  }
}
</style>
