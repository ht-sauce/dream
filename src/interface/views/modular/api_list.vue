<template>
  <article>
    <el-dialog
      :visible.sync="dialog.show"
      :title="dialog.title"
      :width="dialog.width"
      class="api-data-dialog"
      @close="dialog_close"
    >
      <el-form
        :model="api_data"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dht-api_data"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="api_data.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="api_data.url"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="3"
            v-model="api_data.remarks"
          ></el-input>
        </el-form-item>
        <el-form-item label="头部信息" prop="headers">
          <el-input
            type="textarea"
            rows="4"
            v-model="api_data.headers"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="api_data.type" placeholder="请选择">
            <el-option
              v-for="item in method"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态码" prop="state">
          <el-select v-model="api_data.state" placeholder="请选择">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="dialog.type === 1"
            type="primary"
            @click="form_data('ruleForm')"
            >确认新建接口</el-button
          >
          <el-button
            v-if="dialog.type === 2"
            type="warning"
            @click="form_data('ruleForm')"
            >确认修改接口</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <ul class="api_data-api-list">
      <li class="add-api" @click="add_api_button">新建接口</li>
      <template v-for="(item, index) in api_list">
        <li :key="index" class="api-li">
          <div class="tag" v-show="item.show"></div>
          <div class="api" @click="api_info(index)">
            <div>{{ item.name }}</div>
            <div class="api-url">{{ item.url }}</div>
          </div>
          <div class="icon">
            <i class="el-icon-edit edit" @click="modify_api(item)"></i>
            <i class="el-icon-delete del" @click="del_api(item.id)"></i>
          </div>
        </li>
      </template>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    modularInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      api_list: [],
      dialog: {
        show: false,
        title: "新建接口",
        type: 1, // 1新增，2修改，3详情
        width: "50%"
      },
      api_data: {
        name: "",
        url: "",
        remarks: "",
        type: "GET",
        headers: '{ "Content-Type": "application/json;charset=UTF-8" }',
        state: 200
      },
      method: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "DELETE", label: "DELETE" },
        { value: "OPTIONS", label: "OPTIONS" },
        { value: "PATCH", label: "PATCH" },
        { value: "HEAD", label: "HEAD" }
      ],
      state: [
        { value: "200", label: "200" },
        { value: "301", label: "301" },
        { value: "403", label: "403" },
        { value: "404", label: "404" },
        { value: "500", label: "500" },
        { value: "502", label: "502" },
        { value: "503", label: "503" },
        { value: "504", label: "504" }
      ],
      rules: {
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字", trigger: "blur" }
        ],
        url: { required: true },
        type: { required: true },
        remarks: [{ max: 200, message: "最多200个字", trigger: "blur" }]
      }
    };
  },
  watch: {
    modularInfo: {
      handler() {
        this.re_data(false);
        this.api_list_ajax();
      },
      immediate: true
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
  methods: {
    // 统一返回数据函数
    re_data(data, type = 1) {
      if (type === 1) {
        this.$emit("api-info", data);
      }
    },
    // 弹窗关闭事件
    dialog_close() {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
    },
    // 接口表单按钮提交
    form_data(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新增
          if (this.dialog.type === 1) this.add_api_ajax();
          // 修改
          if (this.dialog.type === 2) this.modify_api_ajax();
        }
      });
    },
    add_api_button() {
      this.dialog = {
        show: true,
        title: "新建接口",
        type: 1, // 1新增，2修改，3详情
        width: "50%"
      };
    },
    // 添加接口
    add_api_ajax() {
      const data = {
        name: this.api_data.name,
        url: this.api_data.url,
        remarks: this.api_data.remarks,
        type: this.api_data.type,
        headers: this.api_data.headers,
        state: this.api_data.state,
        modular_id: this.modularInfo.id
      };
      this.axios
        .ajax({
          url: this.$api.interface().api.add,
          data: data,
          method: "post",
          loading: true
        })
        .then(e => {
          console.log(e);
          this.dialog.show = false;
          this.api_list_ajax();
        })
        .catch();
    },
    modify_api(row) {
      this.dialog = {
        show: true,
        title: "修改接口",
        type: 2, // 1新增，2修改，3详情
        width: "50%"
      };
      this.api_data = JSON.parse(JSON.stringify(row));
    },
    modify_api_ajax() {
      const data = {
        name: this.api_data.name,
        url: this.api_data.url,
        remarks: this.api_data.remarks,
        type: this.api_data.type,
        headers: this.api_data.headers,
        state: this.api_data.state,
        modular_id: this.modularInfo.id,
        id: this.api_data.id
      };
      this.axios
        .ajax({
          url: this.$api.interface().api.modify,
          data: data,
          method: "post",
          loading: true
        })
        .then(() => {
          this.dialog.show = false;
          this.api_list_ajax();
          this.re_data("");
        })
        .catch();
    },
    // 接口列表
    api_list_ajax() {
      console.log(this.modularInfo);
      this.axios
        .ajax({
          url: this.$api.interface().api.list,
          data: {
            modular_id: this.modularInfo.id
          },
          loading: true
        })
        .then(e => {
          this.api_list = e.data.map(val => {
            val.show = false;
            return val;
          });
        })
        .catch();
    },
    // 接口详情
    api_info(index) {
      this.api_list.map(val => {
        val.show = false;
        return val;
      });
      this.api_list[index].show = true;
      this.re_data(this.api_list[index]);
    },
    // 删除接口
    del_api(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .ajax({
              url: this.$api.interface().api.del,
              data: {
                id: id
              },
              loading: true
            })
            .then(() => {
              this.api_list_ajax();
            })
            .catch();
        })
        .catch();
    }
  }
};
</script>

<style scoped lang="scss">
.api-data-dialog /deep/ .el-dialog {
  margin-top: 50px !important;
}
.api_data-api-list {
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
      background: #013491;
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
