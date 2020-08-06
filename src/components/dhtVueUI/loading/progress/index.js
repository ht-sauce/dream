import vue from 'vue'
import loading from './loading.vue'

/*loading.install = function(vue) {
  vue.component(loading.name, loading);
};*/
const loadingDom = vue.extend(loading)
//定义关闭函数
loadingDom.prototype.close = function() {
  if (this.$el && this.$el.parentNode) {
    //在关闭之前先进度条走满，然后消失
    this.value = 100
    setTimeout(() => {
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    }, 500)
  }
}
//定义移除节点函数
/*let oldDom = ""; //预存节点信息
const loadClose = function() {
  console.log(oldDom.$el);
  if (oldDom.$el && oldDom.$el.parentNode) {
    oldDom.$el.parentNode.removeChild(oldDom.$el);
  }
  oldDom.$destroy && oldDom.$destroy();
};*/

const load = options => {
  //options为传入参数
  let node = new loadingDom({
    el: document.createElement('div'),
    data: options,
  })
  //获得body值
  let body = document.body
  //页面禁止滚动
  //body.style.overflow = "hidden";
  //移动端
  //body.style.position = "fixed";
  //页面放开滚动
  //body.style.overflowX = "hidden";
  //插入元素节点
  body.appendChild(node.$el)

  return node
}

export default load
