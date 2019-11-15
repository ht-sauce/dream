//单独定义全局组件注册
import Vue from "vue";

//element ui部分
import {
  Tabs,
  TabPane,
  Dialog,
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
  CascaderPanel,
  MessageBox,
  Notification,
  Select,
  Option,
  Checkbox
} from "element-ui";
const elementUI = [
  Tabs,
  TabPane,
  Dialog,
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
  CascaderPanel,
  Select,
  Option,
  Checkbox
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
  Vue.prototype.$notify = Notification;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.use(cat);
}

export default install;
