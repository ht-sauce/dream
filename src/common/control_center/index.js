"use strict";
import { Notification } from "element-ui";

const store = require("store");
export default {
  // 回到首页
  go_home(auth) {
    // 验证是否授权
    if (auth) {
      const user_info = store.get("user_info");
      if (!user_info || !user_info.sign) {
        Notification({
          title: "未登录",
          type: "error",
          message: "即将回到登录中心"
        });
        setTimeout(() => {
          window.location.href = "/consumer";
        }, 300);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
};
