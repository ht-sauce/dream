//单独定义全局组件注册
import Vue from "vue";

//element ui部分
import {
  Input,
  Button,
  Message,
  MessageBox,
  Dialog,
  Popover,
  Autocomplete,
  Form,
  FormItem,
  Switch,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Upload
} from "element-ui";
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
  Upload
];
elementUI.forEach(component => {
  Vue.use(component);
});
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };

//个人开发ui组件，以插件方式开发
import "@/components/dhtVueUI/style/index.scss";
import dhtui from "@/components/dhtVueUI/index";

import cat from "@/components/livetd/index";
//全局框架范围组件
function components() {
  /*Vue.component("dht-rendering-echarts", () =>
    import("@/components/renderingEcharts/renderingEcharts.vue")
  );*/
  Vue.use(dhtui, { zIndex: 4000 });

  Vue.use(cat);
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
}

//Vue.prototype.$notify = Notification;

export default components;
