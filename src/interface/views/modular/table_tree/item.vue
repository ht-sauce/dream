<template>
  <div class="dht-item">
    <div
      class="dht-item-li"
      :class="{ 'dht-item-li-modify': children.is_edit }"
    >
      <div style="width: 100px;">
        <span v-if="!children.is_edit">
          <span class="el-icon-edit modify" @click="edit_state(children, true)"
            >修改</span
          >
          <!--暂时不拓展子项数据部分-->
          <!--<span class="el-icon-plus cancal" style="margin-left: 15px;"
            >添加</span
          >-->
        </span>
        <span v-else>
          <span
            class="el-icon-close cancal"
            @click="edit_state(children, false)"
            title="取消编辑"
          ></span>
          <span
            class="el-icon-delete del"
            @click="re_event(children, 'del')"
            title="删除字段"
          ></span>
          <span
            class="el-icon-s-claim save"
            @click="re_event(children, 'save')"
            title="保存"
          ></span>
        </span>
      </div>
      <div style="width: 300px;">
        <span
          :style="{ width: 'calc(100% - ' + level * 3 + 'px)' }"
          :class="{ 'left-border': level > 1 }"
          v-if="!children.is_edit"
          >{{ children.name }}</span
        >
        <input
          :style="{ width: 'calc(100% - ' + level * 3 + 'px)' }"
          :class="{ 'left-border': level > 1 }"
          v-else
          v-model="children.name"
          type="text"
        />
      </div>
      <div style="width: 100px;" class="is-null">
        <el-checkbox
          v-if="!children.is_edit"
          v-model="children.isnull"
          disabled
        ></el-checkbox>
        <el-checkbox v-else v-model="children.isnull"></el-checkbox>
      </div>
      <div style="width: 120px;">
        <span v-if="!children.is_edit">{{ children.type }}</span>
        <el-select
          size="small"
          v-else
          v-model="children.type"
          placeholder="请选择"
          class="select-type"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            size="small"
          >
          </el-option>
        </el-select>
      </div>
      <div style="width: 200px;">
        <span v-if="!children.is_edit">{{ children.default }}</span>
        <textarea
          @keyup="autoHeight"
          v-else
          v-model="children.default"
        ></textarea>
      </div>
      <div style="width: 100%;">
        <span v-if="!children.is_edit">{{ children.remarks }}</span>
        <textarea
          @keyup="autoHeight"
          v-else
          v-model="children.remarks"
        ></textarea>
      </div>
    </div>
    <template v-for="(item, index) in children.children">
      <item-son
        :key="index"
        :level="level + 1"
        :children="item"
        :data-location="[level + 1, index]"
        @del="del_now_field"
      ></item-son>
    </template>
  </div>
</template>

