<template>
  <div class="rich-operate">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RichOperate',
  // 分发操作数据
  provide() {
    return {
      // 添加节点数据
      setList: ({
        bindData = null, // 绑定数据
        self = null, // 本身
        select = false, // 是否被选中
      }) => {
        this.list.push({
          bindData,
          self,
          select,
        })
      },
    }
  },
  props: {
    type: {
      type: String,
      default: 'direction', //direction：键盘方向键， letter:字母wasd模式,custom: 自定义模式
    },
    background: {
      type: String,
      default: 'rgba(5, 173, 255, 0.5)',
    },
  },
  data() {
    return {
      list: [], // 操作列表数据
      currentIndex: 0, // 当前被选中的数据
    }
  },
  created() {
    // 监听按键事件
    window.addEventListener('keydown', this.onKeyDown, false)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keydown', this.onKeyDown, false)
    })
  },
  mounted() {
    this.list[0].select = true
    this.sendEmit({ item: this.list[0], index: 0 })
  },
  methods: {
    // 键盘监听事件
    onKeyDown(e) {
      const code = e.keyCode
      const type = {
        38: 'top', // 上
        40: 'bottom', // 下
        37: 'left', // 左
        39: 'right', // 右
        87: 'top', // w
        65: 'left', // a
        83: 'bottom', // s
        68: 'right', // d
      }
      this.move(type[code])
    },
    // 移动点
    move(type) {
      if (type === 'top') console.log(type)
      if (type === 'bottom') console.log(type)
      if (type === 'left') this.leftOrRightMove(type)
      if (type === 'right') this.leftOrRightMove(type)
    },
    // 左右移动
    leftOrRightMove(type) {
      const lastTimeIndex = this.currentIndex // 上一次的
      this.list[lastTimeIndex].self.$el.style.background = ''
      this.list[lastTimeIndex].select = false // 上一次的变为未选中

      const list = this.list
      const maxIndex = list.length // 最大
      let nextIndex = lastTimeIndex
      if (type === 'left') {
        nextIndex--
        nextIndex = nextIndex <= 0 ? 0 : nextIndex
      }
      if (type === 'right') {
        nextIndex++
        nextIndex = nextIndex >= maxIndex ? maxIndex - 1 : nextIndex
      }
      // 最终发送确认值
      list[nextIndex].select = true
      this.currentIndex = nextIndex
      this.sendEmit({ item: list[nextIndex], index: nextIndex })
    },
    // 统一返回给外界当前数据
    sendEmit({ item, index }) {
      // 操作当前选中的dom或者实例
      const dom = this.list[index].self.$el
      dom.style.background = this.background

      this.$emit('change', { item, index })
    },
  },
}
</script>

<style lang="scss">
.rich-operate {
  background: rgba(5, 173, 255, 0.1);
}
</style>
