'use strict'
import vue from 'vue'
// 传入参数true则控制边界不传和false则不控制边界,默认控制边界
//主函数
const directive = () => {
  let expression = false
  vue.directive('DhtMove', {
    inserted: function(el, binding) {
      expression = binding.expression || expression
      let dragBox = el //获取当前元素
      dragBox.onmousedown = e => {
        // 父元素宽高
        let endWidth = e.target.parentNode.offsetWidth - e.target.offsetWidth
        let endHeight = e.target.parentNode.offsetHeight - e.target.offsetHeight
        // 阻止默认事件，避免元素选中
        e.preventDefault()
        //算出鼠标相对元素的位置
        let disX = e.x - dragBox.offsetLeft
        let disY = e.y - dragBox.offsetTop
        document.onmousemove = e2 => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e2.clientX - disX
          let top = e2.clientY - disY
          // 当传入true代表控制边界
          if (expression) {
            left = left > endWidth ? endWidth : left < 0 ? 0 : left
            top = top > endHeight ? endHeight : top < 0 ? 0 : top
          }
          //移动当前元素
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
        }
        document.onmouseup = () => {
          //鼠标弹起来的时候不再移动
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    update(el, binding) {
      expression = binding.expression === 'true'
    },
    unbind() {},
  })
}

export default directive
