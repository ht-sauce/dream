<template>
  <div class="dht-main">
    <ul class="thead">
      <li style="width: 100px;">
        <span>修改</span>
        <span class="el-icon-plus add-item" @click="add_field">添加</span>
      </li>
      <li style="width: 300px;">字段名称</li>
      <li style="width: 100px;">是否必选</li>
      <li style="width: 120px;">字段类型</li>
      <li style="width: 200px;">默认值</li>
      <li style="width: 100%;">备注</li>
    </ul>
    <template v-for="(item, index) in treeField">
      <item-son
        :key="index"
        :level="1"
        :children="item"
        :api-info="apiInfo"
        :reaction="reaction"
        :data-location="[1, index]"
        @del="del_now_field"
      ></item-son>
    </template>
  </div>
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
    reaction: String,
    treeField: Array // 渲染出现的主数据列表
  },
  components: {
    itemSon: () => import("./item.vue")
  },
  data() {
    return {
      list: this.treeField
      /*[
        {
          name: "字段名称",
          isnull: false,
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: [
            {
              name: "字段名称",
              isnull: false,
              type: "字段类型",
              default: "默认值",
              remarks: "备注",
              children: [],
              is_edit: false
            },
            {
              name: "字段名称",
              isnull: true,
              type: "字段类型",
              default: "默认值",
              remarks: "备注",
              children: [],
              is_edit: false
            }
          ],
          is_edit: false
        },
        {
          name: "字段名称",
          isnull: true,
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: [],
          is_edit: false
        }
      ]*/
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    del_now_field(e) {
      // 删除当前条数据
      this.treeField.splice(e[1], 1);
    },
    // 添加字段
    add_field() {
      this.treeField.push({
        name: "",
        isnull: false,
        type: "",
        default: "",
        remarks: "",
        children: [],
        is_edit: true, //可编辑
        button: "add" // 添加按钮独有，用于判断是否是最新增加的字段
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dht-main {
  margin-top: 9px;
  width: 100%;
  $border: #dcdfe6 1px solid;
  .thead {
    display: flex;
    font-size: 13px;
    color: #303133;
    .add-item {
      cursor: pointer;
      margin-left: 10px;
      &:hover {
        color: #67c23a;
      }
    }
    > li {
      border-top: $border;
      border-right: $border;
      border-bottom: $border;
      flex-grow: 0;
      flex-shrink: 0;
      height: 35px;
      line-height: 35px;
      padding-left: 7px;
      font-weight: bold;
      &:first-child {
        border-left: $border;
      }
      &:last-child {
        flex-grow: 1;
        flex-shrink: 1;
      }
    }
  }
}
</style>
