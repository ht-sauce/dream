"use strict";
import { Notification } from "element-ui";
import axios from "../ajax/axios-ajax.js";
import api from "../ajax/api-list";

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
          this.logout();
        }, 300);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  // 退出登录
  logout() {
    axios
      .ajax({
        url: api.consumer().user.logout
      })
      .then()
      .catch();
    store.clearAll(); // 清理缓存
    window.location.href = "/consumer/login";
  },
  // 刷新口令以及判断数据类型来判断是否退出登录
  refresh_sign_or_out(res) {
    // console.log(res);
    if (!res || !res.data) {
      this.logout();
      return false;
    }
    // type类型为1必定退出登录
    if (res.data.type === 1) {
      this.logout();
      return false;
    }
    if (res.headers.authorization) {
      const user_info = store.get("user_info");
      user_info.sign = res.headers.authorization;
      store.set("user_info", user_info);
    }
    return true;
  }
};
