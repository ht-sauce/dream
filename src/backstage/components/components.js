//单独定义全局组件注册
import Vue from 'vue'

//element ui部分
import {
  Input,
  Button,
  Dialog,
  Popover,
  Autocomplete,
  Form,
  FormItem,
  Switch,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Upload,
  Select,
  Option,
} from 'element-ui'
const elementUI = [
  Input,
  Button,
  Dialog,
  Popover,
  Autocomplete,
  Form,
  FormItem,
  Switch,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Upload,
  Select,
  Option,
]
elementUI.forEach(component => {
  Vue.use(component)
})
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

import cat from '@/components/livetd/index'

//个人开发ui组件，以插件方式开发
import dhtui from '@/components/dhtVueUI/index'
Vue.use(dhtui, { zIndex: 4000 })

//全局框架范围组件
function install() {
  Vue.use(cat)
}

//Vue.prototype.$notify = Notification;

export default install
