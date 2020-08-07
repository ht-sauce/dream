<template>
  <div class="rich-operate-item" ref="richOperateItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RichOperateItem',
  inject: ['dhtSetList'],
  props: {
    value: null, // 当前绑定的数据
  },
  data() {
    return {
      select: false,
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(value) {
        // 设置绑定的初始数据
        this.dhtSetList({
          bindData: value, // 绑定数据
          self: this, // 本身
          select: false, // 是否被选中
        })
      },
    },
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
.rich-operate-item {
}
</style>
