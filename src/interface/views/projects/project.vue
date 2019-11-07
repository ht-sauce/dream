<template>
  <div class="project">
    <!--弹窗-->
    <el-dialog
      :visible.sync="dialog.show"
      :title="dialog.title"
      :width="dialog.width"
      @close="dialog_close"
    >
      <el-form
        :model="project"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dht-project"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="前缀" prop="prefix">
          <el-input v-model="project.prefix"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="5"
            v-model="project.remarks"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="dialog.type === 1"
            type="primary"
            @click="form_data('ruleForm')"
            >确认新建项目</el-button
          >
          <el-button
            v-if="dialog.type === 2"
            type="warning"
            @click="form_data('ruleForm')"
            >确认修改项目</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--顶部操作区域-->
    <div class="operation">
      <el-button @click="add_project_button" type="success">新建项目</el-button>
      <el-input
        class="search"
        v-model="keyword"
        placeholder="搜索项目：输入项目名称"
        clearable
        @blur="search"
      ></el-input>
      <el-button type="info">刷新列表</el-button>
    </div>
    <!--项目类别展示-->
    <div class="content">
      <template v-for="(item, index) in project_list">
        <div :key="index" class="project-li">
          <div class="title">
            <i class="el-icon-s-order"></i>
            <span>{{ item.name }}</span>
          </div>
          <div class="prefix">项目前缀：{{ item.prefix }}</div>
          <p class="remarks">说明：{{ item.remarks }}</p>
          <div class="button">
            <span
              @click="update_project_button"
              class="el-icon-edit"
              style="color: #ff4c51;"
              >修改</span
            >
            <span @click="look_project" class="el-icon-document">详情</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      dialog: {
        show: false,
        title: "新建项目",
        type: 1, // 1新增，2修改，3详情
        width: "50%"
      },
      project: {
        name: "",
        prefix: "",
        remarks: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字", trigger: "blur" }
        ],
        prefix: [{ max: 50, message: "最多50个字", trigger: "blur" }],
        remarks: [{ max: 200, message: "最多200个字", trigger: "blur" }]
      },
      project_list: [
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        },
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        },
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        },
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        },
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        },
        {
          id: "1",
          name: "测试",
          prefix: "测试",
          remarks: "111111111111111111321321321321"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  methods: {
    // 搜索关键字
    search() {
      console.log(this.keyword);
    },
    // 弹窗关闭事件
    dialog_close() {
      this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
    },
    // 新建项目按钮
    add_project_button() {
      this.dialog = {
        show: true,
        title: "新建项目",
        type: 1, // 1新增，2修改
        width: "50%"
      };
    },
    // 表单数据验证
    form_data(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(1);
        }
      });
    },
    // 新建项目接口
    add_project_ajax() {},
    // 修改项目
    update_project_button() {
      this.dialog = {
        show: true,
        title: "修改项目",
        type: 2, // 1新增，2修改
        width: "50%"
      };
    },
    // 修改项目接口
    update_project_ajax() {},
    // 查看项目
    look_project() {
      this.dialog = {
        show: true,
        title: "项目详情",
        type: 3, // 1新增，2修改
        width: "50%"
      };
    },
    // 项目详情接口
    project_details_ajax() {}
  }
};
</script>

<style scoped lang="scss">
.project {
  .operation {
    height: 60px;
    padding: 0 35px 5px 35px;
    width: 100%;
    border-bottom: #9a9a9a 1px solid;
    display: flex;
    align-items: center;
    .search {
      font-size: 14px;
      width: 300px;
      margin-left: 50px;
      margin-right: 20px;
      /deep/ .el-input__inner {
        border: none;
        border-bottom: #696969 1px solid;
        border-radius: 0;
        &:hover {
          border-bottom: #696969 2px solid;
        }
      }
    }
  }
  .content {
    display: flex;
    padding: 20px 20px 0 20px;
    flex-wrap: wrap;
    .project-li {
      display: flex;
      flex-flow: column;
      width: 350px;
      height: 150px;
      background: #ffffff;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 2px;
      box-shadow: #9a9a9a 0 0 3px;
      padding: 10px;
      color: #555555;
      &:hover {
        box-shadow: #299dff 0 0 3px;
        transform: translateY(-2px);
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #088fff;
        cursor: pointer;
        > i {
          margin-right: 7px;
        }
      }
      .prefix {
        font-size: 12px;
        font-weight: bold;
      }
      .remarks {
        font-size: 12px;
        margin-top: 7px;
        margin-bottom: auto;
      }
      .button {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > span {
          cursor: pointer;
          display: inline-block;
          padding: 5px 8px;
          font-size: 12px;
          color: #ffbc10;
        }
      }
    }
  }
}
</style>
