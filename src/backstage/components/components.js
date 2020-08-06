//单独定义全局组件注册
import Vue from 'vue'

//element ui部分
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

import cat from '@/components/livetd/index'

//个人开发ui组件，以插件方式开发
import dhtui from '@/components/dhtVueUI/index'
Vue.use(dhtui, { zIndex: 4000 })

//全局框架范围组件
function install() {
  Vue.use(cat)
  Vue.use(ElementUI)
}

//Vue.prototype.$notify = Notification;

export default install
