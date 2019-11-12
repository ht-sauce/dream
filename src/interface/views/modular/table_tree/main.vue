<template>
  <div class="main">
    <item-son></item-son>
  </div>
</template>

<script>
export default {
  components: {
    itemSon: () => import("./item.vue")
  },
  data() {
    return {
      list: [
        {
          name: "字段名称",
          isnull: "是否必选",
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: []
        },
        {
          name: "字段名称",
          isnull: "是否必选",
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: []
        },
        {
          name: "字段名称",
          isnull: "是否必选",
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: []
        },
        {
          name: "字段名称",
          isnull: "是否必选",
          type: "字段类型",
          default: "默认值",
          remarks: "备注",
          children: []
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {}
};
</script>

<style scoped lang="scss"></style>
