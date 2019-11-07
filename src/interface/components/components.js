//单独定义全局组件注册
import Vue from "vue";

//element ui部分
import {
  Icon,
  Popover,
  Input,
  Upload,
  Button,
  Form,
  FormItem,
  DatePicker,
  Radio,
  RadioGroup,
  Cascader,
  CascaderPanel
} from "element-ui";
const elementUI = [
  Icon,
  Popover,
  Input,
  Upload,
  Button,
  Form,
  FormItem,
  DatePicker,
  Radio,
  RadioGroup,
  Cascader,
  CascaderPanel
];
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };

import cat from "@/components/livetd/index";

//个人开发ui组件，以插件方式开发
// import dhtui from "@/components/dhtVueUI/index";
// Vue.use(dhtui, { zIndex: 4000 });

//全局框架范围组件
function install() {
  elementUI.forEach(component => {
    Vue.use(component);
  });
  Vue.use(cat);
}

//Vue.prototype.$notify = Notification;

export default install;