<script>
// 引入验证信息模块
import schema from "async-validator";
export default {
  name: "itemSon",
  props: {
    apiInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    dataLocation: Array, //数据定位，表示层级和数据位置
    reaction: String,
    children: Object,
    level: Number //当前层级
  },
  data() {
    return {
      options: [
        {
          value: "String",
          label: "String"
        },
        {
          value: "Number",
          label: "Number"
        },
        {
          value: "Boolean",
          label: "Boolean"
        },
        {
          value: "Array",
          label: "Array"
        },
        {
          value: "Object",
          label: "Object"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    del_now_field(e) {
      // 删除当前条数据
      if (this.children.children && this.children.children.length > 1) {
        this.children.children.splice(e[1], 1);
      }
    },
    // textarea自动增加高度
    autoHeight(elem) {
      let el = elem.srcElement;
      el.style.height = "auto";
      el.scrollTop = 0; //防抖动
      el.style.height = el.scrollHeight + "px";
    },
    // 可编辑切换
    edit_state(children, tOrf) {
      children.is_edit = tOrf;
    },
    // 规则校验函数
    rules(type) {
      // eslint-disable-next-line no-unreachable
      let data = {
        id: this.children.id,
        api_id: this.apiInfo.id,
        reaction: this.reaction,
        name: this.children.name,
        isnull: this.children.isnull ? "1" : "0",
        type: this.children.type,
        default: this.children.default,
        remarks: this.children.remarks
      };
      let rule;
      if (type === "add") {
        rule = {
          api_id: { required: true, message: "没有接口id，出现异常，退出重试" },
          reaction: { required: true, message: "没有接口响应类型" },
          name: { required: true, message: "请填写接口名称" },
          isnull: { required: true, message: "请填写接口名称" },
          type: { required: true, message: "请填写接口类型" },
          default: { max: 200, message: "默认值过长" },
          remarks: { max: 200, message: "备注超长" }
        };
      }
      if (type === "save") {
        rule = {
          id: { required: true, message: "没有接口id，出现异常，退出重试" },
          api_id: { required: true, message: "没有接口id，出现异常，退出重试" },
          reaction: { required: true, message: "没有接口响应类型" },
          name: { required: true, message: "请填写接口名称" },
          isnull: { required: true, message: "请填写接口名称" },
          type: { required: true, message: "请填写接口类型" },
          default: { max: 200, message: "默认值过长" },
          remarks: { max: 200, message: "备注超长" }
        };
      }
      if (type === "del") {
        data = {
          id: this.children.id
        };
        rule = {};
      }

      const validator = new schema(rule);
      validator
        .validate(data)
        .then(() => {
          if (type === "add") {
            // 添加数据
            this.add_field(data);
          }
          if (type === "save") {
            // 修改数据
            this.update_field(data);
          }
          if (type === "del") {
            // 删除数据
            this.del_field(data);
          }
        })
        .catch(e => {
          console.log(e.errors);
          this.$notify({
            message: e.errors[0].message,
            type: "warning",
            title: e.errors[0].field
          });
        });
    },
    // 添加字段
    add_field(data) {
      this.axios
        .ajax({
          url: this.$api.interface().fields.add,
          data: data,
          method: "post",
          loading: true
        })
        .then(e => {
          console.log(e.data);
          this.children.is_edit = false;
          this.children.id = e.data;
        })
        .catch();
    },
    del_field(data) {
      this.axios
        .ajax({
          url: this.$api.interface().fields.del,
          data: data,
          loading: true
        })
        .then(() => {
          // 返回给父级，删除当前这条数据
          this.$emit("del", this.dataLocation);
        })
        .catch();
    },
    update_field(data) {
      this.axios
        .ajax({
          url: this.$api.interface().fields.modify,
          data: data,
          method: "post",
          loading: true
        })
        .then(() => {
          this.children.is_edit = false;
        })
        .catch();
    },
    //返回的事件数据
    re_event(data, type) {
      if (type === "save" && this.children.id) {
        console.log("修改保存数据");
        this.rules("save");
      }
      if (type === "save" && !this.children.id) {
        console.log("新增数据");
        this.rules("add");
      }
      if (type === "del") {
        console.log("删除数据");
        if (!this.children.id) {
          this.$emit("del", this.dataLocation);
          return;
        }
        this.rules("del");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dht-item {
  $border: #dcdfe6 1px solid;
  .left-border {
    border-left: #d7d7d7 1px dashed !important;
    padding-left: 5px;
  }
  .dht-item-li {
    display: flex;
    .modify {
      cursor: pointer;
      &:hover {
        color: #e6a23c;
      }
    }
    .is-null {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .select-type {
      /deep/ .el-input--small .el-input__inner {
        height: 35px;
        line-height: 35px;
      }
      /deep/ .el-input__inner {
        background: none;
        border-radius: 0;
        border: none;
      }
    }
    > div {
      font-size: 12px;
      color: #303133;
      flex-grow: 0;
      flex-shrink: 0;
      padding-left: 7px;
      border-right: $border;
      border-bottom: $border;
      display: flex;
      justify-content: flex-end;
      &:first-child {
        border-left: $border;
        > span {
          color: #909399;
          .cancal,
          .del,
          .save {
            font-size: 14px;
            cursor: pointer;
          }
          .cancal {
            &:hover {
              color: #67c23a;
            }
          }
          .del {
            margin-left: 10px;
            &:hover {
              color: #f56c6c;
            }
          }
          .save {
            margin-left: 10px;
            &:hover {
              color: #ffb53a;
            }
          }
        }
      }
      &:last-child {
        flex-grow: 1;
        flex-shrink: 1;
      }
      > span {
        display: inline-block;
        width: 100%;
        min-height: 35px;
        padding: 9.5px 4px 9.5px 0;
        font-size: 12px;
        overflow: hidden;
      }
      > input,
      textarea {
        font-size: 13px;
        border: none;
        outline: none;
        width: 100%;
        height: 35px;
        background: none;
        padding: 10.5px 4px 10.5px 0;
        font-family: alpht;
      }
      > input {
        overflow: hidden;
      }
      > textarea {
        min-height: 35px;
        max-height: 300px;
        overflow-x: hidden;
        overflow-y: auto;
        word-wrap: break-word;
        padding: 7px 0 7px 0;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  .dht-item-li-modify {
    background: #fdf6ec;
  }
}
</style>
