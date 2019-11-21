<template>
  <div class="modular">
    <!--弹窗-->
    <el-dialog
      :visible.sync="dialog.show"
      :title="dialog.title"
      :width="dialog.width"
      @close="dialog_close"
    >
      <el-form
        :model="modular"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dht-modular"
      >
        <el-form-item label="模块名称" prop="name">
          <el-input v-model="modular.name"></el-input>
        </el-form-item>
        <el-form-item label="前缀" prop="prefix">
          <el-input v-model="modular.prefix"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="5"
            v-model="modular.remarks"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="dialog.type === 1"
            type="primary"
            @click="form_data('ruleForm')"
            >确认新建模块</el-button
          >
          <el-button
            v-if="dialog.type === 2"
            type="warning"
            @click="form_data('ruleForm')"
            >确认修改模块</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <header class="header">
      <i class="el-icon-s-order"></i>
      <span class="title" @click="list_modular">{{ params.name }}</span>
      <span>项目前缀：{{ params.prefix }}</span>
      <div class="modular_info">
        <span>模块前缀：{{ modular_info.prefix }}</span>
        <span>模块备注：{{ modular_info.remarks }}</span>
      </div>
    </header>
    <nav>
      <el-tabs v-model="nav_name" class="nav">
        <template v-for="(item, index) in nav_module_list">
          <el-tab-pane :key="index">
            <span slot="label" class="module_li" @click="modular_info = item">
              <span>{{ item.name }}</span>
              <i
                class="el-icon-edit edit"
                @click="update_modular_button(index)"
              ></i>
              <i class="el-icon-delete del" @click="del_modular(item.id)"></i>
            </span>
          </el-tab-pane>
        </template>
        <el-tab-pane name="new_module">
          <span slot="label" class="new_module" @click="add_modular_button">
            <i class="el-icon-suitcase-1"></i>
            <span>新建模块</span>
          </span>
        </el-tab-pane>
      </el-tabs>
    </nav>
    <div class="hr"></div>
    <section class="content">
      <!--左侧接口列表-->
      <api-list
        v-if="modular_info"
        class="api-list"
        :modular-info="modular_info"
        @api-info="api_info"
      ></api-list>
      <!--右侧该接口下的字段-->
      <api-field
        v-if="apiInfo"
        class="api_field"
        :api-info="apiInfo"
        :project-info="params"
        :modular-info="modular_info"
      ></api-field>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.$store.state.modular_params,
      nav_name: "new_module",
      nav_module_list: [],
      dialog: {
        show: false,
        title: "新建模块",
        type: 1, // 1新增，2修改，3详情
        width: "50%"
      },
      modular: {
        name: "",
        prefix: "",
        remarks: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字", trigger: "blur" }
        ],
        prefix: [{ max: 50, message: "最多50个字", trigger: "blur" }],
        remarks: [{ max: 200, message: "最多200个字", trigger: "blur" }]
      },
      modular_info: "", //模块详情
      apiInfo: "" // api接口详情
    };
  },
  components: {
    apiList: () => import("./api_list.vue"),
    apiField: () => import("./api_field.vue")
  },
  beforeCreate() {},
  created() {
    // 页面参数校验，如果没有参数则返回
    if (!this.params) {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.list_modular();
  },
  destroyed() {},
  methods: {
    // 接口列表组件返回的详情信息
    api_info(e) {
      this.apiInfo = e;
    },
    // 弹窗关闭事件
    dialog_close() {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
    },
    // 模块表单按钮提交
    form_data(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新增
          if (this.dialog.type === 1) this.add_modular();
          // 修改
          if (this.dialog.type === 2) this.update_modular();
        }
      });
    },
    update_modular_button(index) {
      this.dialog = {
        show: true,
        title: "修改模块",
        type: 2, // 1新增，2修改
        width: "50%"
      };
      this.modular = JSON.parse(JSON.stringify(this.nav_module_list[index]));
    },
    // 修改模块信息
    update_modular() {
      const data = {
        name: this.modular.name,
        prefix: this.modular.prefix,
        remarks: this.modular.remarks,
        id: this.modular.id,
        project_id: this.params.id
      };
      this.axios
        .ajax({
          url: this.$api.interface().modular.modify,
          data: data,
          method: "post",
          loading: true
        })
        .then(e => {
          console.log(e);
          this.dialog.show = false;
          this.list_modular();
        })
        .catch();
    },
    // 添加模块
    add_modular() {
      const data = {
        name: this.modular.name,
        prefix: this.modular.prefix,
        remarks: this.modular.remarks,
        project_id: this.params.id
      };
      this.axios
        .ajax({
          url: this.$api.interface().modular.add,
          data: data,
          method: "post",
          loading: true
        })
        .then(e => {
          console.log(e);
          this.dialog.show = false;
          this.list_modular();
        })
        .catch();
    },
    add_modular_button() {
      this.dialog = {
        show: true,
        title: "新建模块",
        type: 1, // 1新增，2修改
        width: "50%"
      };
    },
    // 模块列表
    list_modular() {
      const data = {
        project_id: this.params.id
      };
      this.axios
        .ajax({
          url: this.$api.interface().modular.list,
          data: data,
          loading: true
        })
        .then(e => {
          console.log(e);
          this.nav_module_list = e.data;
        })
        .catch();
    },
    // 删除模块
    del_modular(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios
          .ajax({
            url: this.$api.interface().modular.del,
            data: {
              id: id
            },
            loading: true
          })
          .then(() => {
            if (this.modular_info.id === id) {
              this.modular_info = "";
            }
            this.list_modular();
          })
          .catch();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.modular {
  .header {
    display: flex;
    align-items: center;
    i {
      color: #1abc9c;
      font-size: 24px;
      margin-right: 5px;
      margin-left: 10px;
    }
    .title {
      font-size: 20px;
      color: #212121;
      cursor: pointer;
      margin-left: 0;
    }
    span {
      margin-left: 20px;
      font-size: 12px;
      color: #409eff;
    }
    .modular_info {
      margin-left: 10px;
      font-size: 12px;
      color: #022440;
      > span {
        margin-right: 10px;
        &:last-child {
          color: #646464;
        }
      }
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
    display: flex;
    .api-list {
      min-width: 250px;
      width: 250px;
      height: 100%;
    }
    .api_field {
      width: 100%;
    }
  }
}
</style>
